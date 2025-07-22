import { Request, Response } from 'express';
import { Client } from '@elastic/elasticsearch';

export const createOrder = async (
  req: Request,
  res: Response,
  esClient: Client
) => {
  try {
    const { fullName, address, email, shoppingList } = req.body;

    await esClient.index({
      index: 'orders',
      body: {
        fullName,
        address,
        email,
        shoppingList,
        createdAt: new Date(),
      },
    });

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
