import { character } from './character-type';

export interface user {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    characters: character[]
}