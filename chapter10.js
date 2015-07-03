/*MONTH NAMES
Write a simple module similar to the weekDay module that can convert month numbers 
(zero-based, as in the Date type) to names and can convert names back to numbers. 
Give it its own namespace since it will need an internal array of month names, and 
use plain JavaScript, without any module loader system.*/

var month = function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'];
  return {
    name: function(number) { return months[number]; },
    number: function(name) { return months.indexOf(name); }
  }
}();

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10


/*A RETURN TO ELECTRONIC LIFE

Hoping that Chapter 7 is still somewhat fresh in your mind, think back to the system designed in 
that chapter and come up with a way to separate the code into modules. Aim for three to five modules.
You can choose to have some functions become internal to their module and thus inaccessible to other modules.

To refresh your memory, these are the functions and types defined in that chapter, in order of appearance:

Vector
Grid
directions
directionNames
randomElement
BouncingCritter
elementFromChar
World
charFromElement
Wall
View
WallFollower
dirPlus
LifelikeWorld
Plant
PlantEater
SmartPlantEater
Tiger

*/

