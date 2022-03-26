const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleConstructor = require('role.constructor');
const { isNull, isUndefined } = require('lodash');

/** @param {Creep} creep **/
module.exports = function (creep) {
    if (creep.ticksToLive < 300) {
        // creep.say('Help Help Help');
        creep.say('need renew');
        creep.memory.renew = 1;
    }
    else if (creep.ticksToLive > 1400) {
        creep.memory.renew = 0;
    }

    if (creep.hits < creep.hitsMax) {
        creep.say('Hurt Hurt');
        creep.memory.hurt = 1;
    }
    else {
        creep.memory.hurt = 0;
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

    // do the corresponding job upon the creep's role
    switch (creep.memory.role) {
        case global.types.harvester:
            roleHarvester.run(creep);
            break;
        case global.types.transferer:
            roleTransferer.run(creep);
            break;
        case global.types.upgrader:
            roleUpgrader.run(creep);
            break;
        case global.types.constructor:
            roleConstructor.run(creep);
            break;
        default:
            console.log(
                "Unknown role: " + creep.memory.role +
                ", creep: " + creep.name
            );
            break;
    }

}
