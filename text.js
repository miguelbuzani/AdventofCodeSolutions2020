let file = process.argv[2];

const input = require('fs')
  .readFileSync(file, 'utf-8')
  .split(/^\r\n/mg)
  .map(s => Object.fromEntries(s.split(/\s+/g).map(s => s.split(':'))));

console.log({
  input: input.map(v => ({ v: JSON.stringify(v), isValid: isValid(v), check: check(v) })),
  count: input.reduce((acc, v) => acc + isValid(v), 0),
});

function check(v) {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    .flatMap(k => (k in v && !validPair(k, v[k]) ? k : []))
    .join(' ');
}
function isValid(v) {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].reduce(
    (acc, k) => acc && k in v && validPair(k, v[k]),
    true
  );
}

function validPair(k, v) {
  let m;
  switch (k) {
    case 'byr':
      return v.length === 4 && v >= 1920 && v <= 2002;
    case 'iyr':
      return v.length === 4 && v >= 2010 && v <= 2020;
    case 'eyr':
      return v.length === 4 && v >= 2020 && v <= 2030;
    case 'hgt':
      if ((m = /^([\d.]+)cm$/.exec(v))) return m[1] >= 150 && m[1] <= 193;
      if ((m = /^([\d.]+)in$/.exec(v))) return m[1] >= 59 && m[1] <= 76;
      return false;
    case 'hcl':
      return /^#[0-9a-f]{6}$/.test(v);
    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v);
    case 'pid':
      return /^[0-9]{9}$/.test(v);
  }
}