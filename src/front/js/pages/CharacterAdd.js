import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/home.css";

import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { useHistory } from "react-router-dom";

export const CreateCharacter = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [skinColor, setSkinColor] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        actions
          .addCharacter(
            name,
            height,
            hairColor,
            eyeColor,
            skinColor,
            birthYear,
            gender,
            imgUrl
          )
          .then(() => {
            actions.loadCharacters();
            history.push("/");
          });
        e.preventDefault();
      }}
      className="container"
    >
      <div className="mb-3">
        <label for="characterName" className="form-label">
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
        <label for="characterHeight" className="form-label">
          Height
        </label>
        <input
          onChange={(e) => {
            setHeight(e.target.value);
          }}
          value={height}
          type="text"
          className="form-control"
          id="characterHeight"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterHairColor" className="form-label">
          Hair Color
        </label>
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
          type="text"
          className="form-control"
          id="characterHairColor"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterEyeColor" className="form-label">
          Eye Color
        </label>
        <input
          onChange={(e) => setEyeColor(e.target.value)}
          value={eyeColor}
          type="text"
          className="form-control"
          id="characterEyeColor"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterSkinColor" className="form-label">
          Skin Color
        </label>
        <input
          onChange={(e) => setSkinColor(e.target.value)}
          value={skinColor}
          type="text"
          className="form-control"
          id="characterSkinColor"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterBirthYear" className="form-label">
          Birth Year
        </label>
        <input
          onChange={(e) => setBirthYear(e.target.value)}
          value={birthYear}
          type="text"
          className="form-control"
          id="characterBirthYear"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterGender" className="form-label">
          Gender
        </label>
        <input
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          type="text"
          className="form-control"
          id="characterGender"
        ></input>
      </div>
      <div className="mb-3">
        <label for="characterImgUrl" className="form-label">
          Image URL
        </label>
        <input
          onChange={(e) => setImgUrl(e.target.value)}
          value={imgUrl}
          type="text"
          className="form-control"
          id="characterImgUrl"
        ></input>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
