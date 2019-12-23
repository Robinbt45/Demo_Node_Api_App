'use strict';
var contacts = require('./apis/contacts-route'),
    bugs = require('./apis/bugs-route'),
    jobs = require('./apis/jobs-route'),
    unzip = require('./apis/unzip-route'),
    compress = require('koa-compress'),
    logger = require('koa-logger'),
    serve = require('koa-static'),
    router = require('koa-router')(),
    koa = require('koa'),
    path = require('path'),
    app = module.exports = koa(),
    co = require('co'),
    cors = require('koa-cors'),
    ready = require('readyness'),
    inited = ready.waitFor('init'),
    _ = require('lodash');

var server;

co(function () {
    try {
        // Logger
        app.use(logger());

        app.use(function *(next) {
            yield next;
        });

        app.use(cors({
            'origin': true,
            'credentials': true,
            'headers': ['Authorization', 'Content-Type', 'JNDevAuth'
            ]
        }));

        // Rename 'param[]' query string parameters to 'param'
        app.use(function *(next) {
            var that = this;
            _.forEach(this.query, function (item, key) {
                if (key.indexOf('[]', key.length - '[]'.length) !== -1) {
                    var newKey = key.substr(0, key.length - '[]'.length);
                    that.query[newKey] = item;
                }
            });
            yield next;
        });

        // Compress
        app.use(compress());

        app.use(router.routes());

        contacts.register(router);
        bugs.register(router);
        jobs.register(router);
        unzip.register(router);
        // Serve static files
        app.use(serve(path.join(__dirname, 'public')));

        if (!module.parent) {
            server = app.listen(3100);
            server.setTimeout(120 * 1000);
            console.log('Listening on port 3100');
        }

        console.log('Inited app');
        inited();
    } catch (err) {
        console.log('ERR', err);
    }
}, function (err) {
    console.log('ERR', err);
    this.app.emit('error', err, this);
});