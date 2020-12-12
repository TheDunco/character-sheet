import { Character } from './character-type';

export interface User {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    characters?: Character[]
}