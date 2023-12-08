import Navbar from "../../components/Navbar";
import BookDetail from "../../components/BookDetail";

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen w-screen">
      <main className="flex flex-col items-center w-full ">
        <Navbar />
        <div className="flex flex-row gap-20 p-12">
          <BookDetail />
        </div>
      </main>
    </div>
  );
}
