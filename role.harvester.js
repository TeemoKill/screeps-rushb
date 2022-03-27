
require('creeplife.harvest');
require('creeplife.store_energy')

var roleHarvester = {

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
            // if no container, harvester help to build
            var constrSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                filter: (s) => {
                    return s.structureType == STRUCTURE_CONTAINER;
                }
            });
            if (constrSite) {
                // find a constuct site, help build it
                if(creep.build(constrSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constrSite, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return
            } // if no construct site found, harvester go back to store energy
        }

        if (creep.creeplifeStoreEnergy(global.filters.conteinerNotFull) == OK) {
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

module.exports = roleHarvester;
