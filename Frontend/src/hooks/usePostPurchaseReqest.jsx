import axios from "axios";

export default function usePostPurchaseReqest(token, usedBookID) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/api/usedbook/${usedBookID}/request`;

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // 處理獲得的資料
        console.log(response.data);
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
