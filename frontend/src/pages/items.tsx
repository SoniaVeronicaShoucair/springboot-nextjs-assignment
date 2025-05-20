import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Item {
  id: string;
  name: string;
}

export default function ItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // 🚫 Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // ✅ Fetch items on load
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`)
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setError('Failed to fetch items'));
  }, []);

  // ➕ Handle add item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      setName('');
    } else {
      setError('Failed to add item');
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Items</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            placeholder="New item name"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Item
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-2 bg-gray-100 border rounded text-gray-700"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
