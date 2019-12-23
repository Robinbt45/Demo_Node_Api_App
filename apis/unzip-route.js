'use strict';
var zipHandler = require('./unzip-handler.js'),
    koaBody = require('koa-body');

// Register routes
module.exports.register = function register(route) {
    route.get('/unzip', koaBody({jsonLimit: 100 * 1024 * 1024}), unzipFiles);
};

function * unzipFiles(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield zipHandler.unzipFiles(this);
}
