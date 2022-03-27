
var utils = {
    debug: function(...data) {
        if (global.debug) {
            console.log(...data);
        }
    },

    info: function(...data) {
        console.log(...data);
    },

    error: function(...data) {
        console.log(...data);
    },
}

module.exports = utils;
