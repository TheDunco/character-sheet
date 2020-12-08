import { abilities, abilityScore, action, defense, equipment, feat, health, money, note, spell, summary, trackable } from './character.service';

export interface character {
    name: string
    class: string,
    xp: number,
    level: number,
    spellcastingAbility: string,
    languages: string,
    miscProfs: string,
    health: health,
    abilityScores: abilityScore,
    summary: summary,
    defenses: defense,
    initiative: number,
    ac: number,
    proficiencies: string[],
    proficiencyBonus: number,
    abilityList: abilities[],
    notesList: note[],
    featsList: feat[],
    equipmentList: equipment[],
    money: money,
    actionList: action[],
    tracklist: trackable[],
    spellList: spell[],
    highestLevelSpell: number,
    preppedSpells: number,
}