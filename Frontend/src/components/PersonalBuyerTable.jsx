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
  Rating,
} from "@material-tailwind/react";
import { use, useEffect, useState } from "react";

import { useRouter } from "next/router";

const TABLE_HEAD = [
  "Listed Books",
  "Order Placed Date",
  "Status",
  "Rate",
  "Delete",
];
import useDeleteRequest from "../hooks/useDeleteRequest";
import { useCookies } from "react-cookie";

export default function PersonalBuyerTable({ userFullProfile }) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [stars, setStars] = useState(0);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);

  useEffect(() => {
    if (userFullProfile) {
      setTABLE_ROWS(userFullProfile.PurchaseRequests);
    }
  }, [userFullProfile]);

  const submitComment = (e) => {
    e.preventDefault();
    const body = {
      Comment: e.target.Comment.value,
      Rating: stars,
    };
    console.log(body);
    setOpenCommentDialog(false);
  };

  return (
    <Card className="m-8 w-[80vw]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Order Lists
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the ordered books.
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 max-h-[50vh]">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
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
            {TABLE_ROWS?.map(
              ({ BookName, Status, UsedBookID, RequestTimestamp }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={UsedBookID}>
                    <td className={classes}>
                      <div className="flex items-center gap-3 max-w-[25rem]">
                        <Avatar
                          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          color="teal"
                          size="sm"
                          className="object-cover flex-shrink-0"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
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
                        {RequestTimestamp}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={Status}
                          color={
                            Status === "Finished"
                              ? "green"
                              : Status === "Pending"
                              ? "amber"
                              : Status === "Denied"
                              ? "red"
                              : "gray"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Button
                        size="sm"
                        className="bg-[#787878]"
                        onClick={() => setOpenCommentDialog(true)}
                        disabled={Status !== "Finished"}
                      >
                        Rating
                      </Button>
                    </td>
                    <td className={classes}>
                      <Button
                        size="sm"
                        onClick={() => {
                          useDeleteRequest(cookies.token, UsedBookID);
                          router.reload();
                        }}
                        color="red"
                        disabled={Status !== "Pending"}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      <>
        <Dialog
          size="xs"
          open={openCommentDialog}
          handler={setOpenCommentDialog}
          className="bg-transparent shadow-none"
        >
          <Typography size="lg" className="font-bold" color="white">
            Rate this Transaction
          </Typography>

          <form onSubmit={submitComment}>
            <div className="flex flex-col gap-4">
              <Input
                size="lg"
                placeholder="Comment"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="Comment"
              />
              <div className="flex flex-row gap-4">
                <Typography size="lg" className="font-bold" color="white">
                  Rating
                </Typography>
                <Rating
                  name="rating"
                  value={0}
                  unratedColor="gray"
                  onChange={(value) => setStars(value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                color="red"
                buttonType="link"
                onClick={() => setOpenCommentDialog(false)}
                ripple="dark"
              >
                Cancel
              </Button>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Dialog>
      </>
    </Card>
  );
}
