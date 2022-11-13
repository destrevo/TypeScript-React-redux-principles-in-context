import React, { Fragment, useContext, useEffect } from 'react';
import './App.scss';
import { Store } from './context/store';
import { ICharacter } from './Interfaces';

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.characters.length === 0 && fetchDataAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataAction = async () => {
    const data = await fetch("https://rickandmortyapi.com/api/character");
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON?.results
    });
  };

  const FavoriteHandler = (id: number) => {
    if (!state.favorites.includes(id)) {
      return dispatch({
        type: "ADD_FAV",
        payload: id,
      })
    } else {
      return dispatch({
        type: "REMOVE_FAV",
        payload: id,
      })
    }
  };

  console.log(state);
  return (

    <Fragment>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite characters!</p>
      <section className='card-wrapper'>
        {state.characters.map((character: ICharacter) => {
          const { id, name, image, species } = character;
          return (
            <div className="card" key={id}>
              <div className='image-content'>
                <img src={image} alt={name} />
              </div>

              <div className="card-content">
                <h3>{name}</h3>
                <p>{species}</p>
                <button type="button"
                  className={`button ${state.favorites.includes(id) ? 'active' : ''}`}
                  onClick={() => FavoriteHandler(id)}>
                  {state.favorites.includes(id) ? 'Remove from favorites' : 'Add to favorites'}
                </button>
              </div>
            </div>
          );
        })}
      </section>

    </Fragment>

  );
}

export default App;
