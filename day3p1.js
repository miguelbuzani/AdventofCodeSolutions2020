const fs = require('fs')
const  performance  = require(`perf_hooks`).performance;
const chalk = require('chalk');

let numFile = process.argv[2],
    wea = 0



fs.readFile(numFile,{encoding: `utf-8`}, function(error, data){
    
    if (error) return console.error(error);
    let fileContent = data.split('\r\n');

    //fileNumbers = [1,2,3,4,5,6,7,8,9,10]
    //totalSum = 10
    
    var t1 = performance.now()
    console.log(getWamasos(fileContent,1,1));
    console.log(getWamasos(fileContent,3,1));
    console.log(getWamasos(fileContent,5,1));
    console.log(getWamasos(fileContent,7,1));
    console.log(getWamasos(fileContent,1,2));
    console.log(getWamasos(fileContent,1,1)*
    getWamasos(fileContent,3,1)*
    getWamasos(fileContent,5,1)*
    getWamasos(fileContent,7,1)*
    getWamasos(fileContent,1,2))
    var t2 = performance.now()
    console.log(`Call to getTripletes took ${t2-t1} milliseconds.`)
})

//C:/Users/Mike/source/repos/AoC2020/input3.txt

function getWamasos(roadMap,slopex,slopey){
    let j = 0,
        rowLen = roadMap[0].length,
        wamasos = 0;

    for (let i = 0; i < roadMap.length; i+=slopey) {
        //muestraArrCharHighlighted(roadMap[i],j%rowLen)
        if((roadMap[i][j%rowLen])===`#`){
            //muestraArrCharHighlightedGreen(roadMap[i],j%rowLen)
            wamasos++;
        }
        j += slopex;
        
    }
    return wamasos
}

function muestraArrCharHighlighted(arr,pos){

    let currentPW = arr.toString().replace(/,/g, "");
    
    let currentPWE1 = currentPW.substring(0,pos),
        currentPWE2 = currentPW.substring(pos,pos+1),
        currentPWE3 = currentPW.substring(pos+1,arr.length);
    
    console.log(`${currentPWE1+chalk.red(currentPWE2)+currentPWE3}`)
}

function muestraArrCharHighlightedGreen(arr,pos){

    let currentPW = arr.toString().replace(/,/g, "");
    
    let currentPWE1 = currentPW.substring(0,pos),
        currentPWE2 = currentPW.substring(pos,pos+1),
        currentPWE3 = currentPW.substring(pos+1,arr.length);
    
    console.log(`${currentPWE1+chalk.green(currentPWE2)+currentPWE3}`)
    wea++;
}