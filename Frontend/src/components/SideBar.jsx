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
import { useSelector, useDispatch } from "react-redux";
import { setDeptCode } from "../redux/setFilterConditions";

const deptCode = {
  中國文學系: "101",
  外國語文學系: "102",
  歷史學系: "103",
  哲學系: "104",
  人類學系: "105",
  圖書資訊學系: "106",
  日本語文學系: "107",
  戲劇學系: "109",
  數學系: "201",
  物理學系: "202",
  化學系: "203",
  地質科學系: "204",
  心理學系: "207",
  地理環境資源學系: "208",
  大氣科學系: "209",
  政治學系: "302",
  經濟學系: "303",
  社會學系: "305",
  社會工作學系: "310",
  醫學系: "401",
  牙醫學系: "402",
  藥學系: "403",
  醫學檢驗暨生物技術學系: "404",
  護理學系: "406",
  物理治療學系: "408",
  職能治療學系: "409",
  學士後護理學系: "412",
  土木工程學系: "501",
  機械工程學系: "502",
  化學工程學系: "504",
  工程科學及海洋工程學系: "505",
  材料科學與工程學系: "507",
  醫學工程學系: "508",
  農藝學系: "601",
  生物環境系統工程學系: "602",
  農業化學系: "603",
  森林學系: "605",
  動物科學技術學系: "606",
  農業經濟學系: "607",
  園藝暨景觀學系: "608",
  獸醫學系: "609",
  生物產業傳播季發展學系: "610",
  生物機電工程學系: "611",
  昆蟲學系: "612",
  植物病理與微生物學系: "613",
  生物技術與食品營養學士學位學程: "615",
  工商管理學系: "701",
  會計學系: "702",
  財務金融學系: "703",
  國際企業學系: "704",
  資訊管理學系: "705",
  公共衛生學系: "801",
  電機工程學系: "901",
  資訊工程學系: "902",
  法律系: "A01",
  生命科學系: "B01",
  生化科技學系: "B02",
};

export default function Sidebar() {
  const { DeptCode } = useSelector((state) => state.FilterConditionSlice.query);
  const [selected, setSelected] = useState(DeptCode);
  const dispatch = useDispatch();
  const handleFilterCondition = (value) => {
    dispatch(setDeptCode(value));
  };
  const setSelectedItem = (value) => {
    if (selected === value) {
      setSelected(null);
      handleFilterCondition(null);
      return;
    }
    setSelected(value);
    handleFilterCondition(value);
  };

  const DepartmentItems = Object.keys(deptCode).map((key) => (
    <ListItem
      selected={selected === deptCode[key]}
      onClick={() => {
        setSelectedItem(deptCode[key]);
      }}
    >
      {key}
    </ListItem>
  ));
  <ListItem
    selected={selected === "IM"}
    className="py-1.5 px-3 text-sm font-normal  hover:bg-gray-400 hover:text-white focus:bg-[#918876] focus:text-white"
    onClick={() => setSelectedItem("IM")}
  >
    IM
  </ListItem>;

  return (
    <Card className="h-[80vh] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Category
        </Typography>
      </div>
      <List className="overflow-auto no-scrollbar">
        <ListItem disabled>Department</ListItem>
        <List>{DepartmentItems}</List>
      </List>
    </Card>
  );
}
