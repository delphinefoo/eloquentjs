/*A VECTOR TYPE

Write a constructor Vector that represents a vector in two-dimensional space.
It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vector prototype two methods, plus and minus, that take another vector as a parameter 
and return a new vector that has the sum or difference of the two vectors’ (the one in this and 
the parameter) x and y values.

Add a getter property length to the prototype that computes the length of the vector—that is, 
the distance of the point (x, y) from the origin (0, 0).*/

function Vector(x,y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(vector2) {
    return new Vector(this.x + vector2.x, this.y + vector2.y);
}

Vector.prototype.minus = function(vector2) {
    return new Vector((this.x - vector2.x), (this.y - vector2.y));
}

Object.defineProperty(Vector.prototype, "length", {
  get: function() { 
  	return Math.sqrt(this.x * this.x + this.y * this.y); 
  }
});

/* ANOTHER CELL

Implement a cell type named StretchCell(inner, width, height) that conforms to the table cell 
interface described earlier in the chapter. It should wrap another cell (like UnderlinedCell does) 
and ensure that the resulting cell has at least the given width and height, even if the inner cell 
would naturally be smaller.*/

function StretchCell(inner, width, height) {
  UnderlinedCell.call(this, inner);
  this.width = width;
  this.height = height;
}

StretchCell.prototype = Object.create(UnderlinedCell.prototype);

StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
};
