import UserNav from "../../components/UserNav";
import BooksGroup from "../../components/BooksGroup";
import PersonalBuyerSideBar from "../../components/PersonalBuyerSideBar";
import PersonalBuyerTable from "../../components/PersonalBuyerTable";
import PersonalBuyerComments from "../../components/PersonalBuyerComments";

import { useSelector } from "react-redux";
import PersonalSellerTable from "../../components/PersonalSellerTable";

export default function PersonalPage() {
  const { table } = useSelector((state) => state.PersonalSideBarSlice);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen">
      <main className="flex flex-col w-full">
        <UserNav />
        <div className="flex flex-row">
          <PersonalBuyerSideBar />
          {table === "OrderLists" ? (
            <PersonalBuyerTable />
          ) : table === "CommentsHistory" ? (
            <PersonalBuyerComments />
          ) : table === "ListedBooks" ? (
            <PersonalSellerTable />
          ) : (
            <PersonalBuyerComments />
          )}
        </div>
      </main>
    </div>
  );
}
