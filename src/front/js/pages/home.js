import React, { useContext, useEffect } from "react";
import "/workspace/react-flask-hello/src/front/styles/home.css";
import { PlanetCards } from "/workspace/react-flask-hello/src/front/js/component/PlanetCards.js";
import { CharacterCards } from "/workspace/react-flask-hello/src/front/js/component/CharacterCards.js";
import { Context } from "/workspace/react-flask-hello/src/front/js/store/appContext.js";

export const Home = (props) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.session && store.session != "" && store.session != undefined)
      actions.loadFavorites();
  }, [store.session]);

  return (
    <div className="container-fluid p-0 pb-4 m-0">
      <h1 className="mx-0 px-4 pb-2 pt-4 headers">Characters</h1>
      <div
        className="d-flex flex-row mx-auto"
        style={{ width: "90%", overflow: "auto" }}
      >
        {store.characters.map((c, i) => (
          <CharacterCards
            data={c}
            uid={store.characters[i].uid}
            favStatus={store.characters[i].isFavorite}
            name={store.characters[i].name}
            gender={store.characters[i].gender}
            hair_color={store.characters[i].hair_color}
            eye_color={store.characters[i].eye_color}
            img={store.characters[i].img_url}
            details={store.characters[i].details}
            key={i}
          />
        ))}
      </div>
      <h1 className="mx-0 px-4 pb-2 pt-4 headers">Planets</h1>
      <div
        className="d-flex flex-row mx-auto mb-4"
        style={{ width: "90%", overflow: "auto" }}
      >
        {store.planets.map((c, i) => (
          <PlanetCards
            data={c}
            uid={store.planets[i].uid}
            img={store.planets[i].img_url}
            favStatus={store.planets[i].isFavorite}
            name={store.planets[i].name}
            climate={store.planets[i].climate}
            population={store.planets[i].population}
            details={store.planets[i].details}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
