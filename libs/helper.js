'use strict';
var _ = require('lodash'),
    request = require('request');

function getAuthBearer() {
    // dev demo account's bearer
    return 'Bearer jfbh37cg1uhslrs2';
};
const BaseApi = 'https://dev.jobnimbus.com/api1';

function remoteRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (err, response, body) {
            if (!err && response.statusCode >= 400) {
                try {
                    //ignore if we can't convert error to json stringify (error may be not json object)
                    err = new Error(JSON.stringify(body));
                } catch (err1) {
                    //return body as an error if body is not json
                    if (!_.isEmpty(_.trim(body))) {
                        return reject(body);
                    }
                }
            }
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    });
}

function* sendRequestToAPI(api, method, postData) {
    var options = {
        method: method,
        json: true,
        headers: {
            'content-type': 'application/json',
            'User-Agent': 'NodeJS Training Agent',
            Authorization: getAuthBearer()
        },
        uri: `${BaseApi}${api}`,
    };

    if (method === 'POST') {
        options.json = postData;
    } else {
        if (!_.isEmpty(postData)) {
            options.uri += '?';
            var keys = _.keysIn(postData);
            _.each(keys, function (singleKey) {
                options.uri += `${singleKey}=${postData[singleKey]}&`;
            });
        }
    }
    //console.log(JSON.stringify(options, null, ' '));
    return remoteRequest(options);
}

// don't change this logic
// you need to adjust where you are using this function
module.exports.esSearchHack = function esSearchHack(esQuery) {
    return JSON.stringify(esQuery.query.bool);
    //var op = yield sendRequestToAPI('training', 'POST', {es: JSON.stringify(postData)});
    //return op;
};

module.exports.sendRequestToAPI = sendRequestToAPI;