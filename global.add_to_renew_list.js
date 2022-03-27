
const utils = require('utils');

/** @param {Creep} creep **/
module.exports = function(creep) {
    /*
    console.log(
        "[global.add_to_renew_list]" +
        " entering. creep: " + creep.name
    )
    */

    if (creep.memory.renewSiteID) {
        // if creep remembers a renew site, try to renew at there
        var renewSite = Game.getObjectById(creep.memory.renewSiteID);
        return renewSiteAddCreep(renewSite, creep);
    }

    // if creep doesn't remember a renew site, find one
    renewSite = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
        filter: (s) => {
            if (!s.memory.renewList) {
                return true
            }
            return s.memory.renewList.length < 2;
        }
    });

    if (renewSite) {
        /*
        console.log(
            "[global.add_to_renew_list] " +
            "Creep: " + creep.name +
            ", renew site: " + renewSite.name
        )
        */
        creep.memory.renewSiteID = renewSite.id;
        return renewSiteAddCreep(renewSite, creep);
    }

    // if can't find any renew site, return error
    return ERR_NOT_FOUND
}

/** @param {StructureSpawn} renewSite @param {Creep} creep **/
renewSiteAddCreep = function(renewSite, creep) {
    utils.debug(
        "[global.add_to_renew_list:renewSiteAddCreep] " +
        "renew site: " + renewSite.name +
        ", creep: " + creep.name
    )

    if (!renewSite.memory.renewList) {
        utils.debug(
            "[global.add_to_renew_list:renewSiteAddCreep] " +
            "renew site: " + renewSite.name +
            "renew list is null"
        )
        renewSite.memory.renewList = [];
    }
    if (renewSite.memory.renewList.length > 1) {
        utils.debug(
            "[global.add_to_renew_list:renewSiteAddCreep] " +
            "renew site: " + renewSite.name +
            "renew list is full. " +
            "renew list: " + renewSite.memory.renewList
        )
        return ERR_FULL
    }

    // add creep id into renew list
    if (renewSite.memory.renewList.indexOf(creep.id) == -1) {
        renewSite.memory.renewList.push(creep.id);
        utils.info(
            "[global.add_to_renew_list:renewSiteAddCreep] " +
            "renewSite: " + renewSite.name +
            ", Added to renew list creep id: " + creep.id +
            ", creep: " + creep.name
        );
    }

    return undefined
}
