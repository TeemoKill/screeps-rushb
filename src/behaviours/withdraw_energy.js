
/** @param {function(Structure)=>} filter */
Creep.prototype.creeplifeWithdrawEnergy = function(filter, pickMax = false) {
    var target;
    if (pickMax) {
        var targetList = this.room.find(FIND_STRUCTURES, {
            filter: filter,
        });
        if (targetList.length) {
            target = targetList.reduce((a, b) => {
                return a.store.getUsedCapacity(RESOURCE_ENERGY) > b.store.getUsedCapacity(RESOURCE_ENERGY) ? a : b;
            });
        }
    } else {
        target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: filter,
        });
    }

    if (!target) {
        return ERR_NOT_FOUND;
    }

    if (this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }

    return OK;
}
