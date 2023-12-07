import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Sidebar() {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value) => setSelected(value);

  const DepartmentItems = (
    <List>
      <ListItem
        selected={selected === "IM"}
        className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white"
        onClick={() => setSelectedItem("IM")}
      >
        IM
      </ListItem>
      <ListItem
        selected={selected === "FIN"}
        className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white"
        onClick={() => setSelectedItem("FIN")}
      >
        FIN
      </ListItem>
      <ListItem
        selected={selected === "IB"}
        className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white"
        onClick={() => setSelectedItem("IB")}
      >
        IB
      </ListItem>
      <ListItem
        selected={selected === "EE"}
        className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white"
        onClick={() => setSelectedItem("EE")}
      >
        EE
      </ListItem>
    </List>
  );

  return (
    <Card className="h-[80vh] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Category
        </Typography>
      </div>
      <List>
        <ListItem disabled>Department</ListItem>
        {DepartmentItems}
        {/* <ListItem>
            E-Commerce
          </ListItem>
          <ListItem>
            Inbox
          </ListItem> */}
      </List>
    </Card>
  );
}
