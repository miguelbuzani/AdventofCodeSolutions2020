const fs = require('fs')
const  performance  = require(`perf_hooks`).performance;
const chalk = require('chalk');

let numFile = process.argv[2];
//C:/Users/Mike/source/repos/AoC2020/input6.txt

fs.readFile(numFile,{encoding: `utf-8`}, function(error, data){
    
    if (error) return console.error(error);
    
    let groups = data.split(/^\r\n/gm).filter((e)=> {return e != ``});
    
    
    var t1 = performance.now()
    console.log(getSum(groups))
    var t2 = performance.now()
    console.log(`Call to valPasswords took ${t2-t1} milliseconds.`)
    
})

function getSum(groups){

    let groupsSum = 0;
    
    for (let i = 0; i < groups.length; i++) {

        let cleanGroup =  groups[i].replace(/[\r\n\s]/gm,``),
            answares = cleanGroup.split(``),
            elementsU = [];
        
        answares.forEach((e) =>{

            if(!elementsU.includes(e)){
                groupsSum += 1
                elementsU.push(e)
            }   

        })

    }

    return groupsSum

}