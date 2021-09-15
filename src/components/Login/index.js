import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Input, Button, Row, Col } from "antd";

function Login() {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => {
    axios
      .post("http://rohanpahwa71.pythonanywhere.com/blog/api-token-auth/", {
        username,
        password,
      })
      .then((res) => {
        console.log("success-", res);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("username", username);
        history.push("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Row justify="center" style={{ minHeight: '100vh' }}>
      <Col sm={24} md={6} style={{ margin: 'auto', border: '1px solid lightgrey', padding: '60px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Input style={{ marginBottom: '15px' }} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input style={{ marginBottom: '15px' }} type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' onClick={handleClick}>
            Submit
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
