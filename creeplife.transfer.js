
Creep.prototype.creeplifeTransfer = function() {
    if (this.creeplifeStoreEnergy(global.filters.extentionOrSpawnNotFull) == OK) {
        return undefined;
    }
    if (this.creeplifeStoreEnergy(global.filters.towerNotFull) == OK) {
        return undefined;
    }

    var destination = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: global.filters.extentionOrSpawn,
    });
    if (destination) {
        if (this.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(destination);
        }
    }
}
