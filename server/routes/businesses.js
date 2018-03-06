import express from 'express';

const router = express.Router();

router.get('/business', (req, res) => {
  res.send('Hi i am a business');
});

export default router;
