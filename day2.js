const fs = require('fs')
const  performance  = require(`perf_hooks`).performance;
const chalk = require('chalk');

let numFile = process.argv[2],
    totalSum = 2020


fs.readFile(numFile, function(error, data){
    
    if (error) return console.error(error);
    
    let fileContent = data.toString().split('\n'),
        fileNumbers = [],
        fileData = [],
        pwdRanges = [],
        pwdLetters = [],
        pwdRules = [];

    fileContent.forEach((e) =>{fileNumbers.push(e.split(':'));})

    fileNumbers.forEach((e) =>{fileData.push(e[0].split(` `))})

    fileData.forEach((e) =>{
        pwdRanges.push(e[0].split(`-`),)
        pwdLetters.push(e[1])
    })

    for (let i = 0; i < fileNumbers.length;i ++) {
        pwdRules.push([pwdRanges[i][0],pwdRanges[i][1],pwdLetters[i],fileNumbers[i][1].trim()])
    }
    
    var t1 = performance.now()
    let pairResults = 0
    console.log(valPasswords(pwdRules))
    var t2 = performance.now()
    console.log(`Call to valPasswords took ${t2-t1} milliseconds.`)
})

function valPasswords(pwdRules){
    let numAcerts = [],
        numOfAcerts = 0;

    for (let i = 0; i < pwdRules.length; i++) {
        let currentPW = pwdRules[i][3];
        

        if((pwdRules[i][2] === currentPW[parseInt(pwdRules[i][0])-1]) != (pwdRules[i][2] === currentPW[parseInt(pwdRules[i][1])-1])){
            numAcerts.push([pwdRules[i][0],pwdRules[i][1],pwdRules[i][2],currentPW]);
            numOfAcerts ++;
            if(pwdRules[i][2] === currentPW[parseInt(pwdRules[i][0])-1]){
                //console.log(`${[pwdRules[i][0]]}${pwdRules[i][1]}${pwdRules[i][2]}${currentPW}`)
                let currentPWE1 = currentPW.substring(0,pwdRules[i][0]-1),
                    currentPWE2 = currentPW.substring(pwdRules[i][0]-1,pwdRules[i][0]),
                    currentPWE3 = currentPW.substring(pwdRules[i][0],pwdRules.length);
                //console.log(`${[pwdRules[i][0],pwdRules[i][1],pwdRules[i][2]]}. Palabra: ${currentPWE1+chalk.red(currentPWE2)+currentPWE3}`)
            }else{
                let currentPWE1 = currentPW.substring(0,pwdRules[i][1]-1),
                    currentPWE2 = currentPW.substring(pwdRules[i][1]-1,pwdRules[i][1]),
                    currentPWE3 = currentPW.substring(pwdRules[i][1],pwdRules.length);
                //console.log(`${[pwdRules[i][0],pwdRules[i][1],pwdRules[i][2]]}. Palabra: ${currentPWE1+chalk.red(currentPWE2)+currentPWE3}`)
            }

        }
        
    }
    return numOfAcerts

}



//C:/Users/Mike/source/repos/AoC2020/input2.txt