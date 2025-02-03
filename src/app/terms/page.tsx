export default function TermsPage() {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-white text-center">
            Terms & License
          </h1>
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Terms of Use
              </h2>
              <p className="text-gray-300">
                By accessing and using this attendance system, you agree to be
                bound by these terms and conditions:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-300">
                <li>Users must maintain accurate attendance records.</li>
                <li>Unauthorized access or manipulation of data is prohibited.</li>
                <li>
                  Users are responsible for maintaining their account security.
                </li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">License</h2>
              <h3 className="text-xl font-semibold text-white">MIT License</h3>
              <div className="bg-gray-800 p-6 rounded-lg mt-4 shadow-md">
                <p className="text-gray-300">
                  Copyright (c) 2025 HUKUM
                </p>
                <p className="mt-4 text-gray-300">
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                </p>
                <ul className="list-disc pl-6 mt-4 text-gray-300">
                  <li>
                    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                  </li>
                </ul>
                <p className="mt-4 text-gray-300">
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Modifications
              </h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Users will
                be notified of any changes through the system.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
              <p className="text-gray-300">
                For any questions, please contact us at:
                <a
                  href="mailto:googldhruv@gmail.com"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                  googldhruv@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  }