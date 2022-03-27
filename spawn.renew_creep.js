
const utils = require('utils');

/** @param {StructureSpawn} spawn **/
module.exports = function(spawn) {
    utils.debug(
        "[spawn.renew_creep]" +
        " spawn: " + spawn.name
    );

    if (!spawn.memory.renewList || spawn.memory.renewList.length == 0) {
        return undefined
    }

    var creep = Game.getObjectById(spawn.memory.renewList[0]);
    if (!creep) {
        spawn.memory.renewList.shift();
        return ERR_INVALID_TARGET
    }

    utils.debug(
        "[spawn.renew_creep]" +
        " spawn: " + spawn.name +
        ", creep: " + creep.name
    )
    spawn.callCreepToRenew(creep);

    if (creep.ticksToLive > 1400) {
        spawn.removeCreepFromRenewList(creep);
    }

}

StructureSpawn.prototype.processRenewList = function() {
    utils.debug(
        "[spawn.processRenewList] " +
        "spawn: " + this.name
    )

    if (!this.memory.renewList || this.memory.renewList.length == 0) {
        return undefined;
    }

    var creep = Game.getObjectById(this.memory.renewList[0]);
    if (!creep) {
        this.memory.renewList.shift();
        return ERR_INVALID_TARGET;
    }

    utils.debug(
        "[spawn.processRenewList] " +
        "spawn: " + this.name +
        ", creep: " + creep.name
    )
    this.callCreepToRenew(creep);

    if (creep.ticksToLive > 1400) {
        this.removeCreepFromRenewList(creep);
    }

    return undefined;
}

/**
 * @param {Creep} creep
 */
StructureSpawn.prototype.addCreepToRenewList = function(creep) {
    utils.debug(
        "[spawn.addCreepToRenewList] " +
        "spawn: " + this.name +
        ", add creep: " + creep.name
    )

    if (!this.memory.renewList) {
        this.memory.renewList = [];
    }
    if (this.memory.renewList.length > 1) {
        return ERR_FULL;
    }

    // add creep id to renew list
    if (this.memory.renewList.indexOf(creep.id) == -1) {
        this.memory.renewList.push(creep.id);
        utils.info(
            "[spawn.addCreepToRenewList] " +
            "spawn: " + this.name +
            ", added creep id: " + creep.id +
            ", creep: " + creep.name
        )
    }

    return undefined;
}

/**
 * @param {Creep} creep
 */
StructureSpawn.prototype.callCreepToRenew = function(creep) {
    utils.debug(
        "[spawn.callCreepToRenew] " +
        "spawn: " + this.name +
        ", call renew creep: " + creep.name
    )
    creep.memory.renewSiteID = this.id;
    creep.memory.renew = true;
    return undefined;
}

/**
 * @param {Creep} creep
 */
StructureSpawn.prototype.removeCreepFromRenewList = function(creep) {
    utils.debug(
        "[spawn.removeCreepFromRenewList] " +
        "spawn: " + this.name +
        ", remove creep: " + creep.name
    )
    creep.memory.renew = 0;
    creep.memory.renewSiteID = null;

    this.memory.renewList.shift();

    return undefined;
}
