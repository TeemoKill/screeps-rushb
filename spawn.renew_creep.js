
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
    callCreepToRenew(spawn, creep);

    if (creep.ticksToLive > 1400) {
        removeCreepFromRenewList(spawn, creep);
    }

}

/** @param {StructureSpawn} renewSite @param {Creep} creep */
function callCreepToRenew(renewSite, creep) {
    utils.debug(
        "[spawn.renew_creep:callCreepToRenew] " +
        "renew site: " + renewSite.name +
        ", call renew creep: " + creep.name
    )
    creep.memory.renew = true;
    return undefined
}

/** @param {StructureSpawn} renewSite @param {Creep} creep */
removeCreepFromRenewList = function(renewSite, creep) {
    utils.debug(
        "[spawn.renew_creep:removeCreepFromRenewList] " +
        "renew site: " + renewSite.name +
        ", remove creep: " + creep.name
    )
    creep.memory.renew = 0;
    creep.memory.renewSiteID = null;

    renewSite.memory.renewList.shift();

    return undefined
}
