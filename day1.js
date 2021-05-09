const fs = require('fs')
const  performance  = require(`perf_hooks`).performance;

let numFile = process.argv[2],
    totalSum = 2020


fs.readFile(numFile, function(error, data){
    
    if (error) return console.error(error);
    
    let fileContent = data.toString().split('\n'),
        fileNumbers = [];

    fileContent.forEach((e) =>{
        fileNumbers[fileContent.indexOf(e)] = parseInt(e);
    })

    //fileNumbers = [1,2,3,4,5,6,7,8,9,10]
    //totalSum = 10
    
    var t1 = performance.now()
    let pairResults = getTriplets(fileNumbers, totalSum);
    var t2 = performance.now()
    console.log(`Call to getTripletes took ${t2-t1} milliseconds.`)
    console.log(pairResults) 
    console.log(pairResults[0][0]+pairResults[0][1]+pairResults[0][2]) 
    console.log(pairResults[0][0]*pairResults[0][1]*pairResults[0][2]) 

    //console.log(pairResults[0][0]+pairResults[0][1])
    //console.log(pairResults[0][0]*pairResults[0][1])
})

function getTriplets(fileNumbers, totalSum){
    let pairTable = {},
        pairResults = []
    for(let i = 0; i < fileNumbers.length - 2; i++){
        totalSum2 = totalSum-fileNumbers[i]

        for (let j = i + 1; j < fileNumbers.length; j ++) {
            if(pairTable[fileNumbers[j]]){
                
                pairResults.push([fileNumbers[j],totalSum2 - fileNumbers[j],fileNumbers[i]]);
                //console.log([fileNumbers[j],totalSum2 - fileNumbers[j],fileNumbers[i]])
                return pairResults;
            }else{
                pairTable[totalSum2 - fileNumbers[j]] = fileNumbers[j];
            }
        }
        
    }
    return pairResults;
}

//C:/Users/Mike/source/repos/AoC2020/input.txt
