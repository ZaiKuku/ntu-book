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
} from "@material-tailwind/react";
import { use, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import usePostUsedBook from "../../hooks/usePostUsedBook";
import useSearchBooks from "../../hooks/useSearchBooks";

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
    const response = await useSearchBooks(query);
    setSearchResult(response);
  };

  useEffect(() => {
    if (query) {
      getSearchResult();
    }
    setTimeout(() => {
      if (query.length > 0) {
        setQuery("");
      }
    }, 1000);
  }, [query]);

  const PostUsedBook = async (e) => {
    e.preventDefault();
    const body = {
      AdditionalDetails: e.target.AdditionalInfo.value,
      AskingPrice: e.target.Price.value,
      BookPicture: image,
      BookCondition: e.target.Condition.value,
      BookID: e.target.BookID.value,
    };
    const response = await usePostUsedBook(cookies.token, body);
    console.log(response);
  };

  const Cancel = () => {
    router.push("/");
  };

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
              <Input
                size="lg"
                placeholder="Book Title"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="BookTitle"
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
                <Button className="w-32">Add Book</Button>
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
