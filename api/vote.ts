import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uniqueId, voteOption } = req.body;

    if (!uniqueId || !voteOption) {
      return res.status(400).json({ error: 'Unique ID and Vote Option are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('voting');
      const collection = db.collection('votes');

      await collection.updateOne(
        { uniqueId },
        { $set: { voteOption } },
        { upsert: true }
      );

      return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
