export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white px-6 py-16">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-4xl font-bold text-black">
                    Privacy Policy
                </h1>

                <p className="mb-10 text-sm text-gray-500">
                    Last Updated: June 21, 2026
                </p>

                <p className="mb-8 text-gray-700 leading-7">
                    At Yugoma, we value your trust and are committed to
                    protecting your privacy. This Privacy Policy describes
                    how we handle, process, and protect your information
                    when you use our website, application, and AI
                    productivity services.
                </p>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        1. Google API Scopes & OAuth Integration
                    </h2>

                    <p className="mb-4 text-gray-700 leading-7">
                        Yugoma integrates directly with your Google Account
                        (Gmail and Google Calendar) using official Google
                        OAuth 2.0 credentials. Our service requires
                        specific scopes to function as an AI productivity
                        assistant.
                    </p>

                    <div className="space-y-4 text-gray-700 leading-7">
                        <div>
                            <h3 className="font-medium text-black">
                                Gmail Scopes
                            </h3>

                            <p>
                                Used to fetch, search, organize, compose,
                                draft, and send emails on behalf of the
                                user.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-black">
                                Google Calendar Scopes
                            </h3>

                            <p>
                                Used to view, synchronize, create, update,
                                and manage calendar events.
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-7">
                        <strong>Important:</strong> Yugoma does not sell,
                        share, or use Gmail or Calendar data for
                        advertising purposes. User data is accessed only
                        to perform actions explicitly requested by the
                        user through the application.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        2. Information We Collect
                    </h2>

                    <ul className="list-disc space-y-3 pl-6 text-gray-700 leading-7">
                        <li>
                            <strong>Account Data:</strong> Name, email
                            address, and authentication information.
                        </li>

                        <li>
                            <strong>Integration Tokens:</strong> OAuth
                            access and refresh tokens required to
                            communicate securely with Google APIs on your
                            behalf.
                        </li>

                        <li>
                            <strong>Usage Metadata:</strong> Basic
                            information required to maintain service
                            functionality and improve user experience.
                        </li>
                    </ul>

                    <p className="mt-5 text-gray-700 leading-7">
                        OAuth credentials are transmitted securely and
                        stored using industry-standard security practices.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        3. How We Use Your Information
                    </h2>

                    <ul className="list-disc space-y-3 pl-6 text-gray-700 leading-7">
                        <li>Provide and maintain your Yugoma workspace.</li>

                        <li>
                            Enable AI-powered email and calendar
                            assistance.
                        </li>

                        <li>
                            Process commands requested by the user.
                        </li>

                        <li>
                            Improve reliability and overall user
                            experience.
                        </li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        4. Data Sharing and Third Parties
                    </h2>

                    <p className="mb-4 text-gray-700 leading-7">
                        Yugoma does not sell, trade, or share user data
                        with advertisers or data brokers.
                    </p>

                    <p className="mb-4 text-gray-700 leading-7">
                        User information may only be processed by:
                    </p>

                    <ul className="list-disc space-y-3 pl-6 text-gray-700 leading-7">
                        <li>
                            <strong>Google Services:</strong> Through
                            official OAuth and Google API endpoints.
                        </li>

                        <li>
                            <strong>AI Processing Providers:</strong>
                            AI models may receive only the minimum context
                            necessary to fulfill user requests. User data
                            is not used for advertising purposes.
                        </li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-semibold">
                        5. Data Security and Deletion
                    </h2>

                    <p className="mb-4 text-gray-700 leading-7">
                        We implement reasonable security measures to
                        protect user information.
                    </p>

                    <p className="text-gray-700 leading-7">
                        Users may revoke Google access at any time through
                        their Google Account security settings.
                        Disconnecting an integration immediately prevents
                        Yugoma from accessing Gmail or Calendar data
                        associated with that account.
                    </p>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold">
                        6. Contact Information
                    </h2>

                    <p className="text-gray-700 leading-7">
                        For privacy-related questions or data deletion
                        requests, please contact:
                    </p>

                    <p className="mt-4 font-medium text-black">
                        Email: kumawatankur48@gmail.com
                    </p>
                </section>
            </div>
        </main>
    );
}