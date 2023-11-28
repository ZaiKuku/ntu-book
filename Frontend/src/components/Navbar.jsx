import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  List,
  ListItem,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

import { useDispatch } from "react-redux";
import { setOpenLogin } from "../redux/openLogin";
import { useRouter } from "next/router";
import UserButton from "./UserButton";

export default function NavbarNTU() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpenLogin(true));

  const [open, setOpen] = useState(0);
  const handleOpenList = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const router = useRouter();

  const ToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const DepartmentItems = (
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
  );

  return (
    <Navbar className="sticky top-0 z-10 bg-[#918876] h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div
        className="container mx-auto flex items-center justify-between text-blue-gray-900 cursor-point"
        onClick={ToHome}
      >
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
            {/* <UserButton /> */}
          </div>
        </div>
      </div>
    </Navbar>
  );
}
