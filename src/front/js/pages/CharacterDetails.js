import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { Link, useParams } from "react-router-dom";

export const CharacterDetails = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img
            src={
              store.characters[params.theuid]?.img_url ||
              "https://via.placeholder.com/800x600"
            }
            className="float-start"
            height="600"
            width="800"
          ></img>
        </div>
        <div className="col text-center">
          <h1 className="mt-4">{store.characters[params.theuid]?.name}</h1>
          <p className="description">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur
          </p>
        </div>
      </div>
      <hr className="detailline"></hr>
      <div className="row factsbox">
        <div className="col facts">
          <h5>
            <b>Name</b>
          </h5>
          <p>{store.characters[params.theuid]?.name}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Birth Year</b>
          </h5>
          <p>{store.characters[params.theuid]?.birth_year}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Gender</b>
          </h5>
          <p>{store.characters[params.theuid]?.gender}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Height (cm)</b>
          </h5>
          <p>{store.characters[params.theuid]?.height}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Skin Color</b>
          </h5>
          <p>{store.characters[params.theuid]?.skin_color}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Eye Color</b>
          </h5>
          <p>{store.characters[params.theuid]?.eye_color}</p>
        </div>
      </div>
    </div>
  );
};
CharacterDetails.propTypes = {
  uid: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  birth_year: PropTypes.string,
  height: PropTypes.string,
  skin_color: PropTypes.string,
  gender: PropTypes.string,
  hair_color: PropTypes.string,
  eye_color: PropTypes.string,
};
