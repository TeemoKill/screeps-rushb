
import '../behaviours/build'
import '../behaviours/harvest'

import { findMinStructure } from '../helper/find_min_structure'
import { creeplifeRecharge } from '../behaviours/recharge'

import { f } from '../global/filters'

export const roleConstructor = {

    /** @param {Creep} creep **/
    run: function(creep) {
		// creep checks whether need recharging
	    if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            creep.say('🔄 recharge');
	    } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
	        creep.memory.recharge = false;
	        creep.say('🚧 build');
	    }

	    if (creep.memory.recharge) {
			switch (creeplifeRecharge(creep)) {
				// no error, just return
				case undefined:
					return undefined;
				// creep can not reach any container to recharge
				case ERR_NOT_IN_RANGE:
					// quite urgenet, let the constructor creep go to harvest by itself first
					return creep.creeplifeHarvest();
				default:
					return ERR_NOT_ENOUGH_ENERGY;
			}
	    } else {
			if (creep.creeplifeBuild(f.container) == OK) {
				return undefined;
			}
			if (creep.creeplifeBuild(f.extention) == OK) {
				return undefined;
			}
			if (creep.creeplifeBuild(f.all) == OK) {
				return undefined;
			}

			var destination = findMinStructure(creep.room);
            if (destination) {
				if(creep.repair(destination) == ERR_NOT_IN_RANGE) {
					creep.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
				}
				// repair other structures by the way
				var needRepair = creep.pos.findInRange(FIND_STRUCTURES, 2, 
					{
						filter: (structure) => {
							return structure.hits < structure.hitsMax - 300;
						}
					}
				);
				needRepair.forEach(structure => {
					creep.repair(structure);
				});
			} else {
				creep.moveTo(Game.flags['ConstructorStation1'], {visualizePathStyle: {stroke: '#00ffaa'}});
			}
	    }
	}
};
