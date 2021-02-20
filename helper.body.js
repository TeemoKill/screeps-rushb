
module.exports = function (role) {
    var body;
    switch (role) {
        case 'harvester':
            body = makeBody('WWWWWWCM');
            break;
        case 'transfer':
            body = makeBody('WCCCCCMMM');
            break;
        case 'upgrader':
            body = makeBody('WWWCCCCCMMMM'); 
            break;
        case 'constructor':
            body = makeBody('WWWWCCCCMMMM');
            break;
        default:
            console.log('helper.body: role not exist!');
            body = null;
    }
    return body;
}

makeBody = function (bodyStr) {
    var body = [];
    var bodyParts = {
        W:WORK,
        M:MOVE,
        C:CARRY,
        A:ATTACK,
        R:RANGED_ATTACK,
        H:HEAL,
        T:TOUGH
    };

    for (var i in bodyStr) {
        if (bodyStr[i] != ' ') {
            body.push(bodyParts[bodyStr[i]]);
        }
        if (body.length == 50) {
            break;
        }
    }

    return body;
    
}