import Navbar from "../../components/Navbar";
import BookDetail from "../../components/BookDetail";
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
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import usePostUsedBook from "../../hooks/usePostUsedBook";
import useSearchBooks from "../../hooks/useSearchBooks";
import { stringify } from "querystring";

export default function AddNewBookPage() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/login");
    }
  }, []);

  const getSearchResult = async () => {
    const body = {
      BookName: query,
    };
    const response = await useSearchBooks(body, cookies.token);
    setSearchResult(response);
  };

  useEffect(() => {
    setTimeout(() => {
      if (query) {
        getSearchResult();
      }
    }, 1000);
  }, [query]);
  console.log(query);

  const PostUsedBook = async (e) => {
    e.preventDefault();

    // to base64

    const body = {
      AdditionalDetails: e.target.AdditionalInfo.value,
      AskingPrice: e.target.Price.value,
      BookCondition: e.target.Condition.value,
      BookID: e.target.ISBN.value,
      BookPicture:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
    // console.log(body);
    const response = await usePostUsedBook(cookies.token, body);
    console.log(response);
  };

  const Cancel = () => {
    router.push("/");
  };

  const chooseBook = (book) => {
    console.log(book);
    const bookIDInput = document.getElementsByName("ISBN")[0];
    bookIDInput.setAttribute("value", book.ISBN);
    bookIDInput.setAttribute("readOnly", true);
  };

  const ResultItems = searchResult?.data?.slice(0, 5).map((book) => (
    <Option
      value={book?.ISBN}
      onClick={() => chooseBook(book)}
      className="flex flex-row items-center gap-4"
    >
      <div className="flex flex-col">
        <Typography color="gray">
          {book?.Title.length > 30
            ? book?.Title.slice(0, 30) + "..."
            : book?.Title}
        </Typography>
      </div>
    </Option>
  ));

  return (
    <div className="flex flex-col items-center  min-h-screen w-screen">
      <main className="flex flex-col items-center w-full ">
        <Navbar />
        <form
          className="flex flex-row gap-6 mt-10 w-1/2 "
          onSubmit={PostUsedBook}
        >
          <Card className="w-full max-w-[52rem] flex-row bg-gray-200">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none align-center"
            >
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-full bg-gray-300"
              >
                {!image ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-r-none"
                    src={URL.createObjectURL(image)}
                    alt="book"
                  />
                )}

                <input
                  type="file"
                  name="image"
                  id="image"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </CardHeader>
            <CardBody className="w-full gap-4 flex flex-col">
              {searchResult?.data?.length > 0 ? (
                <div className="flex flex-row gap-4">
                  <Select
                    size="lg"
                    placeholder="Book Title"
                    name="BookTitleSelector"
                    label={query}
                  >
                    {ResultItems}
                  </Select>
                  <Button
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setSearchResult([]);
                    }}
                  >
                    Clean Search
                  </Button>
                </div>
              ) : (
                <Input
                  size="lg"
                  placeholder="Book Title"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="BookTitle"
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}
              <Input
                size="lg"
                placeholder="ISBN"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="ISBN"
              />
              <Input
                size="lg"
                placeholder="Condition"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="Condition"
              />

              <Input
                size="lg"
                placeholder="Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="Price"
              />

              <Textarea label="Addtional Information" name="AdditionalInfo" />

              <div className="py-12 flex flex-row gap-4 justify-center">
                <Button className="w-32" type="submit">
                  Add Book
                </Button>
                <Button variant="outlined" className="w-32" onClick={Cancel}>
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </main>
    </div>
  );
}
