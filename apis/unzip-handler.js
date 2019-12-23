/**
 * Unzip handler
 * - Used unzip library since adm-zip is syncronous so did not want to
 * block the other requests, Secondly adm-zip reads entire files into memory
 * so stuck with unzip.
 * There is a better option than unzip - https://www.npmjs.com/package/yauzl
 * Since unzip has some issues with reading headers on some valid zip files but works on
 * most of the files.
 */
'use strict';
var _ = require('lodash'),
    unzip = require('unzip'),
    fs = require('fs');

var FILE_PATH='./zip/test.zip';
/**
 * Unzip files handler
 * @param ctx
 */
module.exports.unzipFiles = function* (ctx) {
    var body = ctx.request.body;
    _.defaults(body, ctx.query);
    if (ctx.query.debug) {
        console.log('GET ' + ctx.url + ': ' + JSON.stringify(body, null, ' '));
    }

    ctx.body = yield unzipFile();
};

/**
 * Unzip file
 * @returns {Promise}
 */
function unzipFile() {
    return new Promise(function(resolve, reject) {
        var fileList = [];
        fs.createReadStream(FILE_PATH)
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
                fileList.push({
                    fileName: entry.path,
                    type: entry.type
                });
                entry.autodrain();
            })
            .on('close', function(){
                resolve({
                    fileList: fileList
                })
            });
    });
}