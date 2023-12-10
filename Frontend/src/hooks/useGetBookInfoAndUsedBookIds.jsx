import axios from "axios";

export default function useGetBookInfoAndUsedBookIds(token, id) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/api/book/${id}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
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
