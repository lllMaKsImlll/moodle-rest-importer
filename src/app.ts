import express from 'express';
import cors from 'cors';
import moodleRoutes from './routers/moodle.routes';
import puppeteerRoutes from './routers/puppeteer.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/moodle', moodleRoutes);
app.use('/api/puppeteer', puppeteerRoutes); 

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;