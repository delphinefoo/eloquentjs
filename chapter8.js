//RETRY

//Say you have a function primitiveMultiply that, in 50 percent of cases, 
//multiplies two numbers, and in the other 50 percent, raises an exception 
//of type MultiplicatorUnitFailure. Write a function that wraps this clunky 
//function and just keeps trying until a call succeeds, after which it returns 
//the result.

//Make sure you handle only the exceptions you are trying to handle.

function MultiplicatorUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    }
    else {
      throw e;
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

//Consider the following (rather contrived) object:

//var box = {
  //locked: true,
  //unlock: function() { this.locked = false; },
  //lock: function() { this.locked = true;  },
  //_content: [],
  //get content() {
    //if (this.locked) throw new Error("Locked!");
    //return this._content;
  //}
//};
//It is a box with a lock. Inside is an array, but you can get at it only when 
//the box is unlocked. Directly accessing the _content property is not allowed.

//Write a function called withBoxUnlocked that takes a function value as argument, 
//unlocks the box, runs the function, and then ensures that the box is locked again 
//before returning, regardless of whether the argument function returned normally 
//or threw an exception.

function withBoxUnlocked(body) {
  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true