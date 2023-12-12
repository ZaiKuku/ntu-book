import UserNav from '../../components/UserNav'
import BooksGroup from '../../components/BooksGroup'
import { Typography } from "@material-tailwind/react";
import Comments from '../../components/Comments';

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen w-screen">
      <main className="flex flex-col w-full items-center pb-10">
        <UserNav />
        <Typography variant="h3" color="blue-gray" className="mb-4 font-medium">
            Listed Books
        </Typography>
        <BooksGroup/>
        <Typography variant="h3" color="blue-gray" className="mb-4 font-medium">
            Comments
        </Typography>
        <Comments/>
      </main>
    </div>
  )
}
