"use client";
import { useState } from 'react';
import axios from 'axios';
import './page.css';

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'

  const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouïra',
    'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
    'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla',
    'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
    'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
    'Ouled Djellal', 'Béni Abbès', 'Ain Salah', 'Ain Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Menia'
  ];

  const translations = {
    en: {
      title: 'Premium Widget',
      price: 'Price',
      description: 'This is a cool widget that does amazing things!',
      quantity: 'Quantity',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      city: 'City / Wilaya',
      selectCity: 'Select a wilaya',
      submitOrder: 'Submit Order',
      orderSuccess: 'Order submitted successfully! 🎉',
      orderError: 'Error submitting order. Please try again.',
      features: ['High Quality', 'Fast Delivery', 'Money Back Guarantee'],
    },
    ar: {
      title: 'منتج مميز',
      price: 'السعر',
      description: 'هذا منتج رائع يقوم بأشياء مذهلة!',
      quantity: 'الكمية',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      city: 'الولاية',
      selectCity: 'اختر ولاية',
      submitOrder: 'إرسال الطلب',
      orderSuccess: 'تم إرسال الطلب بنجاح! 🎉',
      orderError: 'خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.',
      features: ['جودة عالية', 'توصيل سريع', 'ضمان استرجاع المال'],
    },
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://chou-xixo.onrender.com';
      await axios.post(`${apiUrl}/api/orders/`, {
        quantity: parseInt(quantity, 10),
        full_name: fullName,
        phone_number: phoneNumber,
        city,
      });
      setMessage(t.orderSuccess);
      // Reset form
      setQuantity(1);
      setFullName('');
      setPhoneNumber('');
      setCity('');
    } catch (error) {
      console.error('Error details:', error.response?.data);
      setMessage(t.orderError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${language === 'ar' ? 'rtl' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Switcher */}
      <div className="language-switcher">
        <button 
          className={language === 'en' ? 'active' : ''} 
          onClick={() => setLanguage('en')}
        >
          English
        </button>
        <button 
          className={language === 'ar' ? 'active' : ''} 
          onClick={() => setLanguage('ar')}
        >
          العربية
        </button>
      </div>

      <div className="product-card">
        {/* Product Image Section */}
        <div className="product-image-section">
          <div className="product-image-container">
            <img 
              src="https://click-dz.com/wp-content/uploads/2024/01/Xiaomi-Mi-TV-Box-S-2nd-1.jpg" 
              alt="Product" 
              className="product-image"
            />
            <div className="badge">🔥 {language === 'ar' ? 'عرض حصري' : 'Hot Deal'}</div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h1 className="product-title">{t.title}</h1>
          
          <div className="price-section">
            <span className="price">100 DZD</span>
            <span className="price-label">{t.price}</span>
          </div>

          <p className="description">{t.description}</p>

          {/* Features */}
          <div className="features">
            {t.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label>{t.quantity}</label>
              <div className="quantity-selector">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>{t.fullName}</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              />
            </div>

            <div className="form-group">
              <label>{t.phoneNumber}</label>
              <input 
                type="tel" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                placeholder={language === 'ar' ? '0XX XXX XXXX' : '0XX XXX XXXX'}
              />
            </div>

            <div className="form-group">
              <label>{t.city}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} required>
                <option value="">{t.selectCity}</option>
                {wilayas.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                t.submitOrder
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`message ${message.includes('successfully') || message.includes('بنجاح') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}