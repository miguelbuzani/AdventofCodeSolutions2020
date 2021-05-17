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
    console.log(`Call to getSum took ${t2-t1} milliseconds.`)
    
})

function getSum(groups){

    let groupsSum = 0;
    
    for (let i = 0; i < groups.length; i++) {

        let cleanGroup =  groups[i].split(`\r\n`).filter((e)=> {return e != ``}),
            answares = groups[i].replace(/[\r\n\s]/gm,``).split(``),
            uAns = answares.filter((e,index) => {return answares.indexOf(e) === index}),
            sum = 0;
        
        uAns.forEach((e) =>{
            //let regx = new RegExp(`(.+)?[${e}](.+)?`,`gm`),
            let ocGroups = groups[i].replace(/[\r\n]/gm,``).split(e);
            //console.log(ocGroups.length-1,cleanGroup.length,ocGroups)
            if (cleanGroup.length == 1) {
                sum += 1
                
            }else{
                if ((ocGroups.length-1) == cleanGroup.length) {
                    sum += 1
                    //console.log(ocGroups.length-1,cleanGroup.length,e,ocGroups)
                }
            }
        
        })

        groupsSum += sum
        //console.log(uAns.length)

    }

    return groupsSum

}