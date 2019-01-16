"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function response(res, data) {
    res.statusCode = 200;
    res.setHeader('Content-Type', `text/json`);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.end(data);
    return res;
}
exports.response = response;
function error(res, e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', `text/json`);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.end({ response: 'There was an issue...' });
    console.log(e.message);
    return res;
}
exports.error = error;
//# sourceMappingURL=headers.js.map