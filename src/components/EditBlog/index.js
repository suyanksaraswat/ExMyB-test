import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function EditBlog() {
  let history = useHistory();
  let blogId = window.location.pathname.split("/")[2];
  const [blog, setBlog] = useState([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`http://rohanpahwa71.pythonanywhere.com/blog/post/${blogId}`)
      .then((res) => {
        console.log("######blog-", res);
        setBlog(res?.data);

        setTitle(res?.data?.title);
        setSlug(res?.data?.slug);
        setBodyText(res?.data?.body_text);
        setTags(res?.data?.tags);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    axios
      .patch(
        `http://rohanpahwa71.pythonanywhere.com/blog/post/${blogId}`,
        {
          title,
          slug,
          body_text: bodyText,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        console.log("success-", res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* <div>Title: {blog?.title}</div>
      <div>Slug: {blog?.slug}</div>
      <div>Body Text: {blog?.body_text}</div>
      <div>Likes: {blog?.number_of_likes}</div>
      <div>Views: {blog?.number_of_views}</div>
      <div>Timestamp: {blog?.timestamp}</div>
      <div>Author: {blog?.author}</div>
      <div>
        Tags:{" "}
        {blog?.tags?.map((tag) => (
          <span>{tag?.name}</span>
        ))}
      </div>

      <br /> */}
      title: <input value={title} onChange={(e) => setTitle(e.target.value)} />{" "}
      <br />
      slug: <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />{" "}
      <br />
      bodyText:{" "}
      <input
        value={bodyText}
        onChange={(e) => setBodyText(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default EditBlog;
