import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userType, setUsertype] = useState('admin_user');
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();

  const handleClick = () => {
    axios
      .post("http://rohanpahwa71.pythonanywhere.com/blog/users/", {
        user: {
          username,
          password,
        },
        first_name: firstName,
        last_name: lastName,
        phone,
        user_type: userType,
        city,
        state,
        country,
      })
      .then((res) => {
        console.log("success-", res);
        localStorage.setItem('token', res?.data?.Token);
        localStorage.setItem('username', username);
        history.push("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      username:{" "}
      <input value={username} onChange={(e) => setUsername(e.target.value)} />{" "}
      <br />
      password:{" "}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      firstName:{" "}
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />{" "}
      <br />
      lastName:{" "}
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />{" "}
      <br />
      phone: <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />{" "}
      <br />
      userType:{" "}
      <select
        value={userType}
        onChange={(e) => {
          console.log('select-', e.target.value);
          setUsertype(e.target.value);
        }}
      >
        <option value="admin_user">admin_user</option>
        <option value="normal_user">normal_user</option>
      </select>{" "}
      <br />
      city: <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />{" "}
      <br />
      state: <input
        value={state}
        onChange={(e) => setState(e.target.value)}
      />{" "}
      <br />
      country:{" "}
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Register;
