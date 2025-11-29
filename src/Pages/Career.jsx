import React, { useState } from "react";

const Career = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [cvOpen, setCvOpen] = useState(false);
  const [cvForm, setCvForm] = useState({ name: "", email: "", file: null });

  const jobs = [
    { role: "Junior News Reporter", type: "Full Time", location: "Dhaka" },
    { role: "Content Writer (Bangla)", type: "Full Time", location: "Remote" },
    { role: "Graphic Designer", type: "Part Time", location: "Remote" },
    { role: "Video Editor (Short Form)", type: "Part Time", location: "Dhaka" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 mt-10">

      {/* Hero */}
      <section
        className="text-white py-20 text-center"
        style={{ background: "linear-gradient(to right, #D63460, #D63460)" }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Build Your Future With Us</h1>
          <p className="text-lg leading-relaxed">
            Join our mission to deliver authentic journalism for millions.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8" style={{ color: "#D63460" }}>
          Why Work At News Today?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Growth-focused modern digital newsroom",
            "Friendly & collaborative culture",
            "Work directly with experienced journalists",
          ].map((text, i) => (
            <div key={i} className="bg-white p-8 shadow rounded-xl">
              <p className="font-medium text-gray-800">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center" style={{ color: "#D63460" }}>
            Open Positions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <div key={index} className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2" style={{ color: "#D63460" }}>
                  {job.role}
                </h3>
                <p className="text-gray-700 text-sm">
                  {job.type} • {job.location}
                </p>

                <button
                  onClick={() => { setSelectedJob(job.role); setOpen(true); }}
                  className="mt-4 bg-[#D63460] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* call to action final */}
      <section
        className="py-16 text-center text-white"
        style={{ background: "linear-gradient(to right, #D63460, #D63460)" }}
      >
        <h2 className="text-3xl font-semibold mb-4">Didn’t find a role matching you?</h2>
        <p className="mb-6">Send your CV — we always welcome talented people.</p>

        <button onClick={() => setCvOpen(true)} className="bg-white text-[#D63460] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Send CV
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
      </footer>

      {/* Apply Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-xl w-[90%] md:w-[500px] relative">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: "#D63460" }}
            >
              Apply For {selectedJob}
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Application submitted for ${selectedJob}! We'll review and contact you.`);
              setOpen(false);
            }} className="space-y-4">
              <input
                className="w-full border p-3 rounded"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                className="w-full border p-3 rounded"
                placeholder="Email"
                required
              />
              <textarea
                className="w-full border p-3 rounded"
                rows="3"
                placeholder="Short Message"
                required
              ></textarea>
              <input type="file" className="w-full border p-3 rounded" required />

              <button
                type="submit"
                className="bg-[#D63460] w-full text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Submit Application
              </button>
            </form>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Send CV Modal */}
      {cvOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-xl w-[90%] md:w-[500px] relative">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: "#D63460" }}
            >
              Send Your CV
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`CV submitted! We'll review your profile and get back to you.`);
              setCvOpen(false);
              setCvForm({ name: "", email: "", file: null });
            }} className="space-y-4">
              <input
                type="text"
                value={cvForm.name}
                onChange={(e) => setCvForm({ ...cvForm, name: e.target.value })}
                className="w-full border p-3 rounded"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                value={cvForm.email}
                onChange={(e) => setCvForm({ ...cvForm, email: e.target.value })}
                className="w-full border p-3 rounded"
                placeholder="Email"
                required
              />
              <input type="file" className="w-full border p-3 rounded" required />

              <button
                type="submit"
                className="bg-[#D63460] w-full text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Send CV
              </button>
            </form>

            <button
              onClick={() => setCvOpen(false)}
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

export default Career;
