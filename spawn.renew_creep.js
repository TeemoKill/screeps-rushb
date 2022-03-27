
/** @param {StructureSpawn} spawn **/
module.exports = function(spawn) {
    /*
    console.log(
        "[spawn.renew_creep]" +
        " spawn: " + spawn.name
    );
    */

    if (!spawn.memory.renewList || spawn.memory.renewList.length == 0) {
        return undefined
    }

    var creep = Game.getObjectById(spawn.memory.renewList[0]);
    if (!creep) {
        spawn.memory.renewList.shift();
        return ERR_INVALID_TARGET
    }

    callCreepToRenew(creep);

    if (creep.ticksToLive > 1400) {
        removeCreepFromRenewList(spawn, creep);
    }

}

/** @param {StructureSpawn} renewSite @param {Creep} creep */
callCreepToRenew = function(renewSite, creep) {
    creep.memory.renew = 1;
    return undefined
}

/** @param {StructureSpawn} spawn @param {Creep} creep */
removeCreepFromRenewList = function(renewSite, creep) {
    creep.memory.renew = 0;
    creep.memory.renewSiteID = null;

    spawn.memory.renewList.shift();

    return undefined
}
