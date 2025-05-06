import { useEffect, useState } from 'react';
import { getBorrowedItemsByUser } from '../supabase/supabaseService';

export default function BorrowedItemsPage({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await getBorrowedItemsByUser(user.id);
      setItems(data || []);
    }
    fetchItems();
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Borrowed Items</h2>
      {items.length === 0 ? (
        <div>You have not borrowed any items yet.</div>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="border p-4 rounded">
              <div className="font-bold">Lended Item ID: {item.lended_item_id}</div>
              <div>Status: {item.status}</div>
              <div>Requested At: {item.requested_at}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 