/*
// Define handlers/middleware here

// Get all todos
// notice that these functions are const methods; they change DB, but not the caller (frontend)
export const getTodos = async (req, res) => {
  try {
    // Find all todos
    const todos = await TodoModel.find({});

    // Return todos
    return res.status(200).json(todos);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};

*/
