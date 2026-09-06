import React, { useState } from 'react';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { 
  FaChevronRight, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaCheck,
  FaChevronDown 
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: "What are your shipping rates and delivery times?",
      a: "We offer Free Standard Shipping on all domestic orders over $50. Standard delivery typically takes 3-5 business days. Express overnight shipping options are available at checkout."
    },
    {
      q: "What is your return & exchange policy?",
      a: "We accept returns of unused items in original packaging within 30 days of purchase for a full refund or exchange. Return shipping labels are provided free of charge."
    },
    {
      q: "How can I track my existing order?",
      a: "Once your package ships, you will receive an automated email containing a tracking number and direct link to follow your shipment in real time."
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship to over 45 countries worldwide via DHL Express. International taxes and duties are calculated upfront during checkout."
    }
  ];

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">Contact Us</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">Contact</span>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-sm">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Visit Our Store</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                575 Crescent Ave.<br />Quakertown, PA 18951
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-sm">
              <FaPhoneAlt />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Call Us</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                (052) 611-5711<br />Toll Free: 1-800-OREBI
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-sm">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Email Us</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                support@orebi.com<br />info@orebistore.com
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-sm">
              <FaClock />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Working Hours</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Mon - Fri: 9:00 AM - 8:00 PM<br />Sat - Sun: 10:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-zinc-900 p-8 border border-gray-200 dark:border-zinc-800 rounded-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Send Us a Message</h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mb-6">
              Have a question, feedback, or need help? Fill out the form below.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-sm flex items-center gap-3">
                <FaCheck className="text-xl text-emerald-600" />
                <div>
                  <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                  <p className="text-xs mt-0.5">Thank you for reaching out. Our support team will respond within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order Inquiry / General Question"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Frequently Asked Questions</h2>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Quick answers to common questions about orders, shipping, and returns.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-200 dark:border-zinc-800 rounded-sm overflow-hidden bg-white dark:bg-zinc-900"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-sm flex items-center justify-between text-gray-900 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown className={`text-xs transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-gray-600 dark:text-zinc-400 border-t border-gray-100 dark:border-zinc-800/60 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;