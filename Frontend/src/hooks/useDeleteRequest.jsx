import axios from "axios";

export default function useDeleteRequest(token, id) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/api/usedbook/${id}/request`;

  const fetchData = async () => {
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error:", error);

      // 處理錯誤

      return null;
    }
  };

  return fetchData();
}
