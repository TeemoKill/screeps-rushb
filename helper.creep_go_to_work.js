
require('creeplife.require_renew');

const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleConstructor = require('role.constructor');

const utils = require('utils');

const { isNull, isUndefined } = require('lodash');

/** @param {Creep} creep **/
module.exports = function (creep) {
    if (creep.ticksToLive < 300) {
        // creep.say('Help Help Help');
        creep.say('need renew');
        // globalAddToRenewList(creep);
        creep.requireRenew();
    }

    if (creep.hits < creep.hitsMax) {
        creep.say('Hurt Hurt');
        creep.memory.hurt = 1;
    }
    else {
        creep.memory.hurt = 0;
    }

    if (creep.memory.renew) {
        renewSite = Game.getObjectById(creep.memory.renewSiteID);
        if (renewSite) {
            utils.debug(
                "creep gonna renew: " + creep.name +
                ", renew site: " + renewSite.name
            )
            if (renewSite.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                utils.debug(
                    "not in renew range, creep: " + creep.name
                )
                creep.moveTo(renewSite);
            }
            return undefined;
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
            utils.error(
                "[helper.creep_go_to_work] " +
                "creep: " + creep.name +
                ", Unknown role: " + creep.memory.role
            );
            break;
    }

}
