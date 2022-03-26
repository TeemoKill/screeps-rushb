
module.exports = function(creep) {
    // find closest energy source
    var energySource = creep.pos.findClosestByPath(FIND_SOURCES, {
        filter: (s) => {
            // filter non-empty sources
            return s.energy > 0;
        }
    });
    
    // if can find any energy source, move to harvest
    if (energySource) {
        if (creep.harvest(energySource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        creep.say("🔄 mine");
        return;
    }
}
