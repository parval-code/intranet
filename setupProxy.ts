// setupProxy.js (o setupProxy.ts si es TypeScript)

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(
    '/api', // La ruta que quieres redirigir, ajusta según tu necesidad
    createProxyMiddleware({
      target: 'https://api.simv.gob.do', // La URL del servidor al que quieres hacer la solicitud
      changeOrigin: true,
    })
  );
};
