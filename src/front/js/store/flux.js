const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
      characters: [],
      planets: [],
    },
    actions: {
      getCurrentSession: () => {
        const session = JSON.parse(localStorage.getItem("session"));
        return session;
      },
      logout: () => {
        const actions = getActions();
        localStorage.removeItem("session");
        setStore({ session: null });
        setStore({ favorites: [] });
      },
      addCharacterFavorites: async (favorite) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            user: session.user_id,
            planet: null,
            character: favorite.id,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        actions.loadFavorites();
      },
      addPlanetFavorites: async (favorite) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            user: session.user_id,
            planet: favorite.id,
            character: null,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        actions.loadFavorites();
      },
      loadCharacters: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + `/api/character`
        );
        if (response.status === 200) {
          const payload = await response.json();
          const myNewCharacters = payload.map((people, i) => {
            (people["details"] = "/character/"), (people["isFavorite"] = false);
            people["uid"] = i;
            return people;
          });
          setStore({ characters: myNewCharacters });
        }
      },
      loadPlanets: async () => {
        const response = await fetch(process.env.BACKEND_URL + `/api/planet`);
        if (response.status === 200) {
          const payload = await response.json();
          const myNewPlanets = payload.map((planets, i) => {
            (planets.details = "/planet/"), (planets.isFavorite = false);
            planets.uid = i;
            return planets;
          });
          setStore({ planets: myNewPlanets });
        }
      },
      loadFavorites: async () => {
        const store = getStore();
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          headers: {
            Authorization: "Bearer " + session.token,
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          setStore({ favorites: payload });
        }
      },
      login: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/token`,
            options
          );
          if (response.status !== 200) {
            alert("Incorrect Email or Password");
            return false;
          }

          const data = await response.json();
          localStorage.setItem("session", JSON.stringify(data));
          setStore({ session: data });
          return true;
        } catch (error) {
          console.error("Error in login zone");
        }
      },
      deleteCharacter: async (character) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/character/${character.id}`,
          options
        );
        if (response.status !== 200) {
          alert("Error in first");
        }
        actions.loadCharacters();
      },
      deletePlanet: async (planet) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/planet/${planet.id}`,
          options
        );
        if (response.status !== 200) {
          alert("Error in first");
        }
        actions.loadPlanets();
      },
      createUser: async (email, password, gender) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            gender: gender,
          }),
        };

        const response = await fetch(
          process.env.BACKEND_URL + `/api/user`,
          options
        );
        if (response.status !== 200) {
          alert("Incorrect Email or Password");
        }
      },
      removeFavorite: async (favorite) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        if (favorite.planet == null) {
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + session.token,
            },
            body: JSON.stringify({
              user: session.user_id,
              character_id: favorite.character.id,
              planet_id: null,
            }),
          };
          const response = await fetch(
            process.env.BACKEND_URL + `/api/favorite`,
            options
          );
          if (response.status !== 200) {
            alert("Error in response");
          }
        } else {
          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + session.token,
            },
            body: JSON.stringify({
              user: session.user_id,
              character_id: null,
              planet_id: favorite.planet.id,
            }),
          };
          const response = await fetch(
            process.env.BACKEND_URL + `/api/favorite`,
            options
          );
          if (response.status !== 200) {
            alert("Error in response");
          }
        }
        actions.loadFavorites();
      },
      addPlanet: async (
        name,
        climate,
        rotationPeriod,
        orbitalPeriod,
        diameter,
        terrain,
        population,
        imgUrl
      ) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            name: name,
            climate: climate,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter: diameter,
            terrain: terrain,
            population: population,
            img_url: imgUrl,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/planet`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("planet created successfully!");
          return payload;
        }
      },
      addCharacter: async (
        name,
        height,
        hairColor,
        eyeColor,
        skinColor,
        birthYear,
        gender,
        imgUrl
      ) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            name: name,
            height: height,
            hair_color: hairColor,
            eye_color: eyeColor,
            birth_year: birthYear,
            gender: gender,
            img_url: imgUrl,
            skin_color: skinColor,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/character`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("planet created successfully!");
          return payload;
        }
      },
    },
  };
};

export default getState;
