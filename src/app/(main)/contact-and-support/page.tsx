import Link from 'next/link';

const ContactAndSupportPage = () => {
  return (
    <div className="text-secondary">
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold">PlayPals: Contact and Support</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-lg font-bold">Get in Touch with Us</h2>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">Contact Information</h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">Email: support@playpals.com</li>
              <li className="text-secondary/80">Phone: +1 (123) 456-7890</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">Support Hours</h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">
                Monday to Friday: 9 AM - 5 PM
              </li>
              <li className="text-secondary/80">Saturday and Sunday: Closed</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold">Privacy and Policy</h3>
          <p className="text-secondary/80">
            For more information on our privacy practices and policies, please
            visit our{' '}
            <Link
              href="/privacy-and-policy"
              className="text-primary hover:text-primary/75"
              target="_blank"
            >
              Privacy and Policy
            </Link>{' '}
            page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContactAndSupportPage;
