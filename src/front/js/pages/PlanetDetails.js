import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";
import { Link, useParams } from "react-router-dom";

export const PlanetDetails = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img
            src={
              store.images["/planet/" + params.theuid] ||
              "https://via.placeholder.com/800x600"
            }
            className="float-start"
            height="600"
            width="800"
          ></img>
        </div>
        <div className="col text-center">
          <h1 className="mt-4">{store.planets[params.theuid]?.name}</h1>
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
          <p>{store.planets[params.theuid]?.name}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Climate</b>
          </h5>
          <p>{store.planets[params.theuid]?.climate}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Population</b>
          </h5>
          <p>{store.planets[params.theuid]?.population}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Orbital Period</b>
          </h5>
          <p>{store.planets[params.theuid]?.orbital_period}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Rotation Period</b>
          </h5>
          <p>{store.planets[params.theuid]?.rotation_period}</p>
        </div>
        <div className="col facts">
          <h5>
            <b>Diameter</b>
          </h5>
          <p>{store.planets[params.theuid]?.diameter}</p>
        </div>
      </div>
    </div>
  );
};

PlanetDetails.propTypes = {
  uid: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  climate: PropTypes.string,
  population: PropTypes.string,
  orbital_period: PropTypes.string,
  rotation_period: PropTypes.string,
  diameter: PropTypes.string,
};
