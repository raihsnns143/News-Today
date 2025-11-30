import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">1. Agreement to Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) from News Today for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on News Today</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">3. Disclaimer</h2>
          <p>The materials on News Today's website are provided on an 'as is' basis. News Today makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">4. Limitations</h2>
          <p>In no event shall News Today or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on News Today's website, even if News Today or a News Today authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">5. Accuracy of Materials</h2>
          <p>The materials appearing on News Today's website could include technical, typographical, or photographic errors. News Today does not warrant that any of the materials on its website are accurate, complete, or current. News Today may make changes to the materials contained on its website at any time without notice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">6. Links</h2>
          <p>News Today has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by News Today of the site. Use of any such linked website is at the user's own risk.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">7. Modifications</h2>
          <p>News Today may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Bangladesh, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
