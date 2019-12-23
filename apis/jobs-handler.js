'use strict';
var _ = require('lodash'),
  helper = require('./../libs/helper'),
    responseHelper = require('./../libs/response-helper');

module.exports.getJobs = function* getJobs(ctx) {
  var body = ctx.request.body;
  _.defaults(body, ctx.query);

  if (ctx.query.debug) {
    console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
  }

  if (!body.size) {
    return ctx.throw(400, 'size is required field');
  }

  if (!/^\d+$/.test(body.size)) {
    return ctx.throw(400, 'size should be a number');
  }

  if (!body.from) {
    return ctx.throw(400, 'from is required field');
  }

  if (!/^\d+$/.test(body.from)) {
    return ctx.throw(400, 'from should be a number');
  }

  var post = {};
  post.size = body.size;
  post.from = body.from;
  // request send to actual dev API and display response
  ctx.body = yield helper.sendRequestToAPI('/jobs', 'GET', post);
  // todo: update logic
  // so instead of returning all fields, API should only return name, number, status_name fields
  // also omit field which is null

  // get required fields in single iteration of results.
    try{
        var fieldsToExtract = ['name', 'number', 'status_name'];
        ctx.body.results = responseHelper.filterResponse((ctx.body || {}).results,fieldsToExtract);
    }catch (error) {
        responseHelper.handleResponseError(ctx,error);
    }

};

/**
 * Get Job Records where name is westgate
 * @param ctx
 */
module.exports.getJobs_Westgate = function* getJobs_Westgate(ctx) {
  var body = ctx.request.body;
  _.defaults(body, ctx.query);
  if (ctx.query.debug) {
    console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
  }
  var must = [];
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html

  // is_active flag to indicate record is active
  must.push({ term: { is_active: true } });

  // type field to indicate record is job
  must.push({ term: { type: 'job' } });

  // parameter value needs to be in lower case
  // name field should be "westgate"
    // Since with name westgate no record is present using luis miguel for testing purpose
  //must.push({ term: { name: 'luis miguel' } });
    must.push({ term: { name: 'westgate' } });

  // elastic search query
  var query = { query: { bool: { must: must } } };

  // this will be replaced with actual ES server search api Call but for now we are creating hack for training
  var esResultFliter = helper.esSearchHack(query);

  var post = {};
  post.filter = esResultFliter;

  // request send to actual dev API and display response
  ctx.body = yield helper.sendRequestToAPI('/jobs', 'GET', post);

  // get required fields in single iteration of results.
    try{
        var fieldsToExtract = ['name', 'number', 'status_name'];
        ctx.body.results = responseHelper.filterResponse((ctx.body || {}).results,fieldsToExtract);
    } catch (error) {
        responseHelper.handleResponseError(ctx,error);
    }
};

// get job records which name is luis miguel
module.exports.getJobs_Search = function* getJobs_Search(ctx) {
  var body = ctx.request.body;
  _.defaults(body, ctx.query);
  if (ctx.query.debug) {
    console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
  }
  if (!body.title) {
    return ctx.throw(400, 'title is a required field');
  }
  var must = [];
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html

  // is_active flag to indicate record is active
  must.push({ term: { is_active: true } });

  // type field to indicate record is job
  must.push({ term: { type: 'job' } });

  // title field for search
  must.push({ term: { title: body.title } });
  // elastic search query
  var query = { query: { bool: { must: must } } };

  // this will be replaced with actual ES server search api Call but for now we are creating hack for training
  var esResultFliter = helper.esSearchHack(query);

  var post = {};
  post.filter = esResultFliter;

  // request send to actual dev API and display response
  try {
      ctx.body = yield helper.sendRequestToAPI('/jobs', 'GET', post);
  }
  catch (error) {
      responseHelper.handleResponseError(ctx,error);
  }
};

module.exports.getJob = function* getJob(docId, ctx) {
  var body = ctx.request.body;
  _.defaults(body, ctx.query);
  if (ctx.query.debug) {
    console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
  }
  if (!docId) {
    return ctx.throw(400, 'docId is a required field');
  }

  // todo from postman
  // try /jobs/lefei
  // try /jobs/test

  // todo: update logic, so this API will return actual error with status which received from https://dev.jobnimbus.com/api1/jobs/docid api
  // hint: review sendRequestToAPI function
  // request send to actual dev API and display response

  try {
    ctx.body = yield helper.sendRequestToAPI('/jobs/' + docId, 'GET');
  } catch (error) {
      responseHelper.handleResponseError(ctx,error);
  }
};
