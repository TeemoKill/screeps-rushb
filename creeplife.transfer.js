
require('creeplife.store_energy');

Creep.prototype.creeplifeTransfer = function() {
    if (this.creeplifeStoreEnergy(global.filters.extentionOrSpawnNotFull) == OK) {
        return OK;
    }
    if (this.creeplifeStoreEnergy(global.filters.towerNotFull) == OK) {
        return OK;
    }
    if (this.creeplifeStoreEnergy(global.filters.storageNotFull) == OK) {
        return OK;
    }
    // fall back
    if (this.creeplifeStoreEnergy(global.filters.extentionOrSpawn) == OK) {
        return OK;
    }

    return ERR_NOT_FOUND;
}
