import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import useUsedBookDetail from "../hooks/useUsedBookDetail";
import useGetBookInfoAndUsedBookIds from "../hooks/useGetBookInfoAndUsedBookIds";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const CommentData = [
  {
    CommenterID: "b12345678",
    Comment: "Where can we meet?",
    CommentTimestamp: "1970-01-02 00:00:01.000000",
  },
  {
    CommenterID: "b12345679",
    Comment: "推!",
    CommentTimestamp: "1970-01-01 00:00:01.000000",
  },
];

export default function BookDetail() {
  const setSelectedItem = (value) => setSelected(value);
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [usedBookData, setUsedBookData] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  const [sellerData, setSellerData] = useState([]);
  const [selected, setSelected] = useState(sellerData?.UsedBookID);
  const [usedbookdetail, setUsedBookDetail] = useState([]);

  const comments = CommentData.map((comment) => (
    <ListItem key={comment.CommenterID + comment.CommentTimestamp}>
      <ListItemPrefix>
        <Avatar variant="circular" alt="candice" src="/user.png" />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {comment.CommenterID}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {comment.Comment}
        </Typography>
      </div>
    </ListItem>
  ));

  const sellers = sellerData?.map((seller) => (
    <ListItem
      selected={selected === seller.UsedBookID}
      onClick={() => setSelectedItem(seller.UsedBookID)}
      className="h-20"
    >
      <ListItemPrefix>
        <Avatar variant="circular" alt="candice" src="/user.png" />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {seller.SellerID}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          NT$ {seller.AskingPrice}
        </Typography>
      </div>
    </ListItem>
  ));

  const information = sellerData?.filter(
    (seller) => seller.UsedBookID === selected
  )[0];

  const submitComment = (e) => {
    e.preventDefault();

    // TODO: submit comment to backend

    setComment("");
  };

  useEffect(() => {
    try {
      getBookInfo();
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      getUsedBookDetail();
    } catch (error) {
      console.error("Error:", error);
    }
  }, [id]);

  const getBookInfo = async () => {
    const { id } = router.query;
    const BookInfoData = await useGetBookInfoAndUsedBookIds(cookies.token, id);

    setUsedBookData(BookInfoData.data);
    setSellerData(BookInfoData.data.UsedBooks);
    setSelected(BookInfoData.data.UsedBooks[0].UsedBookID);
  };

  const getUsedBookDetail = async () => {
    var UsedBookDetail = [];
    UsedBookDetail.forEach(async (UsedBook) => {
      const UsedBookDetail = await useUsedBookDetail(UsedBook.UsedBookID);
      UsedBookDetail.push(UsedBookDetail);
    });
    setUsedBookDetail(UsedBookDetail);
  };
  const chips = usedBookData?.Genres?.map((Genre) => (
    <Chip variant="ghost" value={Genre} size="sm" />
  ));

  return (
    <div className="flex flex-col gap-6 w-[80vw] justify-center items-center">
      <div className="flex flex-row gap-6">
        <Card className="w-max-[52rem] flex-row w-[52rem]">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={information?.BookPicture || "/b2.jpg"}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="w-full">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {usedBookData?.Title}
            </Typography>

            <Typography color="blue-gray" className="mb-8 font-medium">
              {usedBookData?.Publisher}
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 font-medium pb-4"
            >
              NT$ {information?.AskingPrice}
            </Typography>

            <Typography color="blue-gray" className="mb-2 font-medium">
              {information?.BookCondition} 成新
            </Typography>

            <div className="flex flex-row gap-1 w-full">{chips}</div>
            <div className="py-12">
              <Button>Buy Now</Button>
            </div>
          </CardBody>
        </Card>

        <Card className="w-[20rem] h-[50vh] ">
          <List>
            <Typography variant="h4">Sellers</Typography>
            <List className="flex flex-row flex-wrap h-[40vh] justify-between flex-wrap overflow-auto no-scrollbar">
              {sellers}
            </List>
          </List>
        </Card>
      </div>
      <Card className="max-h-[40vh] w-[50vw]">
        <CardHeader shadow={false} floated={false}>
          <Typography variant="h4">Comments</Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <List className="flex flex-row flex-wrap justify-between flex-wrap overflow-auto no-scrollbar">
            {comments}
          </List>
          <form onSubmit={submitComment}>
            <Input
              placeholder="Add a comment"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
