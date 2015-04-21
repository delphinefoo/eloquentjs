/*Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

var toPrint = "";
for (var i = 0; i < 7; i ++) {
  toPrint += "#";
  console.log(toPrint);
}


/* Write a program that uses console.log to print all the numbers from 1 to 100, 
with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, 
and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz", 
for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" 
for numbers divisible by only one of those). */

for (var i = 1; i <= 100; i++) {
  var text = "";
  if (i % 3 == 0) {
    text += "Fizz";
  }
  if (i % 5 == 0) {
      text += "Buzz";
  }
  console.log(text||i);
}

/* Write a program that creates a string that represents an 8×8 grid, using newline characters 
to separate lines. At each position of the grid there is either a space or a “#” character. 
The characters should form a chess board.

Passing this string to console.log should show something like this:

 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #

When you have a program that generates this pattern, define a variable size = 8 and change the 
program so that it works for any size, outputting a grid of the given width and height. */

var size = 8, text = "";
for (var i = 0; i < size; i++) {
  for (var j = 0; j < size; j++) {
    if ((i + j) % 2 == 0) {
      text += " ";
    }
    else {
      text += "#";
    }
  }
  text += "\n";
}
console.log(text);

