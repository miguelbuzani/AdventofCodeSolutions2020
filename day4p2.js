// FAILED WITH 192 answare

const fs = require(`fs`)
const performance = require(`perf_hooks`).performance
const chalk = require(`chalk`)

let regByr = /^19[2-9]\d$|^200[0-2]$/gm,
        regIyr = /^201\d$|^2020$/gm,
        regEyr = /^202\d$|^2030$/gm,
        regHgt = /^1[5-8]\dcm$|^19[1-3]cm$|^59in$|^6\din$|^7[0-6]in$/gm,
        regHcl = /^#[a-f0-9]{6}$/gm,
        regEcl = /^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/gm,
        regPid = /^\d{9}$/gm;


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

    let t2 = performance.now();
        
    console.log(validatePassport(passpData).length)
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

        let matchByr = regByr.exec(passport[`byr`]),
        matchIyr = regIyr.exec(passport[`iyr`]),
        matchEyr = regEyr.exec(passport[`eyr`]),
        matchHgt = regHgt.exec(passport[`hgt`]),
        matchHcl = regHcl.exec(passport[`hcl`]),
        matchEcl = regEcl.exec(passport[`ecl`]),
        matchPid = regPid.exec(passport[`pid`]);
        
        if(matchByr){
            credCount++
        }
        if(matchIyr){
            credCount++
        }
        if(matchEyr){
            credCount++
        }
        if(matchHgt){
            credCount++
        }
        if(matchHcl){
            credCount++
        }
        if(matchEcl){
            credCount++
        }
        if(matchPid){
            credCount++
        }

        if(credCount == 7){
            //console.log(passport)
            validPassps.push(passport)
        }
        regByr.lastIndex = 0;
        regIyr.lastIndex = 0;
        regEyr.lastIndex = 0;
        regHgt.lastIndex = 0;
        regHcl.lastIndex = 0;
        regEcl.lastIndex = 0;
        regPid.lastIndex = 0;

    }

    return validPassps

}

//C:/Users/Mike/source/repos/AoC2020/input4.txt