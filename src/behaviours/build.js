
Creep.prototype.creeplifeBuild = function(filter) {
    var constrSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: filter,
    });
    if (constrSite) {
        if (this.build(constrSite) == ERR_NOT_IN_RANGE) {
            this.moveTo(constrSite);
        }
        return OK;
    }

    return ERR_NOT_FOUND;
}
