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
      title: 'Baby Care Essentials Pack',
      subtitle: 'Everything Your Little One Needs',
      price: 'Price',
      description: 'Premium baby care package including ultra-soft diapers, gentle wipes, soothing cream, and more! Safe, comfortable, and perfect for your precious baby.',
      quantity: 'Quantity',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      city: 'City / Wilaya',
      selectCity: 'Select a wilaya',
      submitOrder: 'Order Now for My Baby',
      orderSuccess: 'Order submitted successfully! 🎉 We\'ll take care of your little one!',
      orderError: 'Error submitting order. Please try again.',
      features: [
        '✨ Ultra-Soft & Gentle',
        '🌿 Dermatologically Tested',
        '💝 Safe for Sensitive Skin',
        '🚚 Fast & Free Delivery',
        '✅ 100% Baby-Safe Materials'
      ],
      badge: 'Perfect for Newborns',
      packIncludes: 'Pack Includes:',
      items: [
        '🍼 Premium Diapers (Size 1-3)',
        '🧻 Gentle Baby Wipes',
        '🧴 Soothing Baby Cream',
        '🧸 Bonus Baby Care Guide'
      ]
    },
    ar: {
      title: 'حزمة العناية بالطفل الأساسية',
      subtitle: 'كل ما يحتاجه طفلك الصغير',
      price: 'السعر',
      description: 'حزمة عناية متكاملة بالطفل تشمل حفاضات فائقة النعومة، مناديل لطيفة، كريم مهدئ والمزيد! آمنة ومريحة ومثالية لطفلك الثمين.',
      quantity: 'الكمية',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      city: 'الولاية',
      selectCity: 'اختر ولاية',
      submitOrder: 'اطلب الآن لطفلي',
      orderSuccess: 'تم إرسال الطلب بنجاح! 🎉 سنعتني بطفلك الصغير!',
      orderError: 'خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.',
      features: [
        '✨ ناعم جداً ولطيف',
        '🌿 مختبر جلدياً',
        '💝 آمن للبشرة الحساسة',
        '🚚 توصيل سريع ومجاني',
        '✅ مواد آمنة 100٪ للأطفال'
      ],
      badge: 'مثالي لحديثي الولادة',
      packIncludes: 'الحزمة تتضمن:',
      items: [
        '🍼 حفاضات فاخرة (المقاس 1-3)',
        '🧻 مناديل مبللة لطيفة',
        '🧴 كريم مهدئ للأطفال',
        '🧸 دليل العناية بالطفل مجاناً'
      ]
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
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop" 
              alt="Baby Care Products" 
              className="product-image"
            />
            <div className="badge">� {t.badge}</div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h1 className="product-title">{t.title}</h1>
          {t.subtitle && <p className="product-subtitle">{t.subtitle}</p>}
          
          <div className="price-section">
            <span className="price">2,500 DZD</span>
            <span className="price-label">{t.price}</span>
            <span className="discount">3,500 DZD</span>
          </div>

          <p className="description">{t.description}</p>

          {/* Pack Includes Section */}
          <div className="pack-includes">
            <h3>{t.packIncludes}</h3>
            <ul>
              {t.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="features">
            {t.features.map((feature, index) => (
              <div key={index} className="feature-item">
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