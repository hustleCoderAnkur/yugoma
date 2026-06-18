# Yugoma

Yugoma is an AI-powered productivity workspace that helps users manage emails, calendars, and daily tasks through natural language. It combines authentication, AI agents, and productivity tools into a single interface to reduce app switching and improve workflow efficiency.

## Features

* Secure user authentication
* JWT access and refresh tokens
* AI chat interface
* Email workflow support
* Calendar integration architecture
* Change password functionality
* User profile page
* Responsive modern UI
* Type-safe APIs with tRPC
* PostgreSQL database with Drizzle ORM

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* tRPC
* PostgreSQL
* Drizzle ORM
* JWT
* bcrypt
* OpenAI Agents
* Corsair Integrations

## Project Structure

```text
src/
├── app/
├── components/
├── lib/
├── server/
│   ├── api/
│   ├── db/
│   ├── services/
│   └── utils/
├── trpc/
└── env.js
```

## Installation

Clone the repository:

```bash
git clone https://github.com/hustleCoderAnkur/yugoma.git
cd yugoma
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
OPENAI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CORSAIR_KEK=
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run db:generate
npm run db:push
npm run db:migrate
```

## Authentication

Yugoma uses:

* bcrypt for password hashing
* JWT access tokens
* JWT refresh tokens

## Deployment

Frontend and backend are deployed using Vercel.

## Future Improvements

* Gmail integration
* Google Calendar integration
* Real AI execution
* Multi-agent workflows
* Notifications and reminders
* Analytics dashboard

## Author

**Ankur Kumawat**

GitHub: https://github.com/hustleCoderAnkur
