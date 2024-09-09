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
  ISBN,
}) {
  return (
    <Card className="w-56 h-96 flex items-center">
      <CardHeader floated={false} className="h-56 w-full">
        <img
          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile-picture"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="w-[90%] p-1 h-[40%]">
        <Typography
          color="blue-gray"
          className="font-medium"
          textGradient
          variant="h6"
        >
          {Title.length > 40 ? Title.slice(0, 40) + "..." : Title}
        </Typography>
        <Typography color="blue-gray" className="text-sm" textGradient>
          {AuthorName}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          NT${LowestPrice} ~ NT${HighestPrice}
        </Typography>
      </CardBody>
      <div className="flex flex-row gap-1 p-1 w-[90%]">
        {Genre?.split(",").map((genre) => (
          <Chip variant="ghost" value={genre} size="sm" />
        ))}
      </div>
    </Card>
  );
}
