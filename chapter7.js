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

//PREDATORS

//Any serious ecosystem has a food chain longer than a single link. Write another critter 
//that survives by eating the herbivore critter. You’ll notice that stability is even harder 
// achieve now that there are cycles at multiple levels. Try to find a strategy to make the 
//ecosystem run smoothly for at least a little while.

//One thing that will help is to make the world bigger. This way, local population booms 
//or busts are less likely to wipe out a species entirely, and there is space for the 
//relatively large prey population needed to sustain a small predator population.

function Tiger() {
	this.energy = 60;
}

Tiger.prototype.act = function(context) {
  var space = context.find(' '), lotsOfSpace = context.findAll(' ');
  if (lotsOfSpace.length >= 2)
    return {type: 'move', direction: randomElement(lotsOfSpace)};
  if (this.energy > 80 && space)
    return {type: 'reproduce', direction: space};
  var victim = context.find('O');
  if (victim && this.energy < 100)
    return {type: 'eat', direction: victim};
};