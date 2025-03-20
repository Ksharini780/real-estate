import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';

export default function Favorites() {
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [allListings, setListings] = useState([]);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await fetch('/api/listing/get'); // ✅ Fetch all listings
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchAllListings();
  }, []);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    if (Array.isArray(allListings)) {
      setFavoriteListings(allListings.filter((listing) => favoriteIds.includes(listing._id)));
    } else {
        console.error("allListings is not an array", allListings);
      }
  }, [allListings]); // ✅ Update when allListings changes

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-slate-700 mb-4">Your Favorites ❤️</h1>
      {favoriteListings.length === 0 ? (
        <p className="text-gray-600">No favorite listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
