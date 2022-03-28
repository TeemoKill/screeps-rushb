
Creep.prototype.requireRenew = function() {
    // if creep remembers a renew site, try to renew at there
    if (this.memory.renewSiteID) {
        var renewSite = Game.getObjectById(this.memory.renewSiteID);
        return renewSite.addCreepToRenewList(this);
    }

    // if creep doesn't remember a renew site, find one
    var renewSite = this.pos.findClosestByPath(FIND_MY_SPAWNS, {
        filter: (s) => {
            if (!s.memory.renewList) {
                return true;
            }
            return s.memory.renewList.length < 2;
        }
    });

    if (renewSite) {
        this.memory.renewSiteID = renewSite.id;
        return renewSite.addCreepToRenewList(this);
    }

    // if can't find any renew site, return error
    return ERR_NOT_FOUND;
}