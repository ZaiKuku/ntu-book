import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

import useGetUsedBookComments from "../hooks/useGetUsedBookComments";
import Rating from "@mui/material/Rating";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Comments({ id }) {
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    getComments();
  }, [id]);

  const getComments = async () => {
    const res = await useGetUsedBookComments(cookies.token, id);
    console.log(res);
    setComments(res?.data);
  };

  return (
    <Card className="w-[80vw]">
      <List className="flex flex-row flex-wrap h-[40vh] justify-between flex-wrap overflow-auto no-scrollbar">
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Benson
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              B107050xx
            </Typography>
            <Rating name="read-only" value={5} readOnly size="small" />
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Benson
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              B107050xx
            </Typography>
            <Rating name="read-only" value={5} readOnly size="small" />
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Benson
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              B107050xx
            </Typography>
            <Rating name="read-only" value={5} readOnly size="small" />
            <Typography variant="small" color="gray" className="font-normal">
              評論內容評論內容評論內容評論內容評論內容評論內容評論內容評論內容
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
