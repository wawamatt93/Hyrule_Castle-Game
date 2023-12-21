import * as game from "./hyrule_castle";
const readline = require('readline-sync')
let isNextFloorUnlocked: boolean = true;
let currentFloor = 1;
let round = 1;
let newPerso : boolean = false;

export default function hyruleTour() {

    for (currentFloor = 1; currentFloor <= 10; round++ ) {
        isNextFloorUnlocked;
        const result = game.combat(round,isNextFloorUnlocked,currentFloor)

            if (isNextFloorUnlocked == result) {
                console.log("Vous avez vaincu les ennemis et pouvez passer à l'étage suivant.");
                round = 0;
                currentFloor++;
                newPerso = true;
            }

    }
            
    if (currentFloor >= 10) {
        console.log("Félicitations ! Vous avez terminé le défi du Château d'Hyrule.");
        currentFloor = 0;
    } else {
        console.log("Le défi est terminé. Vous n'avez pas réussi à atteindre le sommet du château.");
    }
    
}
hyruleTour();
