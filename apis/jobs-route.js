'use strict';
var jobsHandler = require('./jobs-handler.js'),
    koaBody = require('koa-body');

// Register routes
module.exports.register = function register(route) {
    route.get('/jobs', koaBody({jsonLimit: 100 * 1024 * 1024}), getJobs);
    route.get('/jobs/westgate', koaBody({jsonLimit: 100 * 1024 * 1024}), getJobs_Westgate);
    route.get('/jobs/:docid', koaBody({jsonLimit: 100 * 1024 * 1024}), getJob);
    route.get('/jobs/search', koaBody({jsonLimit: 100 * 1024 * 1024}), getJobs_Search);
};

function * getJobs(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield jobsHandler.getJobs(this);
}

function * getJobs_Search(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield jobsHandler.getJobs_Search(this);
}

function * getJobs_Westgate(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield jobsHandler.getJobs_Westgate(this);
}

function * getJob(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    var docId = this.params.docid;
    yield jobsHandler.getJob(docId, this);
}
