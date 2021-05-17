const fs = require('fs')
const  performance  = require(`perf_hooks`).performance;
const chalk = require('chalk');

//C:/Users/Mike/source/repos/AoC2020/input5.txt
let numFile = process.argv[2],
    totalSum = 2020


fs.readFile(numFile,`utf-8`, function(error, data){
    
    if (error) return console.error(error);
    
    let codes = data.split(`\r\n`);

    var t1 = performance.now()
    let ids = getSeatID(codes)
    console.log(getMax(ids))
    console.log(getMySeat(ids))
    var t2 = performance.now()
    console.log(`Call to getSeatId took ${t2-t1} milliseconds.`)
})

function getMax(codes){
    let max = codes[0]
    for (let i = 1; i < codes.length; i++) {
        if(codes[i]>max){
            max = codes[i];
        }
    }
    return max
}

function getSeatID(codes){
    let ids = [];
    for (let i = 0; i < codes.length; i++) {
        
        let a = 1,
            b = 128,
            total = 128,
            p = 1,
            result1 = 0,
            result2 = 0;
            
        //console.log(codes[i])

        for (let j = 0; j < codes[i].length-3; j++) {
            p *=  2 
            
            if(codes[i][j]== `F`){
                b -= total / p
            }else{
                a += (total / p)
            }
            result1 = a;
            //console.log(`a:${a} b:${b} Letter:${codes[i][j]} result:${result1-1}`)
            
        }

        let x = 1,
            y = 8,  
            z = 1;
        total = 8

        for (let j=codes[i].length-3;j < codes[i].length; j++) {
            z *=  2 
            
            if(codes[i][j]== `L`){
                y -= total / z
            }else{
                x += total / z
            }
            result2 = x;

            //console.log(`x:${x} y:${y} Letter:${codes[i][j]} result:${result2-1}`)
            
        }

        ids.push((result1-1) * 8 + (result2-1))
        
    }

    
    return ids
} 

//part2

function getMySeat(ids){

    let sortedIds = ids.sort((a,b) =>{
        if(a>b) return 1
        if(a<b) return -1
        return 0
    });


    for (let i = 0; i < ids.length; i++) {
        if((sortedIds[i]+1)!=sortedIds[i+1]){
            console.log(`Found yer seat seat:${sortedIds[i]+1}:${sortedIds[i+1]}`)
        }

    }
}