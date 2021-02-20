
const data = require('helper.data');

const createCreep = require('helper.create_creep');
const creepGoToWork = require('helper.creep_go_to_work');

const structureTower = require('structure.tower');

var sn = 30;

module.exports.loop = function () {
    const DATA = data();
    
    const harvesters = _.filter(Game.creeps, {memory: {role: "harvester"}});
    const upgraders = _.filter(Game.creeps, {memory: {role: "upgrader"}});
    const constructors = _.filter(Game.creeps, {memory: {role: "constructor"}});
    const transfers = _.filter(Game.creeps, {memory: {role: "transfer"}});

    const towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER});
    
    if (Game.time%10 == 5) {
        console.log("h: " + harvesters.length + 
            ", t: " + transfers.length + 
            ", u: " + upgraders.length + 
            ", c: " + constructors.length
        );
    }

    Object.values(Game.rooms).forEach(room => {
        if (room.energyAvailable == room.energyCapacityAvailable) {

            const spawns = DATA.sp[room.name];
            spawns.forEach(spawn => {
                // var spawn = Game.getObjectById(spawnID);
                
            
                // console.log('creepbody: ' + creepBody);
                
                if (harvesters.length < 1) {
                    createCreep(spawn, 'harvester');
                }
                else if (constructors.length < 1) {
                    createCreep(spawn, 'constructor');
                }
                else if (transfers.length < 1) {
                    createCreep(spawn, 'transfer');
                }
                else if (upgraders.length < 1) {
                    createCreep(spawn, 'upgrader');
                }
                else if (harvesters.length < 8) {
                    createCreep(spawn, 'harvester');
                }
                else if (transfers.length < 4) {
                    createCreep(spawn, 'transfer');
                }
                else if (upgraders.length < 2) {
                    createCreep(spawn, 'upgrader');
                }
                else if (constructors.length < 6) {
                    createCreep(spawn, 'constructor');
                }
            }); 
        }
    });

    Object.values(Game.creeps).forEach(creep => {
        creepGoToWork(creep);
    });

    towers.forEach(tower => {
        structureTower.work(tower);
    });
}
