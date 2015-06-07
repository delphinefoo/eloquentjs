//Eloquent Javascript Chapter 5:

//#1:

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(function (a,b) {
  return a.concat(b);
}));
// → [1, 2, 3, 4, 5, 6]

//#2: 

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Filter for people whose mothers are in the list
var haveMoms = ancestry.filter(function(person) {
  return ancestry.indexOf(byName[person.mother]) > -1
});

// Calculate the age difference: find what year the person was born,
// and calculate the age of the mom at that time.
var ageDiffs = haveMoms.map(function(person) {
  return (person.born) - (byName[person.mother].born)
});

// Average the age differences
console.log(average(ageDiffs));

// → 31.2

//#3:

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// If the century property doesn't exist, the person's century is the property
var centuries = {};
ancestry.forEach(function(person) {
  if (Math.ceil(person.died / 100) in centuries) {
    centuries[Math.ceil(person.died / 100)].push(person.died - person.born);
  }
  
// If the person's century property exists, assign the person to that century
  else {
    centuries[Math.ceil(person.died / 100)] = [person.died - person.born];
  }
});

// average each array in centuries
for (century in centuries) {
	centuries[century] = average(centuries[century]);
};

console.log(centuries);