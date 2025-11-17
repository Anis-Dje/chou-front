"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouïra',
    'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
    'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla',
    'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
    'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
    'Ouled Djellal', 'Béni Abbès', 'Ain Salah', 'Ain Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Menia'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://chou-xixo.onrender.com';
      await axios.post(`${apiUrl}/api/orders/`, {
        quantity: parseInt(quantity, 10),  // Ensure it's an integer
        full_name: fullName,
        phone_number: phoneNumber,
        city,
      });
      setMessage('Order submitted successfully!');
      // Reset form
      setQuantity(1);
      setFullName('');
      setPhoneNumber('');
      setCity('');
    } catch (error) {
      console.error('Error details:', error.response?.data);
      setMessage(`Error submitting order: ${error.response?.data?.quantity?.[0] || error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Product Page</h1>
      <img src="https://placehold.co/300x300?text=Widget" alt="Product" style={{ width: '300px' }} />
      <p><strong>Price:</strong> 100 DZD</p>
      <p><strong>Description:</strong> This is a cool widget that does amazing things!</p>
      
      <form onSubmit={handleSubmit}>
        <label>Quantity:</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <br />
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <br />
        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <br />
        <label>City:</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} required>
          <option value="">Select a wilaya</option>
          {wilayas.map((w) => <option key={w} value={w}>{w}</option>)}
        </select>
        <br />
        <button type="submit">Submit Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}