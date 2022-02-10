const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
      characters: [],
      planets: [],
      images: {
        "/CharacterDetails/0":
          "https://cdn.vox-cdn.com/thumbor/CbgKIPPzOnjph22XYg7SJK7jxLo=/0x0:2935x1544/920x613/filters:focal(1364x397:1832x865):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68550262/luke_jabbas_palace.0.jpg",
        "/CharacterDetails/1":
          "https://images.immediate.co.uk/production/volatile/sites/3/2019/10/EP9-FF-001686-336e75b.jpg",
        "/PlanetDetails/0":
          "https://media.moddb.com/cache/images/mods/1/17/16326/thumb_620x2000/tatoine.png",
        "/PlanetDetails/1":
          "https://2w6kxc22rrr9mabqt1mglgait6-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/alderaan-planet-explosion-small.jpg",
      },
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /*
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
        const response = await fetch(process.env.BACKEND_URL + `/api/favorite`);
        if (response.status === 200) {
          const payload = await response.json();
          setStore({ favorites: payload });
        }
      },
    },
  };
};

export default getState;
