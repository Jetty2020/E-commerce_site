const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://localhost:4000',
            target: 'https://server-29concept.herokuapp.com',
            changeOrigin: true,
        })
    );
};