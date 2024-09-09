import UserNav from "../../components/UserNav";
import BooksGroup from "../../components/BooksGroup";
import PersonalBuyerSideBar from "../../components/PersonalBuyerSideBar";
import PersonalBuyerTable from "../../components/PersonalBuyerTable";
import PersonalBuyerComments from "../../components/PersonalBuyerComments";

import { useSelector } from "react-redux";
import PersonalSellerTable from "../../components/PersonalSellerTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useGetUserFullProfile from "../../hooks/useGetUserFullProfile";

export default function PersonalPage() {
  const { table } = useSelector((state) => state.PersonalSideBarSlice);
  const [userFullProfile, setUserFullProfile] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const { id } = router.query;

  const getUserFullProfile = async () => {
    console.log("fetching user full profile...");
    try {
      const { data } = await useGetUserFullProfile(cookies.token, id);
      console.log(data);
      setUserFullProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      // getUsedBookRequests();
      getUserFullProfile();
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen">
      <main className="flex flex-col w-full">
        <UserNav />
        <div className="flex flex-row items-start w-full">
          <PersonalBuyerSideBar />
          {table === "OrderLists" ? (
            <PersonalBuyerTable userFullProfile={userFullProfile} />
          ) : table === "CommentsHistory" ? (
            <PersonalBuyerComments userFullProfile={userFullProfile} />
          ) : table === "ListedBooks" ? (
            <PersonalSellerTable userFullProfile={userFullProfile} />
          ) : (
            <PersonalBuyerComments userFullProfile={userFullProfile} />
          )}
        </div>
      </main>
    </div>
  );
}
