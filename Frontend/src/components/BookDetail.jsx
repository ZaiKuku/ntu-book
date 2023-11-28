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
import { useState } from "react";
import { Button } from "@material-tailwind/react";

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

const SellersData = [
  {
    UsedBookID: 10,
    AdditionalDetails: "", // empty string = no additional details
    BookPicture: "",
    BookCondition: 8,
    SellerID: "b12345678",
    ListTimestamp: "1970-01-04 00:00:01.000000",
    AskingPrice: 500,
  },
  {
    UsedBookID: 11,
    AdditionalDetails: "", // empty string = no additional details
    BookPicture: "url-of-image",
    BookCondition: 8,
    SellerID: "b12345678",
    ListTimestamp: "1970-01-01 00:00:01.000000",
    AskingPrice: 500,
  },
  {
    UsedBookID: 12,
    AdditionalDetails: "", // empty string = no additional details
    BookPicture: "url-of-image",
    BookCondition: 8,
    SellerID: "b12345678",
    ListTimestamp: "1970-01-01 00:00:01.000000",
    AskingPrice: 500,
  },
  {
    UsedBookID: 13,
    AdditionalDetails: "", // empty string = no additional details
    BookPicture: "",
    BookCondition: 8,
    SellerID: "b12345678",
    ListTimestamp: "1970-01-01 00:00:01.000000",
    AskingPrice: 500,
  },
];

const BookInfoData = {
  ISBN: 100000,
  Title: "Latex 排版全書",
  Edition: "5",
  PublisherName: "小傑出版社",
  AuthorName: "LC Kung",
  Genre: "科技",
};

export default function BookDetail() {
  const [selected, setSelected] = useState(SellersData[0].UsedBookID);
  const setSelectedItem = (value) => setSelected(value);

  const [comment, setComment] = useState("");

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

  const sellers = SellersData.map((seller) => (
    <ListItem
      selected={selected === seller.UsedBookID}
      onClick={() => setSelectedItem(seller.UsedBookID)}
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

  const information = SellersData.filter(
    (seller) => seller.UsedBookID === selected
  )[0];

  const submitComment = (e) => {
    e.preventDefault();

    // TODO: submit comment to backend

    setComment("");
  };

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
              {BookInfoData?.Title}
            </Typography>
            <Typography color="blue-gray" className="mb-2 font-medium">
              {BookInfoData?.AuthorName}, {BookInfoData?.Edition}th Edition
            </Typography>
            <Typography color="blue-gray" className="mb-8 font-medium">
              {BookInfoData?.PublisherName}
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

            <div className="flex flex-row gap-1 w-full">
              <Chip variant="ghost" value={BookInfoData?.Genre} size="sm" />
            </div>
            <div className="py-12">
              <Button>Buy Now</Button>
            </div>
            <Typography color="blue-gray" className="mb-4 text-xs">
              Listed At {information?.ListTimestamp.substring(0, 10)}
            </Typography>
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
