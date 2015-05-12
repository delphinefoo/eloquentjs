/*THE SUM OF A RANGE

The introduction of this book alluded to the following as a nice way to compute 
the sum of a range of numbers:

console.log(sum(range(1, 10)));
Write a range function that takes two arguments, start and end, and returns an 
array containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum 
of these numbers. Run the previous program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument 
that indicates the “step” value used to build up the array. If no step is given, the array 
elements go up by increments of one, corresponding to the old behavior. The function call 
range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step 
values so that range(5, 2, -1) produces [5, 4, 3, 2].*/

function range(start, end, step) {
  var arr = [], i = start;
  if (arguments.length < 3) { step = 1; }
  if (end > start) {
    while (i <= end) {
      arr.push(i);
      i += step;
    }
  }
  else {     
      while (i >= end) {
        arr.push(i);
        i += step;
      }
  }
  return arr;
}
  
function sum(arr) {
  var total = 0;
  for (var i = arr[0]; i <= arr[arr.length - 1]; i++) {
    total += i;
  }
  return total;
}

//TESTS:
console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]


/*REVERSING AN ARRAY
For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, 
reverseArray, takes an array as argument and produces a new array that has the same elements 
in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it 
modifies the array given as argument in order to reverse its elements. Neither may use the 
standard reverse method.*/

function reverseArray(arr) {
  var newArr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
}

function reverseArrayInPlace(arr) {
  //find length of half the array (rounded down if uneven) to loop over
  var halfLength = arr.length / 2;
  //move arr[i] to an external variable
  //move arr[arr.length - 1- i] to arr[i]
  //move value of external variable to arr[arr.length - 1-i]
  for (var i = 0; i < halfLength; i++) {
    var temp = arr[i];
    arr.splice(i, 1, arr[arr.length-i-1]);
    arr.splice(arr.length-1-i, 1, temp);
  }
  return arr;
}

//TESTS:
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

/*A LIST

Write a function arrayToList that builds up a data structure like 
var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
when given [1, 2, 3] as argument.*/

function arrayToList(arr) {
  var list = null;
  for (var i = arr.length-1; i >= 0; i--) {
    list = {
      value: arr[i],
      rest: list
    }
  }
  return list;
}

/*Write a listToArray function that produces an array from a list*/

function listToArray(list) {
  var arr = [];
  for (var node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
}

/*write the helper functions prepend, which takes an element and a list and creates a new list 
that adds the element to the front of the input list, and nth, which takes a list and a number 
and returns the element at the given position in the list, or undefined when there is no such element.*/

function prepend(toAdd, list) {
  list = {
    value: toAdd,
    rest: list
  }
  return list;
}

function nth(list, num) {
  var arr = listToArray(list);
  return arr[num];
}

//If you haven’t already, also write a recursive version of nth.
function nth(list, num) {
  if (!list) return undefined;
  else if (num == 0) return list.value;
  else {
    return nth(list.rest, num-1);
  }
}



//TESTS:
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20


