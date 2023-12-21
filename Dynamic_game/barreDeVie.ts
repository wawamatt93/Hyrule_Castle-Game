// on installe les libraries
const cliProgress = require('cli-progress'); 

const colors = require('ansi-colors');
const readline = require('readline-sync');
let premiere_exec : boolean = true;

colors.alias('secondary', colors.bold);

export default function affichageBar(pointDeVie : number, pointDeVieTotale : number, personage : string) {
    // cette partie c'est uniquement pour tester, dans le vrai programe on l'enlevera
   // const answer = readline.question('mettez la nouvelle valeur '); //
    //pointDeVie = Number(answer); //
    //  process.stdout.write('\x1B[2J\x1B[0f'); // clear le  terminal
    // si les point de vie inferieur a 10 ---> barre de vie rouge
    if (pointDeVie < ((20*pointDeVieTotale)/100)) {
        colors.alias('primary', colors.red);
        console.log(colors.primary.secondary(personage))
        const b2 = new cliProgress.SingleBar({
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
            format: 'HP :' + colors.red('{bar} {percentage}%') + ' || ' + colors.primary.secondary(pointDeVie) + ' / '+ pointDeVieTotale,
        });
        b2.start(pointDeVieTotale, pointDeVie)
        b2.stop()
        console.log('')
        premiere_exec = false;
          
    } 
    // si les point de vie entre 10 et 20 ---> barre de vie jaune
    else if (pointDeVie >= ((20*pointDeVieTotale)/100) && pointDeVie <= ((40*pointDeVieTotale)/100)) {
        colors.alias('primary', colors.yellow);
        console.log(colors.primary.secondary(personage))
        const b3 = new cliProgress.SingleBar({
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
            format: 'HP :' + colors.yellow('{bar} {percentage}%') + ' || ' + colors.primary.secondary(pointDeVie) + ' / '+ pointDeVieTotale,
        });
        b3.start(pointDeVieTotale, pointDeVie)
        b3.stop()
        console.log('')
        premiere_exec = false;
    } 
    // si les point de vie superieur a 20 ---> barre de vie verte
    else if (pointDeVie > ((40*pointDeVieTotale)/100)) {
        colors.alias('primary', colors.green);
        console.log(colors.primary.secondary(personage))
        const  b1 = new cliProgress.SingleBar({
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
        format: 'HP :' + colors.green(' {bar} {percentage}%') + ' || ' + colors.primary.secondary(pointDeVie) + ' / '+ pointDeVieTotale,
    });
        b1.start(pointDeVieTotale, pointDeVie)
        b1.stop()
        console.log('')
        premiere_exec = false;
    }
}

// combat  : (ง •̀_•́)ง
// Mort :   (✖﹏✖)   〓■●＿ ～□○0
// vitoire-danse :  〜(￣▽￣〜) ┌༼▀Ĺ̯▀̿༽┘ (〜￣▽￣)〜 
// en colere : ╭∩╮(-_-)╭∩╮
