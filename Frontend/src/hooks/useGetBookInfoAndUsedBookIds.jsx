import axios from "axios";

export default function useGetBookInfoAndUsedBookIds(body, id) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/book/${id}`;

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, body);

      if (response.status === 200) {
        // console.log(response.data);

        // 處理獲得的資料
        return response.data;
      }
      console.error("Error:", response.status);
      return null;
      // 處理錯誤狀態
    } catch (error) {
      console.error("Error:", error);

      // 處理錯誤

      return null;
    }
  };

  return fetchData();
}
