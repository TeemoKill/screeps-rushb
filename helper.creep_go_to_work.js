const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleConstructor = require('role.constructor');
const { isNull, isUndefined } = require('lodash');

module.exports = function (creep) {
    if (creep.ticksToLive < 300) {
        // creep.say('Help Help Help');
        creep.say('need renew');
        creep.memory.renew = true;
    }
    else if (creep.ticksToLive > 1400) {
        creep.memory.renew = false;
    }

    if (creep.hits < creep.hitsMax) {
        creep.say('Hurt Hurt');
        creep.memory.hurt = true;
    }
    else {
        creep.memory.hurt = false;
    }

    if (creep.memory.renew) {
        var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        // console.log("Creep: " + creep.memory["Name"] + "Spawn: " + spawn);
        if (isUndefined(spawn) || isNull(spawn)) {
            // can not find path to spawn, 
            // may indicates the creep is stuck by others
            // then just stay and wait
            return;
        }
        // console.log("Spawn resource: " + spawn.store[RESOURCE_ENERGY]);
        if (spawn.store[RESOURCE_ENERGY] > 30) {
            creep.moveTo(spawn);
            // if (isNull(spawn.Spawning)) {
            //     spawn.renewCreep(creep);
            //     return
            // }
            spawn.renewCreep(creep);
            return;
        }
        else {
            creep.say('spawn no energy');
        }
    }
        
    if (creep.memory.hurt) {
        var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
            {
                filter: (s) => {
                    return s.structureType == STRUCTURE_TOWER;
                }
            }
        );
        creep.moveTo(tower);
        return
    }

    // do the corresponding job
    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }
    else if (creep.memory.role == 'transferer') {
        roleTransferer.run(creep);
    }
    else if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }
    else if (creep.memory.role == 'constructor') {
        roleConstructor.run(creep);
    }
}
