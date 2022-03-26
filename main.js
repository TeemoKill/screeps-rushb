
const data = require('helper.data');

const createCreep = require('helper.create_creep');
const creepGoToWork = require('helper.creep_go_to_work');

const structureTower = require('structure.tower');

var sn = 30;

module.exports.loop = function () {
    const DATA = data();
    
    const harvesters = _.filter(Game.creeps, {memory: {role: global.types.harvester}});
    const upgraders = _.filter(Game.creeps, {memory: {role: global.types.upgrader}});
    const constructors = _.filter(Game.creeps, {memory: {role: global.types.constructor}});
    const transferers = _.filter(Game.creeps, {memory: {role: global.types.transferer}});

    const towers = _.filter(Game.structures, {structureType: STRUCTURE_TOWER});
    
    if (Game.time%20 == 0) {
        console.log("creeps: " + Object.values(Game.creeps).length);
        console.log(
            "harvesters: " + harvesters.length + 
            ", transferers: " + transferers.length + 
            ", upgraders: " + upgraders.length + 
            ", constructors: " + constructors.length
        );
    }

    Object.values(Game.rooms).forEach(room => {
        /*
        console.log(
            "Room: " + room.name + 
            ", Energy Available: " + room.energyAvailable +
            ", Energy Capacity Available: " + room.energyCapacityAvailable
        )
        */

        // only try to create creep if room energy is full
        if (room.energyAvailable == room.energyCapacityAvailable) {

            const spawns = DATA.sp[room.name];
            spawns.forEach(spawn => {
                // var spawn = Game.getObjectById(spawnID);
                
            
                // console.log('creepbody: ' + creepBody);
                
                if (harvesters.length < 1) {
                    createCreep(spawn, global.types.harvester);
                }
                else if (constructors.length < 1) {
                    createCreep(spawn, global.types.constructor);
                }
                else if (transferers.length < 1) {
                    createCreep(spawn, global.types.transferer);
                }
                else if (upgraders.length < 1) {
                    createCreep(spawn, global.types.upgrader);
                }
                else if (harvesters.length < 8) {
                    createCreep(spawn, global.types.harvester);
                }
                else if (transferers.length < 4) {
                    createCreep(spawn, global.types.transferer);
                }
                else if (upgraders.length < 2) {
                    createCreep(spawn, global.types.upgrader);
                }
                else if (constructors.length < 6) {
                    createCreep(spawn, global.types.constructor);
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
