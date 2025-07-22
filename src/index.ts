import express from 'express';
import * as bodyParser from 'body-parser';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import cors from 'cors';
import { createOrder } from './controllers/orderController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Elasticsearch client
const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false, // Disable SSL verification for development
  },
});

// Routes
app.post('/api/orders', (req, res) => createOrder(req, res, esClient));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
