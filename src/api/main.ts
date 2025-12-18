import express from 'express';
import { setupPolyfills } from './polyfills';
import { generatePdfFromData } from './generate-pdf';

setupPolyfills();

const app = express();
const PORT = process.env.PORT || 8010;
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT || '120000', 10); // 2 minutes default

app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use((req, res, next) => {
  req.setTimeout(REQUEST_TIMEOUT, () => {
    res.status(408).json({ error: 'Request timeout' });
  });
  res.setTimeout(REQUEST_TIMEOUT, () => {
    res.status(408).json({ error: 'Response timeout' });
  });
  next();
});

app.post('/api/generate', async (req, res) => {
  try {
    const { xml, nrKSeF, qrCode, qrCode2, isMobile } = req.body;

    if (!xml) {
      return res.status(400).json({ error: 'Missing xml parameter' });
    }

    const buffer = await generatePdfFromData({
      xmlContent: xml,
      nrKSeF,
      qrCode,
      qrCode2,
      isMobile
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF';
    res.status(500).json({ error: errorMessage });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const server = app.listen(PORT, () => {
  console.log(`KSEF PDF Generator API running on port ${PORT}`);
  console.log(`Request timeout: ${REQUEST_TIMEOUT}ms`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully...`);

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
  