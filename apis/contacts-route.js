'use strict';
var contactsHandler = require('./contacts-handler.js'),
    koaBody = require('koa-body');

// Register routes
module.exports.register = function register(route) {
    route.get('/contacts', koaBody({jsonLimit: 100 * 1024 * 1024}), getContacts);
    route.get('/contacts/allisterdaniels', koaBody({jsonLimit: 100 * 1024 * 1024}), getContacts_AllisterDaniels);
    route.get('/contacts/:docid', koaBody({jsonLimit: 100 * 1024 * 1024}), getContact);
    route.get('/contactsbug', koaBody({jsonLimit: 100 * 1024 * 1024}), getContactsBug);
};

function * getContacts(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield contactsHandler.getContacts(this);
}

function * getContactsBug(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield contactsHandler.getContactsBug(this);
}

function * getContacts_AllisterDaniels(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    yield contactsHandler.getContacts_AllisterDaniels(this);
}

function * getContact(next) {
    /* jshint validthis: true */
    if ('GET' !== this.method) {
        return yield next;
    }

    var docId = this.params.docid;

    yield contactsHandler.getContact(docId, this);
}