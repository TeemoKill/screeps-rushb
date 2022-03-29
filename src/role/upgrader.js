
import { creeplifeRecharge } from '../behaviours/recharge'

export const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            creep.say("🔄 recharge");
        } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
            creep.memory.recharge = false;
            creep.say("⚡ upgrade");
        }

	    if (creep.memory.recharge) {
            switch (creeplifeRecharge(creep)) {
                case undefined:
                    // no error, just return
                    return undefined;
                case ERR_NOT_IN_RANGE:
                    return ERR_NOT_ENOUGH_ENERGY;
                default:
                    return ERR_NOT_ENOUGH_ENERGY;
            }
	    } else {
            if (creep.room.controller.level < 5) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if (creep.room.controller.ticksToDowngrade < 5000) {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};
