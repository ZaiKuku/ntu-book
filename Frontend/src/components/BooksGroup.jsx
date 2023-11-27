import BookCard from "./BookCard";
import { useRouter } from "next/router";

const bookcarditems = {
  data: [
    {
      ISBN: 100000,
      Title: "Latex 排版全書",
      Edition: "5",
      PublisherName: "小傑出版社",
      AuthorName: "LC Kung",
      Genre: "科技",
      LowestPrice: 100,
      HighestPrice: 88888,
    },
    {
      ISBN: 100001,
      Title: "SQL 一本書就上手",
      Edition: "5",
      PublisherName: "小傑出版社",
      AuthorName: "LC Kung",
      Genre: "科技",
      LowestPrice: 100,
      HighestPrice: 88888,
    },
    {
      ISBN: 100002,
      Title: "SQL 一本書就上手",
      Edition: "5",
      PublisherName: "小傑出版社",
      AuthorName: "LC Kung",
      Genre: "科技",
      LowestPrice: 100,
      HighestPrice: 88888,
    },
    {
      ISBN: 100003,
      Title: "SQL 一本書就上手",
      Edition: "5",
      PublisherName: "小傑出版社",
      AuthorName: "LC Kung",
      Genre: "科技",
      LowestPrice: 100,
      HighestPrice: 88888,
    },
    {
      ISBN: 100004,
      Title: "SQL 一本書就上手",
      Edition: "5",
      PublisherName: "小傑出版社",
      AuthorName: "LC Kung",
      Genre: "科技",
      LowestPrice: 100,
      HighestPrice: 88888,
    },
  ],
};

export default function BooksGroup() {
  const router = useRouter();
  const handleToProductPage = (ISBN) => {
    router.push("/product/" + ISBN);
  };
  const bookcards = bookcarditems.data.map((bookcarditem) => {
    return (
      console.log(bookcarditem.ISBN),
      (
        <div
          className="hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={() => handleToProductPage(bookcarditem.ISBN)}
        >
          <BookCard
            key={bookcarditem.ISBN}
            Title={bookcarditem.Title}
            Edition={bookcarditem.Edition}
            PublisherName={bookcarditem.PublisherName}
            AuthorName={bookcarditem.AuthorName}
            Genre={bookcarditem.Genre}
            LowestPrice={bookcarditem.LowestPrice}
            HighestPrice={bookcarditem.HighestPrice}
          />
        </div>
      )
    );
  });

  return (
    <div className="flex flex-row flex-wrap gap-6 p-2 h-[80vh] w-8/12 flex-wrap overflow-auto no-scrollbar">
      {bookcards}
    </div>
  );
}
