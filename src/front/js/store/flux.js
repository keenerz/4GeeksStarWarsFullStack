const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
      characters: [],
      planets: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },
      // loadSomeData: () => {
      //   /*
      //       fetch().then().then(data => setStore({ "foo": data.bar }))
      //     */
      // },
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
      },
      logout: () => {
        sessionStorage.removeItem("token");
        console.log("logging out");
        setStore({ token: null });
      },
      addFavorites: (favorite) => {
        const store = getStore();
        if (favorite.isFavorite === true) {
          favorite.isFavorite = false;
          setStore({
            favorites: store.favorites.filter(
              (favoriteItem) =>
                favoriteItem.uid + favoriteItem.name !==
                favorite.uid + favorite.name
            ),
          });
        } else {
          favorite.isFavorite = true;
          setStore({ favorites: store.favorites.concat(favorite) });
        }
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            planet: favorite.planet,
            character: favorite.character,
          }),
        };
      },
      removeFavorites: (i) => {
        const { favorites } = getStore();
        let newFavorites = favorites.map((item, index) => {
          if (index === i) {
            item["isFavorite"] = false;
            return item;
          } else {
            return item;
          }
        });
        setStore({
          favorites: newFavorites.filter(
            (f, indexToDelete) => indexToDelete !== i
          ),
        });
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
          console.log(payload.results);
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
          console.log(myNewPlanets);
        }
      },
      loadFavorites: async () => {
        const store = getStore();
        const options = {
          headers: {
            Authorization: "Bearer " + store.token,
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
            alert("Error in first");
            return false;
          }

          const data = await response.json();
          console.log("comes from the backend", data);
          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token });
          return true;
        } catch (error) {
          console.error("Error in login zone");
        }
      },
    },
  };
};

export default getState;
