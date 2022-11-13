export interface ICharacter {
    created: string,
    episode: [],
    gender: string,
    id: number,
    image: string,
    location: object,
    name: string,
    origin: object,
    species: string,
    status: string,
    type: string,
    url: string,
}

export interface IState {
    characters: [],
    favorites: number[]
    pageNumber: number,
}
export interface IAction {
    type: string,
    payload: any
}

