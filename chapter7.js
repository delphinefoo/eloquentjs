//ARTIFICIAL STUPIDITY

//Having the inhabitants of our world go extinct after a few minutes is kind of depressing. 
//To deal with this, we could try to create a smarter plant eater.

//There are several obvious problems with our herbivores. First, they are terribly greedy, 
//stuffing themselves with every plant they see until they have wiped out the local plant 
//life. Second, their randomized movement (recall that the view.find method returns a random 
//direction when multiple directions match) causes them to stumble around ineffectively and 
//starve if there don’t happen to be any plants nearby. And finally, they breed very fast, 
//which makes the cycles between abundance and famine quite intense.

//Write a new critter type that tries to address one or more of these points and substitute 
//t for the old PlantEater type in the valley world. See how it fares. Tweak it some more 
//if necessary.

function SmartPlantEater() {
  this.energy = 20;
}

SmartPlantEater.prototype.act = function(context) {
  var space = context.find(' ');
  if (this.energy > 80 && space)
    return {type: 'reproduce', direction: space};
  var plants = context.findAll('*');
  if (plants.length >= 2)
  	return {type: 'eat', direction: randomElement(plants)}
  if (space) 
    return {type: 'move', direction: space};
};