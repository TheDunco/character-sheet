import { Ability, AbilityScore, Action, Defense, Equipment, Feat, Health, Money, Note, Spell, Summary, Trackable } from './character.service';

export interface character {
    name: string
    class: string,
    xp: number,
    level: number,
    spellcastingAbility: string,
    languages: string,
    miscProfs: string,
    health: Health,
    abilityScores: AbilityScore,
    summary: Summary,
    defenses: Defense,
    initiative: number,
    ac: number,
    proficiencies: string[],
    proficiencyBonus: number,
    abilityList: Ability[],
    notesList: Note[],
    featsList: Feat[],
    equipmentList: Equipment[],
    money: Money,
    actionList: Action[],
    tracklist: Trackable[],
    spellList: Spell[],
    highestLevelSpell: number,
    preppedSpells: number,
    ID: string
}