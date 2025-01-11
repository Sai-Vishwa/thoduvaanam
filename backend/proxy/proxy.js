const {createProxyMiddleware} = require("http-proxy-middleware");

const setRequestBodydata = (proxyReq, req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
  const responseHandle = (proxyRes, req, res) => proxyRes.headers['access-control-allow-origin'] = '*'
  const proxyError = (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  }