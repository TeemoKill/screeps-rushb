
StructureTower.prototype.work = function() {
    var enemy = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var hurtCreep = this.pos.findInRange(FIND_MY_CREEPS, 3, {
        filter: (creep) => {return creep.hits < creep.hitsMax;}
    });
    this.attack(enemy);
    hurtCreep.forEach(creep => {
        this.heal(creep);
    });
}
