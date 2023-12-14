import { useEffect, useState, useRef } from "react";
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
import { setFilterCondition } from "@/redux/setFilterConditions";
import { useRouter } from "next/router";
import UserButton from "./UserButton";
import { useCookies } from "react-cookie";
import useSearchBooks from "@/hooks/useSearchBooks";

export default function NavbarNTU() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpenLogin(true));
  const [LoggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [searchby, setSearchBy] = useState("BookName");
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const [showResults, setShowResults] = useState(false);

  const [open, setOpen] = useState(0);
  const handleOpenList = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [searchResult, setSearchResult] = useState([]);

  const router = useRouter();

  const ToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (cookies.token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        // 當點擊在搜尋欄以外的地方時，隱藏結果
        setShowResults(false);
      }
    };

    // 添加點擊事件監聽器
    document.addEventListener("click", handleClickOutside);

    // 清除事件監聽器，以避免內存洩漏
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchInputRef]);

  useEffect(() => {
    if (query) {
      setShowResults(true);

      const timer = setTimeout(() => {
        dispatch(
          setFilterCondition({
            searchby: searchby,
            query: query,
          })
        );
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResult([]);
    }
  }, [query]);

  const searchResultList = searchResult?.data?.slice(0, 5).map((book) => (
    <ListItem
      onClick={() => {
        router.push("/product/" + book.ISBN);
      }}
    >
      <Typography color="blue-gray" className="font-medium" textGradient>
        {book.Title}
      </Typography>
    </ListItem>
  ));

  return (
    <Navbar className="sticky top-0 z-10 bg-[#918876] h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div
        className="container mx-auto flex items-center justify-between text-blue-gray-900 cursor-point"
        onClick={ToHome}
      >
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-[30px] text-white font-bold leading-relaxed inline-block whitespace-nowrap uppercase"
        >
          NTU BOOK
        </Typography>

        <div className="flex flex-row gap-6">
          <div className="w-56">
            <Select label="Search By" value={searchby} onChange={setSearchBy}>
              <Option value="BookName" onClick={() => setSearchBy("BookName")}>
                Book Title
              </Option>
              <Option
                value="CourseName"
                onClick={() => setSearchBy("CourseName")}
              >
                Course
              </Option>
              <Option value="DeptCode" onClick={() => setSearchBy("DeptCode")}>
                Department
              </Option>
              <Option value="ISBN" onClick={() => setSearchBy("ISBN")}>
                ISBN
              </Option>
              <Option
                value="AuthorName"
                onClick={() => setSearchBy("AuthorName")}
              >
                Author
              </Option>
            </Select>
          </div>
          <div
            className="relative flex w-full gap-2 md:w-max"
            ref={searchInputRef}
          >
            <Input
              type="search"
              color="white"
              label="Search..."
              className="pr-20"
              containerProps={{
                className: "w-[200px]",
              }}
              onChange={(e) => setQuery(e.target.value)}
              defaultValue="python"
            />
            {/* {searchResult.data?.length > 0 && showResults && (
              <List
                className="absolute top-10 w-full bg-white"
                style={{ zIndex: 1000 }}
              >
                {searchResultList}
              </List>
            )} */}
          </div>

          {!LoggedIn ? (
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
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </Navbar>
  );
}
