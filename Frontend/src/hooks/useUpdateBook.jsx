/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useUpdateBook(token, body) {
  // const api = process.env.API_URL;
  const api = "http://127.0.0.1:8000";
  const apiUrl = `${api}/api/book/${body.ISBN}`;

  const fetchData = async () => {
    try {
      const response = await axios.put(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        sweetAlert(
          "Update successfully",
          "Please click OK to continue",
          "success"
        );
        return response.data;
        // 處理獲得的資料
      } else {
        console.error("Error:", response.status);

        // 處理錯誤狀態
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          sweetAlert(
            "Please enter complete information",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 403) {
          sweetAlert(
            "Email has already been registered",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 422) {
          sweetAlert(
            "Invalid Email or Password format",
            "Please try again",
            "error"
          );
        } else {
          console.error("Error:", error);
          // eslint-disable-next-line no-alert
          sweetAlert("An error occurred", "Please try again later", "error");
        }

        // 處理錯誤
      }
    }
  };
  return fetchData();
}
