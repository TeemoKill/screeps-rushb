
Creep.prototype.creeplifeHarvest = function() {
    // find closest energy source
    var energySource = this.pos.findClosestByPath(FIND_SOURCES, {
        filter: (s) => {
            // filter non-empty sources
            return s.energy > 0;
        }
    });
    
    // if can find any energy source, move to harvest
    if (energySource) {
        if (this.harvest(energySource) == ERR_NOT_IN_RANGE) {
            this.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        this.say("🔄 mine");
        return;
    }
}
