// todo: army data
var find_min_structure = require('helper.find_min_structure');
module.exports = function () {

    var myRooms   = [];
    var nearRooms = [];
    var myCreeps = {};
    var myStructures = [];
    var myConstructSites = [];
    var wallsNeedBuild = [];
    var mode = null;
    var myEnergy = [];
    var army = [];
    var droppedEnergy = [];
    var mySpawns = [];

    var cnt = 0;
    Object.values(Game.creeps).forEach(creep => {
        if (creep.memory.role != undefined) {
            if (myCreeps[creep.memory.role] == undefined) {
                myCreeps[creep.memory.role] = [creep];
            } else {
                myCreeps[creep.memory.role] += creep;
            }
        }
        cnt ++;
    });

    for (var i in Game.structures) {
        var structure = Game.structures[i];
        if (myStructures[structure.structureType] != undefined) {
            myStructures[structure.structureType].push(structure.id);
        } else {
            myStructures[structure.structureType] = [structure.id];
        }


    }
    for (var i in Game.spawns) {
        //console.log(Game.spawns[i].structureType);
        if (mySpawns[Game.spawns[i].room.name] != undefined) {
            // console.log(1)
            mySpawns[Game.spawns[i].room.name].push(Game.spawns[i]);
        } else {
            // console.log(2)
            mySpawns[Game.spawns[i].room.name] = [Game.spawns[i]];
        }
    }

    for (var i in Game.rooms) {
        if (Game.rooms[i].controller != undefined && Game.rooms[i].controller.my) {
            myRooms.push(Game.rooms[i]);
            wallsNeedBuild[i] = find_min_structure(Game.rooms[i]);
            if (Game.rooms[i].storage!== undefined) {
                myEnergy[i] = Game.rooms[i].storage.store.energy;
                if (myEnergy[i] < 100000 && i!='E26N12' && i!='E28N17') {
                    Game.notify(i + ' energy ' + (myEnergy[i]/1000) + 'k', 100);
                }
            }
        } else {
            //console.log(i);
            nearRooms.push(Game.rooms[i]);
        }
        if (Game.rooms[i] != undefined) {
            myConstructSites[i] = Game.rooms[i].find(FIND_CONSTRUCTION_SITES);
            mode = Game.rooms[i].mode;
        }
        army[i] = Game.rooms[i].find(FIND_HOSTILE_CREEPS, {
            filter:function(o) {
                var has_attack = false;
                for(var i in o.body) {
                    //console.log(o.body[i].type);
                    if (o.body[i].type == ATTACK || o.body[i].type == RANGED_ATTACK) {
                        has_attack = true;
                        break;
                    }
                }
                return o.owner.username != 'Source Keeper' && o.owner.username != 'bobhero' && has_attack;
                //
            }
        })
        //console.log(i,army[i])
        if (army[i].length>0) {
            Game.notify(i + ' found ' + army[i].length + ' ' + army[i][0].owner.username + ' creeps!');
        }
        droppedEnergy[i] = Game.rooms[i].find(FIND_DROPPED_RESOURCES, {
            filter:function(o) {
                return o.energy > 400;
            }
        })

    }

    if (Game.time % 10 == 0)  {
        console.log('creeps:' + cnt);
    }

    return {
        r:myRooms,
        m:mode,
        n:nearRooms,
        c:myCreeps,
        s:myStructures,
        b:myConstructSites,
        w:wallsNeedBuild,
        a:army,
        d:droppedEnergy,
        e:myEnergy,
        sp:mySpawns
    }
}



