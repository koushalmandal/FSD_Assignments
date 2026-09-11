const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Mini e-commerce backend is running.' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
