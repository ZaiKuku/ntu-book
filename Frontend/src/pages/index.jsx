import DrawerComponent from "../components/Drawer";
import Navbar from "../components/Navbar";
import LoginDialog from "../components/LoginDialog";
import SideBar from "../components/SideBar";
import BooksGroup from "../components/BooksGroup";

export default function Home() {
  return (
    <div className="flex flex-col items-center  min-h-screen w-screen">
      <main className="flex flex-col items-center w-full">
        <Navbar />
        <LoginDialog />
        <div className="flex flex-row w-full gap-20">
          <SideBar />
          <BooksGroup />
        </div>
      </main>
    </div>
  );
}
