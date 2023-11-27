import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Select,
  Option,
  Avatar,
} from "@material-tailwind/react";
import Rating from '@mui/material/Rating';
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setOpenLogin } from "../redux/openLogin";
 
export default function UserNav() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpenLogin(true));

  const [open, setOpen] = useState(0);
  const handleOpenList = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const DepartmentItems = 
    <List>
      <ListItem className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white">
        Dashboard
      </ListItem>
      <ListItem className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white">
        Dashboard
      </ListItem>
      <ListItem className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white">
        Dashboard
      </ListItem>
      <ListItem className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white">
        Dashboard
      </ListItem>
    </List> 
 
  return (  
    <Navbar className="top-0 z-10 bg-[#918876] max-w-full rounded-none py-2 lg:py-4 px-0">
        
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-lg text-white"
        >
          NTU BOOK
        </Typography>
        {/* {DepartmentItems} */}
        
        <div className="flex flex-row gap-2">
          <div className="w-56">
            <Select label="Search By">
              <Option>Book Title</Option>
              <Option>Course</Option>
              <Option>Author</Option>
              <Option>ISBN</Option>
            </Select>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Search..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={handleOpen}
            >
              <span>Log In</span>
            </Button>
          </div>
        </div>
        
      </div>
      <div className="flex items-center gap-6 mt-6 mb-4 mx-20">
        <Avatar src="/b2.jpg" alt="avatar" size="xl"/>
        <div>
          <Typography variant="h5">Benson</Typography>
          <Typography variant="md" color="gray" className="font-normal">
            B10705xxx
          </Typography>
          <Rating name="read-only" value={5} readOnly/>
        </div>
      </div>
      
    </Navbar>
  );
}