import React from "react";

const CookiesPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Cookies Policy</h1>
      
      <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">What Are Cookies?</h2>
          <p>Cookies are small pieces of data stored on your device (computer, mobile phone, tablet, etc.) when you visit a website. They serve to remember information about you, such as your preferences or login status, during and after your visit.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Types of Cookies We Use</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2">Essential Cookies:</h3>
          <p>These cookies are necessary for the website to function properly. They enable basic functionality like page navigation and access to secure areas of the website.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Performance Cookies:</h3>
          <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Functional Cookies:</h3>
          <p>These cookies allow the website to remember your choices (such as your username, language, or the region you are in) and provide enhanced, more personalized features.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Advertising Cookies:</h3>
          <p>These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and to measure the effectiveness of advertising campaigns.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">How We Use Cookies</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To enable certain functions of the website</li>
            <li>To provide analytics and improve our website's performance</li>
            <li>To store your preferences and settings</li>
            <li>To deliver personalized content and advertisements</li>
            <li>To remember your login information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Managing Cookies</h2>
          <p>Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. You can choose to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Accept all cookies</li>
            <li>Reject all cookies</li>
            <li>Accept only certain types of cookies</li>
            <li>Receive a prompt each time a cookie is about to be set</li>
          </ul>
          <p className="mt-4">Please note that if you disable cookies, some features of our website may not function properly.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Third-Party Cookies</h2>
          <p>Some of our website partners may also set cookies on your device. We do not control these third-party cookies and recommend reviewing their privacy and cookie policies for more information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Changes to This Cookies Policy</h2>
          <p>We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we use cookies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Contact Us</h2>
          <p>If you have questions about our use of cookies, please contact us through our contact page.</p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy;
