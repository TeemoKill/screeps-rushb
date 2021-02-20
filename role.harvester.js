var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            // creep.say("🔄 recharge");
        } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
            creep.memory.recharge = false;
            // creep.say("⚡ store");
        }
        
	    if (creep.memory.recharge) {
	        var target = creep.pos.findClosestByPath(FIND_SOURCES, {
	            filter: (source) => {
	                return source.energy > 0;
	            }
	        });
            if (target) {
                if (target.energy > 0) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    creep.say("🔄 mine");
                    return;
                }
                else {
                    // continue to store holding resource
                }
            }
        }
        var destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (!destination) {
            destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        if (destination) {
            if (creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.say("⚡ store");
            return;
        }
        else {
            for (const spawnName in Game.spawns) {
                creep.moveTo(Game.spawns[spawnName], {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
    }
};

module.exports = roleHarvester;