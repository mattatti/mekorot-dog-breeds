// src/setupProxy.ts

import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
    app.use(
        '/ClientHub', // Update this to the actual endpoint of your SignalR hub
        createProxyMiddleware({
            target: 'http://62.90.222.249:10001',
            changeOrigin: true,
            ws: true,
        })
    );
    console.log('proxy created')
};
