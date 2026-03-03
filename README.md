# CheeseWizz

A fullstack cheese data finder application.

## Structure

```
CheeseWizz/
├── Client/          # React + Vite frontend (Cheese Finder UI)
└── Server/          # Express + Mongoose backend (Contacts API)
```

## Quick Start

### Server
```bash
cd Server
cp .env.example .env   # fill in your MongoDB URI
npm install
npm run dev
```

### Client
```bash
cd Client
cp .env.example .env   # add optional API keys
npm install
npm run dev
```

## Stack
- **Client:** React 18, Vite, Tailwind CSS
- **Server:** Node.js, Express 4, Mongoose 8, MongoDB

## API Endpoints (Server)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/contacts` | Get all contacts (paginated) |
| POST | `/v1/contacts` | Create a contact |
| GET | `/v1/contacts/:id` | Get contact by ID |
| PUT | `/v1/contacts/:id` | Update contact by ID |
| DELETE | `/v1/contacts/:id` | Delete contact by ID |
