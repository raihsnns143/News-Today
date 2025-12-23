import React, { useState } from "react";

import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import team4 from "../assets/team4.jpg";

const About = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${contactForm.name}! We'll contact you at ${contactForm.email}`);
    setContactForm({ name: "", email: "", message: "" });
    setShowContactModal(false);
  };

  const teamMembers = [
    { name: "Raihan", role: "Editor-in-Chief", image: team1 },
    { name: "Robiul", role: "Senior Journalist", image: team2 },
    { name: "Fardin", role: "Digital Media Specialist", image: team3 },
    { name: "Alif", role: "Content Strategist", image: team4 },
  ];

  const features = [
    "Real-time updates from verified sources",
    "Bilingual coverage: Bangla & English",
    "Clean, responsive user-friendly design",
    "Community-based reporting and feedback",
  ];

  return (
    <div className="bg-white text-black mt-10">
      {/* Hero Section */}
      <section className="primary-bg py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">About News Today</h1>
          <p className="text-lg leading-relaxed">
            Trusted, Transparent, and Timely — Bringing the world closer to you
            through responsible journalism.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver accurate, unbiased, and impactful news that empowers
              people with truth. News Today stands for clarity and credibility,
              ensuring every story reflects real voices and verified facts.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-black">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted bilingual digital news platform in
              Bangladesh — connecting people, communities, and the world with
              authentic information.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-black">Why Choose News Today?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="p-6 accent-bg rounded-xl shadow hover:shadow-lg transition duration-300">
                <p className="text-black font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 transition-colors duration-300 section-bg">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10 text-black">Meet Our Editorial Team</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-colors duration-300">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center primary-bg">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Want to Share Your Story?</h2>
          <p className="text-lg mb-6">
            Contact our editorial team to publish your authentic news and
            inspiring stories.
          </p>
          <button onClick={() => setShowContactModal(true)} className="btn-primary px-6 py-3 rounded-lg font-semibold">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-6 text-center border-t">
        <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-xl w-[90%] md:w-[500px] relative">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#000000" }}>
              Contact Us
            </h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full border p-3 rounded"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full border p-3 rounded"
                placeholder="Email"
                required
              />
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full border p-3 rounded"
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
              <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">
                Send Message
              </button>
            </form>
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;