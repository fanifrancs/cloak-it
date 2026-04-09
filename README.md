# Cloak it

Cloak it is an anonymous messaging web app built with Node.js, Express, EJS, and Supabase. It lets users create an account, share a personal message link, and receive anonymous messages in a private dashboard.

The project is designed to stay simple and approachable. The current focus is a clean full-stack foundation: session-based authentication, anonymous message delivery, a private inbox experience, and a polished glass-style interface.

## Features

- Create an account with a unique username
- Login with session-based authentication
- Share a personalized public message link
- Receive anonymous messages in a private dashboard
- Delete messages from the dashboard
- Change account password
- View legal modals for Privacy Policy and Terms of Use
- Responsive UI for desktop and mobile

## Tech Stack

- Node.js
- Express
- EJS
- Supabase
- express-session
- connect-flash
- Bootstrap 5

## Project Structure

```text
cloak-it/
├── controllers/    # Request handlers
├── db/             # Supabase client and SQL schema
├── middlewares/    # Authentication middleware
├── public/         # Static CSS, JS, and image assets
├── routes/         # Express route definitions
├── services/       # Business logic and database operations
├── views/          # EJS templates and shared partials
├── server.js       # App entry point
└── package.json
```

## How It Works

### Authentication

User accounts are managed with Supabase Auth. The app maps each username to an internal email format like `username@cloakit.io` so users can login with a simple username/password flow while Supabase still handles credential storage securely.

Express sessions are used to keep authenticated users logged in while they interact with the dashboard and account pages.

### Anonymous Messaging

Each registered user has a public route in the format:

```text
/:username/message
```

Visitors can use that page to send anonymous messages. Those messages are stored in Supabase and later displayed in the recipient's dashboard.

### Data Model

The app currently uses two main tables:

- `profiles`: stores the public username linked to the authenticated Supabase user
- `messages`: stores anonymous messages sent to each recipient

The schema also enables row-level security for protected message access while still allowing public inserts for anonymous sending.

## Getting Started

### 1. Clone the project

```bash
git clone <your-repo-url>
cd cloak-it
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SESSION_SECRET=your_session_secret
PORT=5000
```

### 4. Set up the database

Run the SQL in [db/schema.sql](./db/schema.sql) in your Supabase SQL editor.

### 5. Start the app

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Available Scripts

- `npm run dev`: starts the app with nodemon
- `npm start`: starts the app with Node.js

## Current Status

Cloak it is functional and actively being refined. The codebase follows a simple Express structure with a clear split between:

- routes for endpoint wiring
- controllers for request handling
- services for business logic and Supabase access

This makes the project a good candidate for continued iteration and contribution.

## Contributing

Contributions are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a new branch for your change
3. Make your update with clear, focused commits
4. Open a pull request with a short explanation of the change

Issues are also very welcome. You can open an issue for:

- bug reports
- UI polish ideas
- accessibility improvements
- backend optimizations
- security hardening suggestions
- performance improvements
- developer experience improvements
- feature requests

When opening an issue, it helps to include:

- a clear description of the problem or idea
- steps to reproduce, if it is a bug
- screenshots or screen recordings for UI issues
- expected behavior and actual behavior

Small, focused pull requests are preferred over large disruptive changes.

## Roadmap Ideas

- better message moderation and abuse prevention
- copy/share improvements for public links
- richer dashboard interactions
- improved validation and testing
- deployment documentation
- account recovery flow

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
