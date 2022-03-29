
import './withdraw_energy'

export const creeplifeRecharge = function(creep) {
    // find closest container to charge energy
    if (creep.creeplifeWithdrawEnergy(global.filters.containerNotEmpty) == OK) {
        return OK;
    }
    if (creep.creeplifeWithdrawEnergy(global.filters.storageNotEmpty) == OK) {
        return OK;
    }

    // fall back
    if (creep.creeplifeWithdrawEnergy(global.filters.container) == OK) {
        return ERR_NOT_ENOUGH_ENERGY;
    }

    return ERR_NOT_FOUND;
}
