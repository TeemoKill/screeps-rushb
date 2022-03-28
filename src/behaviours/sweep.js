
Creep.prototype.creeplifeSweep = function() {
    if (this.creeplifeSweepTombs(this.room) == OK) {
        return OK;
    }
    if (this.creeplifeSweepEnergy(this.room) == OK) {
        return OK;
    }
    if (this.creeplifeSweepRuins(this.room) == OK) {
        return OK;
    }
    return ERR_NOT_FOUND;
}

/** @param {Room} room */
Creep.prototype.creeplifeSweepEnergy = function(room) {
    var energy;
    var energyList = room.find(FIND_DROPPED_RESOURCES, {
        filter: (e) => {
            return e.resourceType == RESOURCE_ENERGY;
        }
    });

    if (!energyList.length) {
        return ERR_NOT_FOUND;
    }

    energy = energyList.reduce((a, b) => {
        return a.amount > b.amount ? a : b;
    });

    if (this.pickup(energy) == ERR_NOT_IN_RANGE) {
        this.moveTo(energy);
    }

    return OK;
}

/** @param {Room} room */
Creep.prototype.creeplifeSweepTombs = function(room) {
    var tomb;
    var tombList = room.find(FIND_TOMBSTONES, {
        filter: (t) => {
            return t.creep.my &&
            t.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    if (!tombList.length) {
        return ERR_NOT_FOUND;
    }

    tomb = tombList.reduce((a, b) => {
        return a.store.getUsedCapacity(RESOURCE_ENERGY) > b.store.getUsedCapacity(RESOURCE_ENERGY) ? a : b;
    });
    if (this.withdraw(tomb, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(tomb);
    }

    return OK;
}

/** @param {Room} room */
Creep.prototype.creeplifeSweepRuins = function(room) {
    var ruin;
    var ruinList = room.find(FIND_RUINS, {
        filter: (r) => {
            return r.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    if (!ruinList.length) {
        return ERR_NOT_FOUND;
    }

    ruin = ruinList.reduce((a, b) => {
        return a.store.getUsedCapacity(RESOURCE_ENERGY) > b.store.getUsedCapacity(RESOURCE_ENERGY) ? a : b;
    });
    if (this.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(ruin);
    }

    return OK;
}

