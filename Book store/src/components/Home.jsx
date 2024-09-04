import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [books, setBooks] = useState([]);

  /**
   * load initial book records
   */
  useEffect(() => {
    /**
     * get book function
     */
    async function getBooks() {
      try {
        let response = await axios.get("http://localhost:3000/books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("something wen wrong", error);
      }
    }
    getBooks();
  }, []);

  /**
   * Delete Book using id
   * @param {*} id 
   */
  async function deleteBook(id) {
    try {
      const userResponse = confirm("Are you sure you want to proceed?");
      if (userResponse) {
        await axios.delete(`http://localhost:3000/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.genre}</td>
              <td className="greenColor" onClick={() => updateBook(book._id)}>
                  <b>Update</b>
                </td>
                <td className="redColor" onClick={() => deleteBook(book._id)}>
                  <b>Delete</b>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
