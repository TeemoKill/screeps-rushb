
import '../behaviours/build'
import '../behaviours/harvest'
import '../behaviours/store_energy'

import { f } from '../global/filters'

export const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.recharge && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.recharge = true;
            // creep.say("🔄 recharge");
        } else if (creep.memory.recharge && creep.store.getFreeCapacity() == 0) {
            creep.memory.recharge = false;
            // creep.say("⚡ store");
        }
        
	    if (creep.memory.recharge) {
            return creep.creeplifeHarvest();
        }

        // cold start stage, if can not find any built container, harvesters lend a hand on building
        var rechargePort = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType == STRUCTURE_CONTAINER;
            }
        }); 
        if (!rechargePort) {
            if (creep.creeplifeBuild(f.container) == OK) {
                return undefined;
            }
        }

        if (creep.creeplifeStoreEnergy(global.filters.containerNotFull) == OK) {
            return undefined;
        } 

        if (creep.creeplifeStoreEnergy(global.filters.extentionOrSpawnNotFull) == OK) {
            return undefined;
        }
        
        for (const spawnName in Game.spawns) {
            creep.moveTo(Game.spawns[spawnName], {visualizePathStyle: {stroke: '#00ff00'}});
        }
    }
};
