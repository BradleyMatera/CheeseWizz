export default {
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8080', // Your API server
        changeOrigin: true,
      },
    },
  },
};