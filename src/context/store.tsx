import React, { createContext, useEffect } from "react";
import { IState, IAction } from "../Interfaces";

const initialFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

const initialState: IState = {
    characters: [],
    favorites: [...initialFavorites]
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, characters: action.payload }
        case 'ADD_FAV':
            return { ...state, favorites: [...state.favorites, action.payload] }
        case 'REMOVE_FAV':
            return { ...state, favorites: state.favorites.filter((fav: number) => fav !== action.payload) }
        default:
            return state;
    }
};

export const Store = createContext<IState|any>(initialState);

export const StoreProvider = ({ children }: any): JSX.Element => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }, [state]);
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

