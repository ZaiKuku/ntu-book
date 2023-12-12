import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

export default function BookCard({
  Title,
  AuthorName,
  Genre,
  LowestPrice,
  HighestPrice,
}) {
  return (
    <Card className="w-56 h-96 flex items-center">
      <CardHeader floated={false} className="h-56 w-full">
        <img
          src="/b2.jpg"
          alt="profile-picture"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="w-[90%] p-1">
        <Typography
          color="blue-gray"
          className="font-medium"
          textGradient
          variant="h5"
        >
          {Title}
        </Typography>
        <Typography color="blue-gray" className="text-sm" textGradient>
          {AuthorName}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          NT${LowestPrice} ~ NT${HighestPrice}
        </Typography>
        <Typography color="blue-gray" className="text-sm" textGradient>
          4 賣家
        </Typography>
      </CardBody>
      <div className="flex flex-row gap-1 p-1 w-[90%]">
        <Chip variant="ghost" value={Genre} size="sm" />
      </div>
    </Card>
  );
}
