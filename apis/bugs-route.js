'use strict';
var bugsHandler = require('./bugs-handler'),
    koaBody = require('koa-body');

// Register routes
module.exports.register = function register(route) {
    route.post('/bug1', koaBody({jsonLimit: 100 * 1024 * 1024}), postBug1);
    route.post('/bug2', koaBody({jsonLimit: 100 * 1024 * 1024}), postBug2);
    route.post('/bug3', koaBody({jsonLimit: 100 * 1024 * 1024}), postBug3);
};

function * postBug1(next) {
    /* jshint validthis: true */
    if ('POST' !== this.method) {
        return yield next;
    }
    /**
     * Comment - Had to change from postBug to postBug1
     */
    yield bugsHandler.postBug1(this);
}

function * postBug2(next) {
    /* jshint validthis: true */
    if ('POST' !== this.method) {
        return yield next;
    }

    yield bugsHandler.postBug2(this);
}

function * postBug3(next) {
    /* jshint validthis: true */
    if ('POST' !== this.method) {
        return yield next;
    }

    yield bugsHandler.postBug3(this);
}