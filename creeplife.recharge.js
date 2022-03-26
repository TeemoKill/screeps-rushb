
module.exports = function(creep) {
    // find closest container to charge energy
    var rechargePort = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => {
            return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0;
        }
    }); 
    
    // if can find any container with energy, move to charge
    if (rechargePort) {
        if (creep.withdraw(rechargePort, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(rechargePort, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return undefined;
    } 

    // if no result, maybe can find empty containers, move close and wait
    rechargePort = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => {
            // just filter containers, doesn't matter if it has energy
            return s.structureType == STRUCTURE_CONTAINER;
        }
    });

    // if can find any container, move to wait
    if (rechargePort) {
        if (creep.withdraw(rechargePort, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(rechargePort, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return ERR_NOT_ENOUGH_ENERGY;
    }

    // just a note, if still no result, the creep might be stuck somewhere uncivilized. sad.
    return ERR_NOT_IN_RANGE;
}
