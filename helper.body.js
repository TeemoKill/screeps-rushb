
module.exports = function (role) {
    var body;
    switch (role) {
        case 'harvester':
            body = makeBody('WWWWWWWCM');
            // body = makeBody('WWWCM');
            break;
        case 'transferer':
            body = makeBody('WCCCCCCCCMMMMMM');
            // body = makeBody('WCCCCCMMM');
            break;
        case 'upgrader':
            body = makeBody('WWWCCCCCMMMM'); 
            // body = makeBody('WWCCCCMMM'); 
            break;
        case 'constructor':
            body = makeBody('WWWWCCCCMMMM');
            // body = makeBody('WWCCCMMM');
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