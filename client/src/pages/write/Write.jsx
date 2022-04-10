import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };  

  return (
    <div className="write">
      <h1>Write Here</h1>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
      <form className="writeForm" onSubmit={submitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Enter your text here"
            type="text"
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
