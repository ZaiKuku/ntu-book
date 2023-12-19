import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  List,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Listed Books", "Price", "Buyers"];

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import useGetRequestsOfAUser from "../hooks/useGetRequestsOfAUser";
import usePostPurchase from "../hooks/usePostPurchase";

export default function PersonalSellerTable({ userFullProfile }) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [open, setOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selected, setSelected] = useState();

  const handleAddNewBook = () => {
    router.push("/AddBookPage");
  };

  useEffect(() => {
    if (userFullProfile) {
      setTABLE_ROWS(userFullProfile.UsedBooks);
    }
  }, [userFullProfile]);

  const getRequests = async (ID) => {
    const response = await useGetRequestsOfAUser(cookies.token, ID);
    console.log(response);
  };

  const handleOpen = async (ID) => {
    setSelected(ID);
    await getRequests(ID);
    setOpen(true);
  };

  const onAccept = async (UsedBookID, ID) => {
    const body = {
      BuyerID: ID,
    };
    const response = await usePostPurchase(body, cookies.token, UsedBookID);
    console.log(response);
  };

  useEffect(() => {
    if (requestInfo) {
      setBuyers(
        requestInfo.map((buyer) => (
          <ListItem key={buyer.BuyerID}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="/user.png" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {buyer.BuyerID}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {buyer.BuyerID}
              </Typography>
            </div>
            <Button name="Accept" size="sm" onClick={(BuyerID) => onAccept()}>
              Accept
            </Button>
          </ListItem>
        ))
      );
    }
  }, [requestInfo]);

  return (
    <Card className="max-h-[70vh] m-8 w-[80vw]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Listed Books
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the listed books.
            </Typography>
          </div>

          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button onClick={handleAddNewBook}>Add New Book</Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(({ AskingPrice, BookName, UsedBookID }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={UsedBookID}
                  className="cursor-pointer hover:bg-blue-gray-50"
                >
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold max-w-[30rem]"
                      >
                        {BookName}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {AskingPrice}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Button
                      color="lightBlue"
                      size="sm"
                      value={UsedBookID}
                      onClick={() => handleOpen(UsedBookID)}
                    >
                      View Buyers
                    </Button>
                  </td>
                </tr>
              );
            })}
            {!TABLE_ROWS && (
              <tr>
                <td className="p-4 text-center" colSpan={6}>
                  <Typography color="gray">No listed books yet.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <>
        <Dialog
          size="xs"
          open={open}
          handler={setOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="w-full max-w-[52rem] flex-row bg-gray-200">
            <List className="flex flex-row flex-wrap h-[40vh] justify-between flex-wrap overflow-auto no-scrollbar">
              {buyers}
            </List>
          </Card>
        </Dialog>
      </>
    </Card>
  );
}
