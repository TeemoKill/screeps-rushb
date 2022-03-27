
require('creeplife.require_renew');

const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleConstructor = require('role.constructor');

const utils = require('utils');

const { isNull, isUndefined } = require('lodash');

const roleHarvester = require('role.harvester');

Creep.prototype.goToWork = function() {
    if (this.ticksToLive < 300) {
        this.say('need renew');
        this.requireRenew();
    }

    if (this.hits < this.hitsMax) {
        this.say('Hurt Hurt');
        this.memory.hurt = 1;
    }
    else {
        this.memory.hurt = 0;
    }

    if (this.memory.renew) {
        renewSite = Game.getObjectById(this.memory.renewSiteID);
        if (renewSite) {
            utils.debug(
                "creep gonna renew: " + this.name +
                ", renew site: " + renewSite.name
            )
            if (renewSite.renewCreep(this) == ERR_NOT_IN_RANGE) {
                utils.debug("not in renew range, creep: " + this.name)
                this.moveTo(renewSite);
            }
            return undefined;
        }
    }
        
    if (this.memory.hurt) {
        var tower = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => {return s.structureType == STRUCTURE_TOWER;}
        });
        if (tower) {
            this.moveTo(tower);
            return undefined;
        }
    }

    // do the corresponding job upon the creep's role
    switch (this.memory.role) {
    case global.types.harvester:
        roleHarvester.run(this);
        break;
    case global.types.transferer:
        roleTransferer.run(this);
        break;
    case global.types.upgrader:
        roleUpgrader.run(this);
        break;
    case global.types.constructor:
        roleConstructor.run(this);
        break;
    default:
        utils.error(
            "[helper.creep_go_to_work] " +
            "creep: " + this.name +
            ", Unknown role: " + this.memory.role
        );
        break;
    }
}
