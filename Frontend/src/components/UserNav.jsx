import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Rating from "@mui/material/Rating";
import UserButton from "./UserButton";
import { useRouter } from "next/router";
import useGetUserProfilePublic from "../hooks/useGetUserProfilePublic";
import { useCookies } from "react-cookie";

export default function UserNav() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const getProfile = async () => {
    const res = await useGetUserProfilePublic(cookies.token, router.query.id);
    console.log(res);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const ToHome = () => {
    window.location.assign("/");
  };

  return (
    <Navbar className="top-0 z-10 bg-[#918876] max-w-full rounded-none py-2 lg:py-4 px-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-[30px] text-white font-bold leading-relaxed inline-block whitespace-nowrap uppercase"
          onClick={ToHome}
        >
          NTU BOOK
        </Typography>

        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-x-1">
            <UserButton />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-6 mb-4 mx-20">
        <Avatar src="/b2.jpg" alt="avatar" size="xl" />
        <div>
          <Typography variant="h5" color="gray" className="font-normal">
            {router.query.id}
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </div>
      </div>
    </Navbar>
  );
}
