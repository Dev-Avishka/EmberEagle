# 🦅 EmberEagle

> **A fun fact before you dive in:** I was 13 years old when I built this project. Yes, really! EmberEagle is one of my earliest full-stack projects, and I'm proud of what I put together at that age.

## What is EmberEagle?

EmberEagle is a simple social media web application built with Node.js and Express on the backend and plain HTML, CSS, and JavaScript on the frontend. It lets users register, log in, create posts with images and videos, and browse a feed of posts from other users.

---

## Features

- **User Registration** — Sign up with a username, password, and optional profile picture
- **User Login** — Authenticate with your credentials
- **Create Posts** — Share posts with captions, images, and videos
- **Post Feed** — Browse all posts from the community
- **Profile Pictures** — Each user gets a profile picture (defaults to a placeholder if none is uploaded)

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Runtime    | Node.js                             |
| Framework  | Express.js                          |
| File I/O   | fs-extra                            |
| Uploads    | Multer                              |
| Security   | Node.js `crypto` (user ID gen)      |
| Frontend   | HTML, CSS, Vanilla JavaScript       |
| Data Store | JSON files (users.json, post files) |

---

## Project Structure

```
EmberEagle/
├── public/
│   ├── index.html          # Landing / login page
│   ├── register.html       # Registration page
│   ├── home.html           # Main feed
│   ├── createpost.html     # Create a new post
│   ├── luser.html          # User profile page
│   ├── posts/              # JSON files for each post
│   ├── uploads/            # Uploaded post images & videos
│   └── ppics/              # Profile pictures
├── server.js               # Express server & API routes
├── users.json              # User data store
├── package.json
└── README.md
```

---

## API Endpoints

| Method | Route                  | Description                        |
|--------|------------------------|------------------------------------|
| POST   | `/login`               | Log in with username & password    |
| POST   | `/register`            | Register a new user                |
| GET    | `/username/:userId`    | Get a username by user ID          |
| GET    | `/userprpic/:userId`   | Get a user's profile picture path  |
| GET    | `/posts`               | Fetch all posts                    |
| POST   | `/create-post`         | Create a new post (with media)     |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Dev-Avishka/EmberEagle.git
cd EmberEagle

# Install dependencies
npm install
```

### Running the App

```bash
node server.js
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## A Note from the Developer

I started building EmberEagle when I was **13 years old** as a way to learn web development and understand how social media platforms work under the hood. It's far from perfect, but it was an awesome learning experience. From setting up an Express server to handling file uploads and building a frontend from scratch — every part of this project taught me something new.

If you're also young and just getting started with coding: keep going. Projects like this are how you grow. 🚀

---

## License

This project is licensed under the ISC License — see the [LICENSE](LICENSE) file for details.
