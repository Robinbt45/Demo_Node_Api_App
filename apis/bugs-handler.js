'use strict';
var _ = require('lodash'),
    responseHelper = require('./../libs/response-helper');

//Processing Error Object
var processingError = {
    statusCode: 500,
    message: "There was an error processing your request"
}
module.exports.postBug1= function * postBug1(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);

    // API is returning "Internal Server Error" with status code 500

    // Todo: API should return "There was an error processing your request." with status code 500
    // And track these errors so we can review/fix it
    return responseHelper.handleResponseError(ctx,processingError);
    // don't fix this error
    throw new Error('test');
};


module.exports.postBug2 = function * postBug2(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);

    // API is returning "Internal Server Error" with status code 500

    // Todo: API should return "There was an error processing your request." with status code 500
    // And track these errors so we can review/fix it
    return responseHelper.handleResponseError(ctx,processingError);
    // don't fix this error
    ctx.body = body.invalid.invalid2;
};

module.exports.postBug3 = function * postBug2(ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);

    // API is returning "Internal Server Error" with status code 500

    // Todo: API should return "There was an error processing your request." with status code 500
    // And track these errors so we can review/fix it
    return responseHelper.handleResponseError(ctx,processingError);
    // don't fix this error
    ctx.return('test');
};