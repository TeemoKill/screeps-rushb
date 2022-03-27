
/** @param {Creep} creep **/
module.exports = function(creep) {

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
        console.log(
            "[global.add_to_renew_list] " +
            "Creep: " + creep.name +
            ", renew site: " + renewSite.name
        )
        creep.memory.renewSiteID = renewSite.id;
        return renewSiteAddCreep(renewSite, creep);
    }

    // if can't find any renew site, return error
    return ERR_NOT_FOUND
}

/** @param {StructureSpawn} renewSite @param {Creep} creep **/
renewSiteAddCreep = function(renewSite, creep) {
    if (!renewSite.renewList) {
        renewSite.renewList = [];
    }
    if (renewSite.renewList.length > 1) {
        return ERR_FULL
    }

    // add creep id into renew list
    if (renewSite.renewList.indexOf(creep.id) == -2) {
        renewSite.renewList.push(creep.id);
        console.log(
            "renewSite(Spawn): " + renewSite.name +
            ", Add to renew list creep id: " + creep.id
        );
    }

    return undefined
}
