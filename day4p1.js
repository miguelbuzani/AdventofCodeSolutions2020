const fs = require(`fs`)
const performance = require(`perf_hooks`).performance
const chalk = require(`chalk`)

let input = process.argv[2];

fs.readFile(input,{encoding: `utf-8`}, function(error,data){

    if (error) return console.error(error);

    let passports = data.split(/^\r\n/gm),
        passpData = [],
        passCred = [];


    let t1 = performance.now();

    passports.forEach((e) => {
        let elements = e.split(/[\n\s]/g)
        elements = elements.filter(function (e){ return e != ``; })
        passpData.push(elements);
    })

    console.log(validatePassport(passpData).length)
    let t2 = performance.now();
    console.log(`This took: ${t2-t1} miliseconds`)

})

function validatePassport(pList){

    let hashPassps = [],
        validPassps = [];
    
    for (let i = 0; i < pList.length; i++) {
        
        let passport = {},
            credCount = 0;

        pList[i].forEach((e) =>{
            let itemP = e.split(`:`);
            passport[itemP[0,0]] = itemP[0,1];
        })
        
        if(passport[`byr`]){
            credCount++
        }if(passport[`iyr`]){
            credCount++
        }if(passport[`eyr`]){
            credCount++
        }if(passport[`hgt`]){
            credCount++
        }if(passport[`hcl`]){
            credCount++
        }if(passport[`ecl`]){
            credCount++
        }if(passport[`pid`]){
            credCount++
        }if(passport[`cid`]){
            credCount++
        }else{
            credCount++
        }

        if(credCount == 8){
            //console.log(passport)
            validPassps.push(passport)
        }

    }

    return validPassps

}

//C:/Users/Mike/source/repos/AoC2020/input4.txt