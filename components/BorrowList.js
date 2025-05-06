import { useEffect, useState } from 'react';
import { handleGetLendedItems } from '../api/lendedItems';

export default function BorrowList({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const data = await handleGetLendedItems(user.location, user.id);
      setItems(data || []);
    }
    fetchItems();
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Items in {user.location}</h2>
      {items.length === 0 ? (
        <div>No items available for borrowing in your area.</div>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="border p-4 rounded">
              <div className="font-bold">{item.title}</div>
              <div>{item.description}</div>
              <div>Category: {item.category}</div>
              <div>Location: {item.location}</div>
              <div>Owner: {item.user_id}</div>
              {/* Add a borrow button here if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 