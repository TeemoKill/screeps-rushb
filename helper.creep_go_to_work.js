const roleHarvester = require('role.harvester');
const roleTransfer = require('role.transfer');
const roleUpgrader = require('role.upgrader');
const roleConstructor = require('role.constructor');

module.exports = function (creep) {
    if (creep.ticksToLive < 300) {
        creep.say('Help Help Help');
        creep.memory.renew = true;
    }
    else if (creep.ticksToLive >= 1400) {
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
        creep.moveTo(spawn);
        if (!spawn.spawning) {
            spawn.renewCreep(creep);
        }
    }
    else if (creep.memory.hurt) {
        var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
            {
                filter: (s) => {
                    return s.structureType == STRUCTURE_TOWER;
                }
            }
        );
        creep.moveTo(tower);
    }
    else {
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'transfer') {
            roleTransfer.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'constructor') {
            roleConstructor.run(creep);
        }
    }
}