import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateBlog() {
  let history = useHistory();
  let blogId = window.location.pathname.split("/")[2];
  const [blog, setBlog] = useState([]);

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState([]);

  const [newTag, setNewTag] = useState();

  const handleClick = () => {
    let tagsArr = [];
    tags?.map((tag) => tagsArr.push(tag?.id));
    axios
      .post(
        `http://rohanpahwa71.pythonanywhere.com/blog/post/`,
        {
          title,
          body_text: bodyText,
          tags: [...tagsArr],
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        console.log("success-", res);
      })
      .catch((err) => console.error(err));
  };

  const AddTag = () => {
    axios
      .post(
        `http://rohanpahwa71.pythonanywhere.com/blog/tags/`,
        {
          name: newTag,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        let tagsArr = [...tags];
        tagsArr?.push(res?.data);
        setTags(tagsArr);
        setNewTag("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      title: <input value={title} onChange={(e) => setTitle(e.target.value)} />{" "}
      <br />
      bodyText:{" "}
      <input
        value={bodyText}
        onChange={(e) => setBodyText(e.target.value)}
      />{" "}
      <br />
      new tag:{" "}
      <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />{" "}
      <button
        onClick={() => {
          AddTag();
        }}
      >
        Add
      </button>
      <br />
      tags:{" "}
      {tags?.map((res) => (
        <span>{res?.name} ,</span>
      ))}
      <br />
      <button onClick={handleClick}>Create blog</button>
    </div>
  );
}

export default CreateBlog;
