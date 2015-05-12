/*FLATTENING

Use the reduce method in combination with the concat method to “flatten” an array of arrays 
into a single array that has all the elements of the input arrays.*/

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce(function(a,b) {
  return a.concat(b);
}))

/*MOTHER-CHILD AGE DIFFERENCE

Using the example data set from this chapter, compute the average age difference between 
mothers and children (the age of the mother when the child is born). You can use the average 
function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in the array. 
The byName object, which makes it easy to find a person’s object from their name, might be useful here.*/

function avg_mother_age_at_birth(obj) {
  var hasMoms = obj.filter(function(person) {
    return person.mother in byName;
  });
  return average(hasMoms.map(function(person) {
    return person.born - byName[person.mother].born;
  }));
  
}
console.log(avg_mother_age_at_birth(ancestry));

/*HISTORICAL LIFE EXPECTANCY
Compute and output the average age of the people in the ancestry data set per century. 
A person is assigned to a century by taking their year of death, dividing it by 100, 
and rounding it up, as in Math.ceil(person.died / 100).

For bonus points, write a function groupBy that abstracts the grouping operation. 
It should accept as arguments an array and a function that computes the group for an
element in the array and returns an object that maps group names to arrays of group members.*/

groups = {};

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

/*if (!(Math.ceil(ancestry[i].died / 100)) in groups) {
  groups[Math.ceil(ancestry[i].died / 100) = [ancestry[i].died - ancestry[i].born]
}
else {
  groups[Math.ceil(ancestry[i].died / 100)].push(ancestry[i].died - ancestry[i].born])
}*/


function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}


function grouper(person, grp) {
  if (Math.ceil(person.died / 100) in grp) {
    grp[Math.ceil(person.died / 100)].push(person.died - person.born);
  }
  else {
    grp[Math.ceil(person.died / 100)] = [person.died - person.born];
  }
}

function groupBy(array, func) {
  var group ={};
  for (var i = 0; i < array.length; i++) {
    var current = array[i]
    func(current, group);
  }
  return group;
}

for (item in (groupBy(ancestry, grouper))) {
  console.log(item + ': ' + Math.round(average(groupBy(ancestry, grouper)[item])*10)/10);
};

