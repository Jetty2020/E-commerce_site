const { createProxyMiddleware } = require('http-proxy-middleware');

let target;

if (process.env.NODE_ENV === 'development') {
    target = 'http://localhost:4000';
} else {
    target = 'https://server-29concept.herokuapp.com';
}
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};