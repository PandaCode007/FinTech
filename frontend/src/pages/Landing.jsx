import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTestimonials, getFaqs, getNews } from '../api';

export default function Landing() {
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    getTestimonials().then(({ data }) => setTestimonials(data)).catch(() => {});
    getFaqs().then(({ data }) => setFaqs(data)).catch(() => {});
    getNews().then(({ data }) => setNews(data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-2xl font-bold tracking-tight">ButterField</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-secondary transition-colors">Sign In</Link>
          <Link to="/register" className="bg-secondary px-4 py-2 rounded-lg hover:bg-red-500 transition-colors">Open Account</Link>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-primary via-[#16213e] to-secondary text-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Modern Digital Banking</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">Smart Investments, Global Transfers, and Secure Savings — all in one place.</p>
        <Link to="/register" className="inline-block mt-8 bg-secondary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-500 transition-colors shadow-xl">Get Started Free</Link>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="text-center p-6 shadow-xl rounded-xl border">
            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">$</div>
            <h3 className="text-xl font-semibold mb-2">Savings & Checking</h3>
            <p className="text-gray-500">High-yield savings and premium checking accounts with zero monthly fees.</p>
          </div>
          <div className="text-center p-6 shadow-xl rounded-xl border">
            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">↗</div>
            <h3 className="text-xl font-semibold mb-2">Global Transfers</h3>
            <p className="text-gray-500">Send money worldwide with competitive exchange rates and instant delivery.</p>
          </div>
          <div className="text-center p-6 shadow-xl rounded-xl border">
            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-gray-500">Biometric login, real-time fraud alerts, and encrypted transactions.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t._id} className="p-5 bg-gray-50 rounded-xl shadow border">
                <p className="italic text-gray-600">"{t.content}"</p>
                <p className="mt-3 font-semibold">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-10 text-center">
        <p className="text-lg font-bold">ButterField Bank</p>
        <p className="text-sm opacity-70 mt-1">Butterfield Place, 12 Albert Panton Street, Grand Cayman KY1-1107</p>
        <p className="text-sm opacity-50 mt-4">© {new Date().getFullYear()} ButterField.</p>
      </footer>
    </div>
  );
}