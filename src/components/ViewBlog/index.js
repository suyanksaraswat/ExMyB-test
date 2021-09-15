import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Tag } from "antd";

function ViewBlog() {
  let history = useHistory();
  let blogId = window.location.pathname.split("/")[2];
  const [blog, setBlog] = useState([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState([]);

  const increaseView = () => {
    axios
      .post(
        `http://rohanpahwa71.pythonanywhere.com/blog/increate-number-of-views/${blogId}/`,
        {},
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        getBlog();
      })
      .catch((err) => console.error(err));
  };

  const getBlog = () => {
    axios
      .get(`http://rohanpahwa71.pythonanywhere.com/blog/post/${blogId}`)
      .then((res) => {
        setBlog(res?.data);

        setTitle(res?.data?.title);
        setSlug(res?.data?.slug);
        setBodyText(res?.data?.body_text);
        setTags(res?.data?.tags);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    increaseView();

    getBlog();
  }, []);

  return (
    // <div>
    //   <div>Title: {blog?.title}</div>
    //   <div>Slug: {blog?.slug}</div>
    //   <div>Body Text: {blog?.body_text}</div>
    //   <div>Likes: {blog?.number_of_likes}</div>
    //   <div>Views: {blog?.number_of_views}</div>
    //   <div>Timestamp: {blog?.timestamp}</div>
    //   <div>Author: {blog?.author}</div>
    //   <div>
    //     Tags:{" "}
    //     {blog?.tags?.map((tag) => (
    //       <span>{tag?.name}</span>
    //     ))}
    //   </div>
    // </div>
    <Card title={`Blog ${blogId}`}>
      <Card
        type="inner"
        title={blog?.title}
        extra={
          <span onClick={() => history.push(`/dashboard`)}>
            Go Back
          </span>
        }
      >
        <div>Slug: {blog?.slug}</div>
        <div>Body Text: {blog?.body_text}</div>
        <div>Likes: {blog?.number_of_likes}</div>
        <div>Views: {blog?.number_of_views}</div>
        <div>Timestamp: {blog?.timestamp}</div>
        <div>Author: {blog?.author}</div>
        <div>
          Tags:{" "}
          {blog?.tags?.map((tag) => (
            <Tag color="blue">{tag?.name}</Tag>
          ))}
        </div>
      </Card>
    </Card>
  );
}

export default ViewBlog;
