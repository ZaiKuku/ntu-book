import BookCard from "./BookCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSearchBooks from "../hooks/useSearchBooks";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function BooksGroup() {
  const router = useRouter();
  const [cookies] = useCookies(["token"]);
  const handleToProductPage = (ISBN) => {
    router.push("/product/" + ISBN);
  };
  const [bookcarditems, setBookcarditems] = useState({ data: [] });

  const query = useSelector((state) => state.FilterConditionSlice.query);

  useEffect(() => {
    getBooksInfo();
  }, [query]);

  const getBooksInfo = async () => {
    try {
      const data = await useSearchBooks(query, cookies.token);
      setBookcarditems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const bookcards = bookcarditems?.data.map((bookcarditem) => {
    return (
      <div
        className="hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer"
        onClick={() => handleToProductPage(bookcarditem.ISBN)}
        key={bookcarditem.ISBN}
      >
        {query.DeptCode in bookcarditem.Departments || !query.DeptCode ? (
          <BookCard
            Title={bookcarditem.Title}
            Edition={bookcarditem.Edition}
            PublisherName={bookcarditem.PublisherName}
            AuthorName={bookcarditem.AuthorName}
            Genre={bookcarditem.Genre}
            LowestPrice={bookcarditem.LowestPrice}
            HighestPrice={bookcarditem.HighestPrice}
            ISBN={bookcarditem.ISBN}
          />
        ) : (
          <></>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-row flex-wrap gap-6 p-2 h-[80vh] w-8/12 flex-wrap overflow-auto no-scrollbar">
      {bookcards}
    </div>
  );
}
