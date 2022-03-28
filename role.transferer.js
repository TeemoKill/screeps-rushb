
require('creeplife.transfer')
require('creeplife.sweep')
require('creeplife.withdraw_energy')

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
            if (creep.creeplifeSweep() == OK) {
                return undefined;
            }
            if (creep.creeplifeWithdrawEnergy(global.filters.containerNotEmpty, true) == OK) {
                return undefined;
            }
        } else {
            if (creep.creeplifeTransfer() == OK) {
                return undefined;
            }
        }
	}
};

module.exports = roleTransferer;
