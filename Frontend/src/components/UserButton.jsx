import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";

import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";
import { useRouter } from "next/router";

export default function UserButton() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const ToHome = () => {
    router.push("/PersonalPage/" + "123");
  };

  return (
    <div className="relative w-full">
      <SpeedDial open={open} handler={setOpen}>
        <SpeedDialHandler>
          <Avatar src="/user.png" className="cursor-pointer" />
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction>
            <HomeIcon className="h-5 w-5" onClick={ToHome} />
          </SpeedDialAction>
          <SpeedDialAction>
            <CogIcon className="h-5 w-5" />
          </SpeedDialAction>
          <SpeedDialAction>
            <Square3Stack3DIcon className="h-5 w-5" />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
