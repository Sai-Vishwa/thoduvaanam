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

  const authProxy = createProxyMiddleware({
    target: 'http://localhost:4001/api/v1/login-signup',
    changeOrigin: true,
    pathRewrite: {
      '^/login-signup': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  const basicProxy = createProxyMiddleware({
    target: 'http://localhost:4002/api/v1/basic',
    changeOrigin: true,
    pathRewrite: {
      '^/basic': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  const submissionProxy = createProxyMiddleware({
    target: 'http://localhost:4003/api/v1/submission',
    changeOrigin: true,
    pathRewrite: {
      '^/submission': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  const adminProxy = createProxyMiddleware({
    target: 'http://localhost:4004/api/v1/admin',
    changeOrigin: true,
    pathRewrite: {
      '^/admin': ''
    },
    on: {
      proxyReq: (proxyReq, req, res) => setRequestBodydata(proxyReq, req, res),
      proxyRes: (proxyRes, req, res) => responseHandle(proxyRes, req, res),
      error: (err, req, res) => proxyError(err, req, res)
    }
  });

  module.exports = { 
    authProxy,basicProxy,submissionProxy,adminProxy
  }