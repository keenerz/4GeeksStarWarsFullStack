import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/home.css";
import { PlanetCards } from "/workspace/react-flask-hello/src/front/js/component/PlanetCards.js";
import { CharacterCards } from "/workspace/react-flask-hello/src/front/js/component/CharacterCards.js";
import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  console.log("This is your token", store.token);

  const handleClick = (e) => {
    e.preventDefault();
    actions.login(email, password);
  };

  if (store.token && store.token != "" && store.token != undefined)
    history.push("/");

  return (
    <form className="container">
      {store.token && store.token != "" && store.token != undefined ? (
        "You're logged in with token" + store.token
      ) : (
        <div>
          <div className="mb-3">
            {store.token && store.token != "" && store.token != undefined}
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            ></input>
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};
