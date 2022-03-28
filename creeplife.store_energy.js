
/** @param {function(Structure)=>} filter */
Creep.prototype.creeplifeStoreEnergy = function(filter) {
    var destination = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: filter,
    });
    if (!destination) {
        return ERR_NOT_FOUND;
    }

    if (this.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
    }

    return OK;
}
