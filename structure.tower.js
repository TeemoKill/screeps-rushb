

module.exports = {
    work: function(tower) {
        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var hurtCreep = tower.pos.findInRange(FIND_MY_CREEPS, 3, 
            {
                filter: (creep) => {
                    return creep.hits < creep.hitsMax;
                }
            }
        );
        tower.attack(enemy);
        hurtCreep.forEach(creep => {
            tower.heal(creep);
        });
    }
}