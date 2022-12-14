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
    const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${state.pageNumber}`) // 42;
    const dataJSON = await data.json() || [];
  
      dispatch({
        type: "FETCH_DATA",
        payload: !!state.characters ? [...state.characters, ...dataJSON?.results] : dataJSON?.results  
      })
      dispatch({
        type: "SET_PAGE",
        payload: 1
      })
      
  };
  console.log(state.characters)
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

      <button type="button" className="button" onClick={fetchDataAction}>Load more</button>

    </Fragment>

  );
}

export default App;
