const PrivacyAndPolicyPage = () => {
  return (
    <div className="text-secondary">
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold">PlayPals: Privacy and Policy</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-lg font-bold">
          Understanding Your Privacy and Policy
        </h2>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">Data Collection</h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">
                We collect your email address and other personal information to
                provide you with our services.
              </li>
              <li className="text-secondary/80">
                We use cookies to enhance your experience on our site.
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">Data Usage</h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">
                Your data is used to personalize your experience, analyze site
                usage, and improve our services.
              </li>
              <li className="text-secondary/80">
                We share your data with our marketing team for marketing
                purposes with your consent.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold">Your Rights</h3>
          <p className="text-secondary/80">
            You have the right to access, correct, and delete your personal
            information. Contact us for more details.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyAndPolicyPage;
