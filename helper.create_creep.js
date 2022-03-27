
const body = require('helper.body');
const { isNull, isUndefined } = require('lodash');

module.exports = function (spawn, role) {
    // console.log(isUndefined(spawn.Spawning));
    // console.log(spawn.Spawning);

    if (isUndefined(spawn.Spawning)) {
        console.log(spawn.name + ' create_creep, role: ' + global.roleName[role]);
        console.log(spawn + role);
        var creepBody = body(role, spawn.room.energyAvailable);
        console.log(creepBody);
        var sn = Math.ceil(Math.random() * 10000);
        spawn.spawnCreep(creepBody, global.roleName[role] + sn, {
            memory: {role: role,
                recharge: 1}
        });
    }
}