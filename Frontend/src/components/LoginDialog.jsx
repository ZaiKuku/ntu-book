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
import { useCookies } from "react-cookie";
import useLogIn from "../hooks/useLogIn";
import useSignUp from "../hooks/useSignUp";

export default function LoginDialog() {
  const dispatch = useDispatch();
  const { openLogin } = useSelector((state) => state.OpenLoginSlice);
  const [Login, setLogin] = useState(true); // [Login, setLogin
  const handleOpen = () => dispatch(setOpenLogin(!openLogin));
  const [cookies, setCookie] = useCookies(["token"]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      StudentID: e.target.SchoolID.value,
      Password: e.target.Password.value,
    };
    try {
      const { data } = await useLogIn(body);
      console.log(data);
      setCookie("token", data.Token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie("id", body.StudentID, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      handleOpen();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const body = {
      StudentID: e.target.SchoolID.value,
      SchoolEmail: e.target.SchoolMail.value,
      Username: e.target.SchoolID.value,
      Password: e.target.Password.value,
      Fname: e.target.FirstName.value,
      Lname: e.target.LastName.value,
    };
    console.log(body);
    try {
      const { data } = await useSignUp(body);

      setCookie("token", data.Token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie("id", body.StudentID, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      handleOpen();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cookies.token);
  const Current = () => {
    setLogin(!Login);
  };
  const LoginForm = (
    <Card className="mx-auto w-full max-w-[24rem] max-h-[80vh]">
      <form onSubmit={handleLogin}>
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
          <Input label="SchoolID" size="lg" name="SchoolID" />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input label="Password" size="lg" name="Password" type="password" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            Sign IN
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
      </form>
    </Card>
  );

  const SignUpForm = (
    <Card className="mx-auto w-full max-w-[24rem] max-h-[80vh]">
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 h-full">
        <CardBody className="flex flex-col gap-4 max-h-[60vh] overflow-scroll no-scrollbar">
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
          <Input label="SchoolID" size="lg" name="SchoolID" />
          <Typography className="-mb-2" variant="h6">
            Your SchoolMail
          </Typography>
          <Input label="SchoolMail" size="lg" name="SchoolMail" />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>

          <Input label="Password" size="lg" name="Password" type="password" />
          <Typography className="-mb-2" variant="h6">
            Enter Password Again
          </Typography>
          <Input label="Enter Password Again" size="lg" type="password" />
          <Typography className="-mb-2" variant="h6">
            First Name
          </Typography>
          <Input label="FirstName" size="lg" name="FirstName" />
          <Typography className="-mb-2" variant="h6">
            Last Name
          </Typography>
          <Input label="LastName" size="lg" name="LastName" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Sign Up
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
      </form>
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
