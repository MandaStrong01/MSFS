import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-purple-600 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="text-purple-400" size={48} />
            <h1 className="text-5xl font-black">Terms of Service</h1>
          </div>
          <p className="text-gray-300 text-sm">
            Last Updated: February 24, 2026
          </p>
        </div>

        <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-8 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using MandaStrong Studio ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">2. Description of Service</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              MandaStrong Studio provides an AI-powered creative platform for video editing, content creation, and media processing. The Service includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Video editing and processing tools</li>
              <li>AI-powered creative enhancement features</li>
              <li>Media library management</li>
              <li>Community sharing capabilities</li>
              <li>Export and download functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">3. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              To access certain features of the Service, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">4. User Content and Ownership</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You retain all rights to the content you create, upload, or process through MandaStrong Studio. By using the Service, you grant us a limited license to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Store and process your content to provide the Service</li>
              <li>Display content you choose to make public in the Community Hub</li>
              <li>Use aggregated, anonymized data to improve the Service</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              You represent and warrant that you own or have the necessary rights to all content you upload and that your content does not infringe on the intellectual property rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">5. Acceptable Use Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service's operation</li>
              <li>Create content that is illegal, offensive, or inappropriate</li>
              <li>Use the Service for commercial purposes without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-300 leading-relaxed">
              Your privacy is important to us. We collect and process personal data in accordance with applicable privacy laws. By using the Service, you consent to our collection and use of your data as described in our Privacy Policy. We implement reasonable security measures to protect your data, but cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              The Service, including its original content, features, and functionality, is owned by MandaStrong Studio and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Our trademarks and trade dress may not be used without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">8. Disclaimers and Limitations of Liability</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, MANDASTRONG STUDIO DISCLAIMS ALL WARRANTIES, INCLUDING:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Accuracy, reliability, or availability of the Service</li>
              <li>That the Service will be uninterrupted or error-free</li>
              <li>That defects will be corrected</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              IN NO EVENT SHALL MANDASTRONG STUDIO BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">9. Indemnification</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless MandaStrong Studio and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of the Service, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">10. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">12. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">13. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our support channels or visit our Etsy store at MandaStrong1.Etsy.com for more information about our mission supporting Veterans Mental Health Services.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-purple-600">
            <p className="text-gray-400 text-sm text-center">
              By using MandaStrong Studio, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            Back to Home
          </Link>
          <Link
            to="/disclaimer"
            className="bg-gray-800 hover:bg-gray-700 border-2 border-purple-600 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            View Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
}
