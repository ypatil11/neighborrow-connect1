import { useState } from 'react';
import { handleCreateLendedItem } from '../api/lendedItems';

export default function LendItemForm({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState(user.location || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = {
      user_id: user.id,
      title,
      description,
      category,
      location,
      is_available: true,
    };
    const result = await handleCreateLendedItem(item);
    if (result) {
      console.log('Lended item created:', result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="border p-2 w-full" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Lend Item</button>
    </form>
  );
} 