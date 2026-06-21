export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-16">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-4xl font-bold text-black">
                    Terms of Service
                </h1>

                <p className="mb-10 text-sm text-gray-500">
                    Last Updated: June 21, 2026
                </p>

                <p className="mb-8 leading-7 text-gray-700">
                    Welcome to Yugoma. These Terms of Service (Terms)
                    govern your access to and use of Yugoma website,
                    dashboard, and AI productivity tools. By accessing
                    or using our services, you agree to be bound by
                    these Terms.
                </p>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        1. Services Description & Scope
                    </h2>

                    <p className="leading-7 text-gray-700">
                        Yugoma provides an AI-powered productivity
                        assistant that integrates with Gmail and Google
                        Calendar. The platform helps users manage
                        emails, drafts, and calendar events through
                        natural language commands.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Our AI assistant generates suggestions and
                        performs actions only based on user
                        instructions.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        2. Accounts and Authentication
                    </h2>

                    <p className="leading-7 text-gray-700">
                        To use Yugoma, users may create an account
                        using email authentication or sign in using
                        their Google Account through official OAuth
                        credentials.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        You are responsible for maintaining the
                        confidentiality of your account and for all
                        activities performed under your account.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        3. Google Integrations
                    </h2>

                    <p className="leading-7 text-gray-700">
                        Yugoma connects to Gmail and Google Calendar
                        only after explicit user authorization.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Users may revoke access at any time through
                        Google Account settings or by disconnecting
                        integrations from the application.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        4. Usage Limits & Fair Use
                    </h2>

                    <p className="mb-4 leading-7 text-gray-700">
                        Users agree not to:
                    </p>

                    <ul className="list-disc space-y-3 pl-6 text-gray-700">
                        <li>
                            Abuse the platform or attempt unauthorized
                            access.
                        </li>

                        <li>
                            Generate spam, malicious content, or harmful
                            activities.
                        </li>

                        <li>
                            Interfere with the operation or security of
                            Yugoma.
                        </li>
                    </ul>

                    <p className="mt-5 leading-7 text-gray-700">
                        Violation of these terms may result in temporary
                        suspension or termination of access.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        5. Data and Privacy
                    </h2>

                    <p className="leading-7 text-gray-700">
                        Your use of Yugoma is also governed by our
                        Privacy Policy.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Yugoma does not sell user data and only accesses
                        Google services to perform actions explicitly
                        requested by the user.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        6. Disclaimers & Limitation of Liability
                    </h2>

                    <p className="leading-7 text-gray-700">
                        Yugoma is provided on an (as is) basis without
                        warranties of any kind.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        AI-generated responses may occasionally contain
                        inaccuracies. Users are responsible for
                        reviewing emails, drafts, and calendar actions
                        before relying on them.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Yugoma shall not be held liable for losses,
                        damages, or consequences resulting from user
                        actions or reliance on AI-generated outputs.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        7. Governing Law
                    </h2>

                    <p className="leading-7 text-gray-700">
                        These Terms shall be governed and interpreted in
                        accordance with the laws of India.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Any disputes arising from the use of Yugoma
                        shall be subject to the jurisdiction of courts
                        located in India.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        8. Changes to Terms
                    </h2>

                    <p className="leading-7 text-gray-700">
                        We reserve the right to update these Terms from
                        time to time.
                    </p>

                    <p className="mt-4 leading-7 text-gray-700">
                        Continued use of Yugoma after changes are
                        published constitutes acceptance of the revised
                        Terms.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold">
                        9. Contact Us
                    </h2>

                    <p className="leading-7 text-gray-700">
                        For questions regarding these Terms or for
                        support, please contact:
                    </p>

                    <p className="mt-4 font-medium text-black">
                        Email: support@yugoma.com
                    </p>
                </section>
            </div>
        </main>
    );
}