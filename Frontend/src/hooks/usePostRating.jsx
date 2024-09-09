import axios from "axios";
import sweetAlert from "sweetalert";

export default function usePostRating(body, token, usedBookID) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/api/usedbook/${usedBookID}/rate`;
  console.log(token);
  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // 處理獲得的資料
        sweetAlert(
          "Success!",
          "Your purchase request has been sent!",
          "success"
        );

        return response.data;
      }
      console.error("Error:", response.status);

      return null;
      // 處理錯誤狀態
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        sweetAlert("Oops!", "You have already sent a request!", "error");
      }

      // 處理錯誤

      return null;
    }
  };

  return fetchData();
}
