'use strict';
var _ = require('lodash'),
    helper = require('./../libs/helper'),
    responseHelper = require('./../libs/response-helper');

module.exports.getContacts = function * getContacts(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);
    if (ctx.query.debug) {
        console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
    }

    if (!body.size) {
        return ctx.throw(400, 'size is required field');
    }

    if (!body.from) {
        return ctx.throw(400, 'from is required field');
    }

    var post = {};
    post.size = body.size;
    post.from = body.from;

    // request send to actual dev API and display response
    ctx.body = yield helper.sendRequestToAPI('/contacts', 'GET', post);

    // todo: update logic
    // so instead of returning all fields, API should only return first_name, last_name, company, email fields
    // also omit field which is null
    var fieldsToExtract = ['first_name', 'last_name', 'company', 'email'];
    ctx.body.results = responseHelper.filterResponse((ctx.body || {}).results,fieldsToExtract);
};

module.exports.getContactsBug = function * getContactsBug(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);
    if (ctx.query.debug) {
        console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
    }

    var post = {};
    // don't change this line
    post.filter = 'invalid';

    // todo: update logic, so this API will return actual error with status which received from https://dev.jobnimbus.com/api1/contacts api
    // request send to actual dev API and display response
    try{
        ctx.body = yield helper.sendRequestToAPI('/contacts', 'GET', post);
    } catch (error) {
    responseHelper.handleResponseError(ctx,error);
    }
};

// get contact records which first name is Allister and last name is Daniels
module.exports.getContacts_AllisterDaniels = function * getContacts_AllisterDaniels(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);
    if (ctx.query.debug) {
        console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
    }
    var must = [];
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html

    // is_active flag to indicate record is active
    must.push({'term': {'is_active': true}});

    // type field to indicate record is contact
    must.push({'term': {'type': 'contact'}});

    // parameter value needs to be in lower case
    // first_name field should be "allister"
    must.push({'term': {'first_name': 'allister'}});

    // parameter value needs to be in lower case
    // last_name field should be "daniels"
    must.push({'term': {'last_name': 'daniels'}});

    // elastic search query
    /**
     * Comment -> We can improve this query by including
     * a filter property since first_name and last_name can include
     * similar values. It will perform faster search
     */
    var query = {query: {bool: {must: must}}};

    // this will be replaced with actual ES server search api Call but for now we are creating hack for training
    var esResultFliter = helper.esSearchHack(query);

    var post = {};
    post.filter = esResultFliter;

    // request send to actual dev API and display response
    ctx.body = yield helper.sendRequestToAPI('/contacts', 'GET', post);
};

module.exports.getContact = function * getContact(docId, ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);
    if (ctx.query.debug) {
        console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
    }
    if (!docId) {
        return ctx.throw(400, 'docId is required field');
    }

    // todo from postman
    // try /contacts/405682d689454c639a89487b2dc9685e
    // try /contacts/test

    // todo: update logic, so this API will return actual error with status which received from https://dev.jobnimbus.com/api1/contacts/docid api
    // hint: review sendRequestToAPI function
    // request send to actual dev API and display response
    try {
        ctx.body = yield helper.sendRequestToAPI("/contacts/" + docId, "GET");
    } catch (error) {
        responseHelper.handleResponseError(ctx,error);
    }
};