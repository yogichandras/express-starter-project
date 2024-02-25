/**
 * GET /
 * Home page
 */
export const index = (req, res) => res.send('Guam Cornerstone API Server');

/**
 * GET /health
 * Health check
 */
export const healthCheck = (req, res) => res.json({ success: true });
