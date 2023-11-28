import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenLogin } from "../redux/openLogin";
import { setCookie } from "cookies-next";
import useLogIn from "../hooks/useLogIn";

export default function LoginDialog() {
  const dispatch = useDispatch();
  const { openLogin } = useSelector((state) => state.OpenLoginSlice);
  const [Login, setLogin] = useState(true); // [Login, setLogin
  const handleOpen = () => dispatch(setOpenLogin(!openLogin));

  const handleLogin = async () => {
    try {
      const { data } = await useLogIn();
      console.log(data);
      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Current = () => {
    setLogin(!Login);
  };

  const LoginForm = (
    <Card className="mx-auto w-full max-w-[24rem]">
      <CardBody className="flex flex-col gap-4">
        <Typography
          variant="h4"
          color="white"
          className="bg-[#918876] rounded-md p-2"
        >
          Sign In
        </Typography>
        <Typography
          className="mb-3 font-normal"
          variant="paragraph"
          color="gray"
        >
          Enter your SchoolID and password to Sign In.
        </Typography>
        <Typography className="-mb-2" variant="h6">
          Your SchoolID
        </Typography>
        <Input label="SchoolID" size="lg" />
        <Typography className="-mb-2" variant="h6">
          Your Password
        </Typography>
        <Input label="Password" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleLogin} fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-4 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={Current}
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );

  const SignUpForm = (
    <Card className="mx-auto w-full max-w-[24rem]">
      <CardBody className="flex flex-col gap-4">
        <Typography
          variant="h4"
          color="white"
          className="bg-[#918876] rounded-md p-2"
        >
          Sign Up
        </Typography>
        <Typography
          className="mb-3 font-normal"
          variant="paragraph"
          color="gray"
        >
          Enter your SchoolID and password to Sign Up.
        </Typography>
        <Typography className="-mb-2" variant="h6">
          Your SchoolID
        </Typography>
        <Input label="SchoolID" size="lg" />
        <Typography className="-mb-2" variant="h6">
          Your SchoolMail
        </Typography>
        <Input label="SchoolMail" size="lg" />
        <Typography className="-mb-2" variant="h6">
          Your Password
        </Typography>
        <Input label="Password" size="lg" />
        <Typography className="-mb-2" variant="h6">
          Enter Password Again
        </Typography>
        <Input label="Enter Password Again" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleOpen} fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-4 flex justify-center">
          Already Signed Up?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={Current}
          >
            Sign in
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Dialog
        size="xs"
        open={openLogin}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        {Login ? LoginForm : SignUpForm}
      </Dialog>
    </>
  );
}
