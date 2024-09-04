import axios from "axios";
import React, { useState } from "react";

function Addbook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  /**
   * Add book function
   */
  async function saveBook() {
    try {
      const book = { title, author, year, genre };
      let response = await axios.post("http://localhost:3000/books",book);
      if (response.status === 200) {
        setTitle('');
        setAuthor('');
        setYear('');
        setGenre('');
        alert('Book added successfully!');
      } else {
        alert('Failed to add the book. Please try again.');
      }
    } catch (error) {}
  }

  return (
    <div>
      <section style={{ marginTop: "25px" }}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="inputStyle"
          name="Title"
          id=""
          placeholder="Title"
          value={title}
        />
        <br />
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          className="inputStyle"
          name="Author"
          id=""
          placeholder="Author"
          value={author}
        />
        <br />
        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          className="inputStyle"
          name="Year"
          id=""
          placeholder="Year"
          value={year}
        />
        <br />
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          className="inputStyle"
          name="Genre"
          id=""
          placeholder="Genre"
          value={genre}
        />
        <br />
        <button onClick={() => saveBook()}>Add book</button>
      </section>
    </div>
  );
}

export default Addbook;
