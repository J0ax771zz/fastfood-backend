const app = require('./app');

if (process.env.VERCEL) {
  module.exports = app; // exporta para Vercel
} else {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}