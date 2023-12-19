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
  中國文學系: "1010",
  外國語文學系: "1020",
  歷史學系: "1030",
  哲學系: "1040",
  人類學系: "1050",
  圖書資訊學系: "1060",
  日本語文學系: "1070",
  戲劇學系: "1090",
  數學系: "2010",
  物理學系: "2020",
  化學系: "2030",
  地質科學系: "2040",
  心理學系: "2070",
  地理環境資源學系: "2080",
  大氣科學系: "2090",
  政治學系: "3020",
  經濟學系: "3030",
  社會學系: "3050",
  社會工作學系: "3100",
  醫學系: "4010",
  牙醫學系: "4020",
  藥學系: "4030",
  醫學檢驗暨生物技術學系: "4040",
  護理學系: "4060",
  物理治療學系: "4080",
  職能治療學系: "4090",
  學士後護理學系: "4120",
  土木工程學系: "5010",
  機械工程學系: "5020",
  化學工程學系: "5040",
  工程科學及海洋工程學系: "5050",
  材料科學與工程學系: "5070",
  醫學工程學系: "5080",
  農藝學系: "6010",
  生物環境系統工程學系: "6020",
  農業化學系: "6030",
  森林學系: "6050",
  動物科學技術學系: "6060",
  農業經濟學系: "6070",
  園藝暨景觀學系: "6080",
  獸醫學系: "6090",
  生物產業傳播季發展學系: "6100",
  生物機電工程學系: "6110",
  昆蟲學系: "6120",
  植物病理與微生物學系: "6130",
  生物技術與食品營養學士學位學程: "6150",
  工商管理學系: "7010",
  會計學系: "7020",
  財務金融學系: "7030",
  國際企業學系: "7040",
  資訊管理學系: "7050",
  公共衛生學系: "8010",
  電機工程學系: "9010",
  資訊工程學系: "9020",
  法律系: "A010",
  生命科學系: "B010",
  生化科技學系: "B020",
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
