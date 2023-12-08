import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";

import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function UserButton() {
  const [open, setOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  const ToPersonalPage = () => {
    router.push("/PersonalPage/0");
  };

  const Tohome = () => {
    removeCookie("token");
    router.push("/");
  };

  return (
    <SpeedDial open={open} handler={setOpen}>
      <SpeedDialHandler>
        <Avatar src="/user.png" className="cursor-pointer" />
      </SpeedDialHandler>
      <SpeedDialContent>
        <SpeedDialAction onClick={ToPersonalPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </SpeedDialAction>
        <SpeedDialAction onClick={Tohome}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </SpeedDialAction>
      </SpeedDialContent>
    </SpeedDial>
  );
}
