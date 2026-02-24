import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
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
            <Shield className="text-purple-400" size={48} />
            <h1 className="text-5xl font-black">Disclaimer</h1>
          </div>
          <p className="text-gray-300 text-sm">
            Last Updated: February 24, 2026
          </p>
        </div>

        <div className="bg-yellow-900 bg-opacity-30 border-2 border-yellow-600 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="text-yellow-400 flex-shrink-0" size={32} />
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Important Notice</h3>
            <p className="text-gray-300">
              Please read this disclaimer carefully before using MandaStrong Studio. By using our Service, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-8 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">General Information</h2>
            <p className="text-gray-300 leading-relaxed">
              The information provided by MandaStrong Studio ("we," "us," or "our") on this platform and through our Service is for general informational and educational purposes only. All information on the Service is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">No Professional Advice</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The Service is not intended to provide professional advice of any kind, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Legal advice or legal services</li>
              <li>Financial or investment advice</li>
              <li>Medical or health-related advice</li>
              <li>Professional counseling or therapy</li>
              <li>Technical or engineering consultation</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Always seek the advice of qualified professionals for any specific questions or concerns.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Service Availability and Performance</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SERVICE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SERVICE. YOUR USE OF THE SERVICE AND YOUR RELIANCE ON ANY INFORMATION ON THE SERVICE IS SOLELY AT YOUR OWN RISK.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We do not guarantee that the Service will be available at all times or that it will function without interruption, errors, or security vulnerabilities. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">User-Generated Content</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              MandaStrong Studio allows users to create, upload, and share content. We do not:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Endorse, support, or guarantee the accuracy of user-generated content</li>
              <li>Assume responsibility for content created by users</li>
              <li>Verify the identity, credentials, or claims of users</li>
              <li>Monitor all user interactions or content in real-time</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Users are solely responsible for their own content and interactions on the platform. We encourage users to report inappropriate or harmful content.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Copyright and Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              Users are responsible for ensuring they have the necessary rights, licenses, and permissions for all content they upload or create using our Service. We do not assume liability for any copyright infringement, trademark violations, or other intellectual property rights violations committed by users. If you believe your intellectual property rights have been infringed, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Third-Party Links and Services</h2>
            <p className="text-gray-300 leading-relaxed">
              Our Service may contain links to third-party websites, services, or resources. These links are provided for your convenience only. We have no control over the content, privacy policies, or practices of third-party websites and assume no responsibility for them. Your use of third-party websites is at your own risk and subject to the terms and conditions of those websites.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">AI and Automated Processing</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              MandaStrong Studio utilizes artificial intelligence and automated processing technologies. Please be aware that:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>AI-generated or AI-enhanced content may contain errors or inaccuracies</li>
              <li>Automated processes may not always produce expected results</li>
              <li>AI systems may have limitations and biases</li>
              <li>Results may vary depending on input quality and other factors</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Users should review and verify all AI-generated or AI-processed content before use, publication, or distribution.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Data Loss and Backup</h2>
            <p className="text-gray-300 leading-relaxed">
              While we implement reasonable measures to protect user data, we cannot guarantee against data loss due to technical failures, security breaches, or other unforeseen circumstances. Users are responsible for maintaining their own backups of important content and data. WE SHALL NOT BE LIABLE FOR ANY DATA LOSS OR CORRUPTION.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Export and Use of Created Content</h2>
            <p className="text-gray-300 leading-relaxed">
              Content created, edited, or processed using MandaStrong Studio is the responsibility of the user. We are not liable for how users choose to use, distribute, publish, or monetize content created through our Service. Users must ensure their use of created content complies with all applicable laws, regulations, and third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Charitable Mission Statement</h2>
            <p className="text-gray-300 leading-relaxed">
              MandaStrong Studio supports Veterans Mental Health Services and educational initiatives focused on bullying prevention and social skills development. While we are committed to this mission, we make no guarantees about the availability or continuation of charitable programs. All charitable contributions and partnerships are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Age Restrictions</h2>
            <p className="text-gray-300 leading-relaxed">
              Users must be at least 13 years of age to use MandaStrong Studio. Users between 13 and 18 years of age must have parental or guardian consent. We are not responsible for verifying the age of users or ensuring parental consent has been obtained.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MANDASTRONG STUDIO, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Business interruption or loss of business opportunities</li>
              <li>Damages arising from unauthorized access to or alteration of your content</li>
              <li>Damages resulting from reliance on information obtained through the Service</li>
              <li>Any other damages arising out of your use of or inability to use the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Changes to Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting to the Service. Your continued use of the Service after any changes indicates your acceptance of the modified Disclaimer. We encourage you to review this Disclaimer periodically.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Contact and Support</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions or concerns about this Disclaimer or any aspect of the Service, please contact us through our support channels. For information about our mission supporting Veterans Mental Health Services and our educational initiatives, visit MandaStrong1.Etsy.com.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Severability</h2>
            <p className="text-gray-300 leading-relaxed">
              If any provision of this Disclaimer is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Disclaimer will otherwise remain in full force and effect and enforceable.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-purple-600">
            <p className="text-gray-400 text-sm text-center">
              BY USING MANDASTRONG STUDIO, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS DISCLAIMER AND AGREE TO ALL ITS TERMS AND CONDITIONS. IF YOU DO NOT AGREE TO THIS DISCLAIMER, YOU ARE NOT AUTHORIZED TO USE THE SERVICE.
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
            to="/terms"
            className="bg-gray-800 hover:bg-gray-700 border-2 border-purple-600 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            View Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
