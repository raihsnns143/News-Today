import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:support@newstoday.com" className="hover:text-blue-600 transition">
                  support@newstoday.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+8801234567890" className="hover:text-blue-600 transition">
                  +880 1234 567 890
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Address</h3>
              <p className="text-gray-600">
                News Today<br />
                Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday - Sunday: 10:00 AM - 4:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/raihanns143" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition">
                  Facebook
                </a>
                <a href="https://www.instagram.com/raihanns143/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition">
                  Instagram
                </a>
                <a href="https://github.com/raihsnns143" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
