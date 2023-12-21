import { terminal } from 'terminal-kit';
import affichageBar from './barreDeVie'
import * as fs from 'fs'
var term = require('terminal-kit').terminal;
const readline = require('readline-sync');
let contenu: string

interface fighter {
  name: string
  hp: number
  str: number
}
type f = fighter | undefined;
let hero: f;
let monstre: f;
let boss: f;
let heroHPMax: number
let monstreHPmax: number
let bossHPMax: number

// recuperation de Link
const contenuHer = fs.readFileSync('./json/players.json', 'utf-8')
const dataHero: fighter[] = JSON.parse(contenuHer)
// recuperation de Bokonlin
const contenuEnem = fs.readFileSync('./json/enemies.json', 'utf-8')
const dataEnem: fighter[] = JSON.parse(contenuEnem)

const contenuBoss = fs.readFileSync('./json/bosses.json', 'utf-8')
const dataBoss: fighter[] = JSON.parse(contenuBoss)

export function creationPerssonage() {
  for (const iteration of dataHero) {
    if (iteration.name == 'Link') {
      hero = {
        name: iteration.name,
        hp: iteration.hp,
        str: iteration.str
      }
      heroHPMax = iteration.hp
    }
  }
  for (const iteration of dataEnem) {
    if (iteration.name == 'Bokoblin') {
      monstre = {
        name: iteration.name,
        hp: iteration.hp,
        str: iteration.str
      }
      monstreHPmax = iteration.hp
    }
  }
  for (const iteration of dataBoss) {
    if (iteration.name == 'Ganon') {
      boss = {
        name: iteration.name,
        hp: iteration.hp,
        str: iteration.str
      }
      bossHPMax = iteration.hp;
    }
  }
}
creationPerssonage();
export function combat(round: number, isNextFloorUnlocked: boolean, currentFloor: number) {
  let attack: string
  let heal: string
  console.clear();

  if (monstre && hero && boss) { // verifie que monstre et hero ne sont pas undefined
    tableau(`\n=== Round ${round} of Floor ${currentFloor} ===`)
    if (currentFloor == 9) {
      affichageBar(boss.hp, bossHPMax, boss.name)
    }
    else affichageBar(monstre.hp, monstreHPmax, monstre.name)

    affichageBar(hero.hp, heroHPMax, hero.name)

    if (round == 1) {
      contenu = (`You encounter a ${monstre.name}`)
      tableau(contenu)
    }
    {
      const resume = "You attacked and dealt " + hero.str + " Damages! \nYou receive " + monstre.str + " Damages"
      tableau(resume);
    }


    const test = '------Options-----'
    const answer = readline.question(`1.Attack 2.Heal 3.Escape 4.Protect \n`);
    if (currentFloor == 9) {
      if (answer == 1) {
        const degat = boss.hp - hero.str
        boss.hp = degat
        const resume = "You attacked and dealt " + hero.str + " Damages! \nYou receive " + boss.str + " Damages"
        tableau(resume);
      }
      if (answer == 2) {
        if (hero.hp <= heroHPMax - 1) {
          hero.hp += (heroHPMax / 2)
          if (hero.hp > heroHPMax) hero.hp = heroHPMax
        }
        const resume = "You attacked and dealt " + hero.str + " Damages! \nYou receive " + boss.str + " Damages"
        tableau(resume);
      }
      if (answer == 3) {
        const over: string = "THE GAME IS OVER 😵😵👾😵😵";
        tableau(over);
        process.exit();
        }
        if(answer == 4){
          hero.hp = hero.hp - (boss.str/2) + boss.str

        }


      if (boss.hp <= 0) {
        isNextFloorUnlocked = true
        boss.hp = bossHPMax
      } else { isNextFloorUnlocked = false }
      hero.hp = hero.hp - boss.str

    } else {
      if (answer == 1) {
        const degat = monstre.hp - hero.str
        monstre.hp = degat
        const resume = "You attacked and dealt " + hero.str + " Damages! \nYou receive " + boss.str + " Damages"
        tableau(resume);
      }
      if (answer == 2) {
        if (hero.hp <= heroHPMax - 1) {
          hero.hp += (heroHPMax / 2)
          if (hero.hp > heroHPMax) hero.hp = heroHPMax
        }
      }
      if (answer == 3 || hero.hp <= 0) {
       const over: string = "THE GAME IS OVER 😵😵👾😵😵";
       tableau(over);
       process.exit();
       }
       if(answer == 4){
        hero.hp = hero.hp - (monstre.str/2) + monstre.str
      }

      hero.hp = hero.hp - monstre.str
      if (currentFloor == 9) {
        if (boss.hp <= 0) {
          isNextFloorUnlocked = true
          boss.hp = bossHPMax
        }
      }

      if (monstre.hp <= 0) {
        isNextFloorUnlocked = true
        monstre.hp = monstreHPmax
      } else
        isNextFloorUnlocked = false

    }
    return isNextFloorUnlocked
  }
}



export function tableau(contenue: string) {
  term.table([
    [contenue]
  ], {
    hasBorder: true,
    contentHasMarkup: true,
    borderChars: 'lightRounded',
    borderAttr: { color: 'blue' },
    textAttr: { bgColor: 'default' },
    firstCellTextAttr: { bgColor: 'black' },
    width: 30,
    fit: true // Activate all expand/shrink + wordWrap
  }
  )
}
