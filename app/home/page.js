"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Foto() {
  const [foto, setFoto] = useState([]);
  const [filteredFoto, setFilteredFoto] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setFoto(response.data);
        setFilteredFoto(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredFoto(
      foto.filter(photo => 
        photo.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, foto]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Foto</h2>
        <input
          type="text"
          placeholder="Cari berdasarkan judul"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mt-4 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFoto.map(photo => (
            <div key={photo.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto mb-2 rounded" />
              <h3 className="text-lg font-bold">{photo.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
