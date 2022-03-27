
require('creeplife.transfer')

const findMaxContainer = require('helper.find_max_container');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            creep.say("🔄 recharge");
        } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
            creep.memory.recharge = false;
            creep.say("⚡ store");
        }
        
	    if (creep.memory.recharge) {
	        var target = findMaxContainer(creep.room);
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, 
                    {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER;
                        }
                    }
                );
            }
            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            creep.creeplifeTransfer();
        }
	}
};

module.exports = roleTransferer;