import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Listed Books", "Price", "Order Placed Date", "Status", ""];

const TABLE_ROWS = [
  {
    img: "/b2.jpg",
    title: "Title",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "Denied",
  },
  {
    img: "/b2.jpg",
    title: "Title2",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "pending",
  },
  {
    img: "/b2.jpg",
    title: "Title3",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "Finished",
  },
  {
    img: "/b2.jpg",
    title: "Title4",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "Outdated",
  },
];

export default function PersonalBuyerTable() {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  return (
    <Card className="max-h-[70vh] m-8 w-[80vw]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Order Lists
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the ordered books.
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ img, title, amount, date, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={title}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={img}
                        alt={title}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-fit p-1"
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {title}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={status}
                        color={
                          status === "Finished"
                            ? "green"
                            : status === "pending"
                            ? "amber"
                            : status === "Denied"
                            ? "red"
                            : "gray"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    {status === "Finished" && (
                      <Button
                        size="sm"
                        className="bg-[#787878]"
                        onClick={() => setOpenCommentDialog(true)}
                      >
                        Rating
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
