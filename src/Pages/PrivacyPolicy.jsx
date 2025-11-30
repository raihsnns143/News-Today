import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Introduction</h2>
          <p>News Today ("we", "our", or "us") operates the News Today website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Information Collection and Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our service to you.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Personal Data:</strong> While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li><strong>Usage Data:</strong> We may also collect information on how the website is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Use of Data</h2>
          <p>News Today uses the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To provide and maintain our website</li>
            <li>To notify you about changes to our website</li>
            <li>To allow you to participate in interactive features of our website</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our website</li>
            <li>To monitor the usage of our website</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Security of Data</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us by visiting our contact page or sending an email to our support team.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
