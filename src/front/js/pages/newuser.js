import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/home.css";
import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { useHistory } from "react-router-dom";

export const CreateUser = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        actions
          .createUser(email, password, gender)
          .then((session) => history.push("/login"));
        e.preventDefault();
      }}
      className="container"
    >
      <div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="shhhh"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label for="gender" className="form-label">
            Gender
          </label>
          <select
            class="form-select"
            id="gender"
            name="gender"
            aria-label="Default select example"
            onChange={(e) => setGender(e.target.value)}
          >
            <option selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non Binary</option>
            <option value="n/a">I don't wish to share</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
