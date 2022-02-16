import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/home.css";

import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { useHistory } from "react-router-dom";

export const CreatePlanet = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [climate, setClimate] = useState("");
  const [rotationPeriod, setRotationPeriod] = useState("");
  const [orbitalPeriod, setOrbitalPeriod] = useState("");
  const [diameter, setDiameter] = useState("");
  const [terrain, setTerrain] = useState("");
  const [population, setPopulation] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        actions
          .addPlanet(
            name,
            climate,
            rotationPeriod,
            orbitalPeriod,
            diameter,
            terrain,
            population,
            imgUrl
          )
          .then(() => {
            actions.loadPlanets();
            history.push("/");
          });
        e.preventDefault();
      }}
      className="container"
    >
      <div className="mb-3">
        <label for="planetName" className="form-label">
          Name
        </label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          className="form-control"
          id="planetName"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetClimate" className="form-label">
          Climate
        </label>
        <input
          onChange={(e) => {
            setClimate(e.target.value);
          }}
          value={climate}
          type="text"
          className="form-control"
          id="planetClimate"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetRotationPeriod" className="form-label">
          Rotation Period
        </label>
        <input
          onChange={(e) => setRotationPeriod(e.target.value)}
          value={rotationPeriod}
          type="text"
          className="form-control"
          id="planetRotationPeriod"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetOrbitalPeriod" className="form-label">
          Orbital Period
        </label>
        <input
          onChange={(e) => setOrbitalPeriod(e.target.value)}
          value={orbitalPeriod}
          type="text"
          className="form-control"
          id="planetOrbitalPeriod"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetDiameter" className="form-label">
          Diameter
        </label>
        <input
          onChange={(e) => setDiameter(e.target.value)}
          value={diameter}
          type="text"
          className="form-control"
          id="planetDiameter"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetTerrain" className="form-label">
          Terrain
        </label>
        <input
          onChange={(e) => setTerrain(e.target.value)}
          value={terrain}
          type="text"
          className="form-control"
          id="planetTerrain"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetPopulation" className="form-label">
          Population
        </label>
        <input
          onChange={(e) => setPopulation(e.target.value)}
          value={population}
          type="text"
          className="form-control"
          id="planetPopulation"
        ></input>
      </div>
      <div className="mb-3">
        <label for="planetImgUrl" className="form-label">
          Image URL
        </label>
        <input
          onChange={(e) => setImgUrl(e.target.value)}
          value={imgUrl}
          type="text"
          className="form-control"
          id="planetImgUrl"
        ></input>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
