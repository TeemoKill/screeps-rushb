
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
    const transferers = _.filter(Game.creeps, {memory: {role: "transferer"}});

    const towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER});
    
    if (Game.time%20 == 0) {
        console.log("creeps: " + Object.values(Game.creeps).length);
        console.log("harvesters: " + harvesters.length + 
            ", transferers: " + transferers.length + 
            ", upgraders: " + upgraders.length + 
            ", constructors: " + constructors.length
        );
    }

    Object.values(Game.rooms).forEach(room => {
        // if (room.energyAvailable == room.energyCapacityAvailable) {
        // console.log("Energy Available: " + room.energyAvailable)
        var lowestCreepEnergy = 750;
        if (room.energyAvailable > lowestCreepEnergy) {

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
                else if (transferers.length < 1) {
                    createCreep(spawn, 'transferer');
                }
                else if (upgraders.length < 1) {
                    createCreep(spawn, 'upgrader');
                }
                else if (harvesters.length < 8) {
                    createCreep(spawn, 'harvester');
                }
                else if (transferers.length < 4) {
                    createCreep(spawn, 'transferer');
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
