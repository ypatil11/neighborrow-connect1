import { useEffect, useState } from 'react';
import { getLendedItemsByUser } from '../supabase/supabaseService';

export default function LendedItemsPage() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      if (!user) return;
      const { data } = await getLendedItemsByUser(user.id);
      setItems(data || []);
    }
    fetchItems();
  }, [user]);

  if (!user) return <div>Please sign in.</div>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">My Lended Items</h2>
      {items.length === 0 ? (
        <div>You have not listed any items yet.</div>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="border p-4 rounded">
              <div className="font-bold">{item.title}</div>
              <div>{item.description}</div>
              <div>Category: {item.category}</div>
              <div>Location: {item.location}</div>
              <div>Available: {item.is_available ? 'Yes' : 'No'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 