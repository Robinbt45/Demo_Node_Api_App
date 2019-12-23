/**
 * A helper for parsing and
 * filtering response
 */
'use strict';
var _ = require('lodash');

/**
 * Filter the response list to include
 * only the fields passed in fields
 * @param records
 * @param fields
 * @returns {*}
 */
var filterResponse = function (records, fields) {
    var results = records || [];
    if (fields instanceof Array && fields.length > 0) {
        results = _.map(results, function (record) {
            // Pick the fields according to array passed
            var filteredRecord = _.pick(record, fields);
            // Omit all the fields that are empty, null or undefined
            filteredRecord = _(filteredRecord)
                .omitBy(_.isUndefined)
                .omitBy(_.isNull)
                .omitBy(_.isEmpty)
                .value();
            return filteredRecord;
        });
    }
    return results || [];
};

/**
 * Handle Response Error
 * @param ctx
 * @param error
 * @returns {*}
 */
var handleResponseError = function(ctx, error){
    error = error || {};
    // Take default error as 500 if statusCode not present since this is an unexpected error
    ctx.response.status = error.statusCode || 500;
    //Set error message in body
    ctx.body = error.message;
};


module.exports = {
    filterResponse: filterResponse,
    handleResponseError : handleResponseError
}