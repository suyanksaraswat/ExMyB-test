import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";

function Dashboard() {
  let history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [userType, setUserType] = useState();

  const likePost = (id) => {
    axios
      .post(
        `http://rohanpahwa71.pythonanywhere.com/blog/like-a-post/${id}/`,
        {},
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        getBlogs();
      })
      .catch((err) => console.error(err));
  };

  const checkUserType = () => {
    axios
      .get("http://rohanpahwa71.pythonanywhere.com/blog/users/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        res?.data?.map((user) => {
          if (user?.user?.username === localStorage.getItem("username")) {
            setUserType(user?.user_type);
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const getBlogs = () => {
    axios
      .get("http://rohanpahwa71.pythonanywhere.com/blog/post/")
      .then((res) => {
        setBlogs(res?.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    checkUserType();

    getBlogs();
  }, []);

  return (
    <div>
      <div>
        <Card title="Blogs">
          {blogs &&
            blogs?.length > 0 &&
            blogs?.map((res) => (
              <Card
                type="inner"
                title={res?.title}
                extra={
                  <span onClick={() => history.push(`/edit-blog/${res?.id}`)}>
                    Edit
                  </span>
                }
              >
                <div>Likes: {res?.number_of_likes}</div>
                <div
                  onClick={() => likePost(res?.id)}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                >
                  <LikeOutlined />
                </div>
                <Button onClick={() => history.push(`/view-blog/${res?.id}`)}>
                  View Blog
                </Button>
              </Card>
            ))}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
