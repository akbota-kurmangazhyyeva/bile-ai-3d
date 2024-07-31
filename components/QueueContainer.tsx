'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for the queue items
interface QueueItem {
  queue_position: number;
  unique_id: string;
  song_name: string;
}

const QueueContainer: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]); // Use the QueueItem type for the queue state

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ queue?: QueueItem[] }>('https://bile.ngrok.app/queue-status');
        console.log(response.data);
        if (Array.isArray(response.data.queue)) {
          setQueue(response.data.queue);
        } else {
          console.warn('Queue is not available or is not an array:', response.data.queue);
        }
      } catch (error) {
        console.error('Error fetching the queue:', error);
      }
    })(); // Immediately invoke the async function

  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h2>Queue</h2>
      {queue.length > 0 ? (
        <ul>
          {queue.map((item) => (
            <li key={item.unique_id}>
              <strong>Position:</strong> {item.queue_position} - <strong>Song:</strong> {item.song_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the queue.</p>
      )}
    </div>
  );
};

export default QueueContainer;
