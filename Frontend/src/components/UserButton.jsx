import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";

import { HomeIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UserButton() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const ToPersonalPage = () => {
    router.push("/PersonalPage/0");
  };

  const Tohome = () => {
    router.push("/");
  };

  return (
    <div className="relative w-full">
      <SpeedDial open={open} handler={setOpen}>
        <SpeedDialHandler>
          <Avatar src="/user.png" className="cursor-pointer" />
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction onClick={ToPersonalPage}>
            <HomeIcon className="h-5 w-5" />
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
    </div>
  );
}
