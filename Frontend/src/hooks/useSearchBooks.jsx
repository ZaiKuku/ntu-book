import axios from "axios";

export default function useSearchBooks(query, token) {
  const api = process.env.API_URL + "/api/book?";

  const apiUrl =
    api +
    (query.BookName ? `BookName=${query.BookName}` : "") +
    (query.Author ? `Author=${query.Author}` : "") +
    (query.Publisher ? `Publisher=${query.Publisher}` : "") +
    (query.ISBN ? `ISBN=${query.ISBN}` : "") +
    (query.CourseName ? `CourseName=${query.CourseName}` : "") +
    (query.DeptCode ? `&DeptCode=${query.DeptCode}` : "");
  console.log(apiUrl);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
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
