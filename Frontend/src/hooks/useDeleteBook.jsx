import axios from "axios";
import sweetAlert from "sweetalert";

export default function useDeleteBook(token, id) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/api/book/${id}`;

  const fetchData = async () => {
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sweetAlert("Success!", "Book deleted!", "success");
    } catch (error) {
      console.error("Error:", error);

      // 處理錯誤

      return null;
    }
  };

  return fetchData();
}
