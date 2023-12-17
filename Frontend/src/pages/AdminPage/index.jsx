import Navbar from "../../components/Navbar";
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import usePostBook from "../../hooks/usePostBook";
import { useCookies } from "react-cookie";

export default function AdminPage() {
  const [submitMode, setSubmitMode] = useState(false);
  const [cookies] = useCookies(["token"]);

  const action = (e) => {
    e.preventDefault();

    if (submitMode === "AddBook") {
      const body = {
        ISBN: e.target.ISBN.value,
        Title: e.target.BookTitle.value,
        Author: e.target.Author.value,
        Genre: e.target.Genre.value.split(","),
        PublisherName: e.target.PublisherName.value,
        SuggestedRetailPrice: e.target.SuggestedRetailPrice.value,
      };
      console.log(body);
      try {
        const res = usePostBook(cookies.token, body);
      } catch (err) {
        console.log(err);
      }
    } else if (submitMode === "UpdateBookDetails") {
      console.log("UpdateBookDetails");
    } else if (submitMode === "DeleteBook") {
      console.log("DeleteBook");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen w-screen">
      <main className="flex flex-col items-center w-full gap-4">
        <Navbar />

        <Card className="w-full max-w-[52rem] flex-row bg-gray-200">
          <CardBody className="w-full flex flex-col">
            <form className="w-full gap-4 flex flex-col" onSubmit={action}>
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
                placeholder="Book Title"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="BookTitle"
              />

              <Input
                size="lg"
                placeholder="Author"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="Author"
              />

              <Input
                size="lg"
                placeholder="Genre"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="Genre"
              />

              <Input
                size="lg"
                placeholder="PublisherName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="PublisherName"
              />

              <Input
                size="lg"
                placeholder="SuggestedRetailPrice"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="SuggestedRetailPrice"
              />

              <div className="py-12 flex flex-row gap-4 justify-center">
                <ButtonGroup size="lg" rounded={false}>
                  <Button
                    type="submit"
                    onClick={() => setSubmitMode("AddBook")}
                  >
                    Add Book
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setSubmitMode("UpdateBookDetails")}
                  >
                    Update Book Details
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setSubmitMode("DeleteBook")}
                  >
                    Delete Book
                  </Button>
                </ButtonGroup>
              </div>
            </form>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
