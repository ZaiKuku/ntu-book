import {
    Card,
    Typography,
    List,
    ListItem,
    Button,
  } from "@material-tailwind/react";
  import { useState } from "react";

import { useDispatch } from 'react-redux';
import { setPersonalSideBar } from '../redux/setPersonalSideBar';



   
export default function PersonalBuyerSidebar() {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value) => setSelected(value);

  const dispatch = useDispatch();
  const dispatchTable = (value) => {
    setSelectedItem(value);
    if (value === 1) {
      dispatch(setPersonalSideBar("OrderLists"));
    } else if (value === 2) {
      dispatch(setPersonalSideBar("CommentsHistory"));
    } else if (value === 3) {
      dispatch(setPersonalSideBar("ListedBooks"));
    } else if (value === 4) {
      dispatch(setPersonalSideBar("ReceivedRatings"));
    }
  }

  return (
      <Card className="h-[70vh] w-full max-w-[18rem] p-8 shadow-xl shadow-blue-gray-900/5 ml-5">
        <List>
          <Typography 
            variant="h4"
            color="blue-gray"
            className="font-normal leading-none opacity-70 mb-4"
          >
            Buyer
          </Typography>
          <ListItem selected={selected === 1} onClick={() => dispatchTable(1)} className="rounded-none rounded-tr-lg h-7">
            Order Lists
          </ListItem>
          <ListItem selected={selected === 2} onClick={() => dispatchTable(2)} className="rounded-none rounded-tr-lg h-7" >
            Reviews History
          </ListItem>
        </List>
        <List>
          <Typography 
            variant="h4"
            color="blue-gray"
            className="font-normal leading-none opacity-70 mb-4"
          >
            Seller
          </Typography>
          <ListItem selected={selected === 3} onClick={() => dispatchTable(3)} className="rounded-none rounded-tr-lg h-7">
            Listed Books
          </ListItem>
          <ListItem selected={selected === 4} onClick={() => dispatchTable(4)} className="rounded-none rounded-tr-lg h-7" >
            Received Ratings
          </ListItem>
        </List>
      </Card>
    );
  }