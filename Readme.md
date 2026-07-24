# CareerLens

CareerLens is a full-stack AI-powered interview preparation platform.  
Users can register/login, submit a job description plus resume (or self-description), and receive a personalized interview strategy with:
- match score
- technical and behavioral interview questions
- skill gaps
- day-wise preparation roadmap
- tailored resume PDF generation

It also includes a portfolio/contact module that sends messages via email.

---

## Project Overview

CareerLens helps candidates prepare smarter for interviews by combining:
- resume parsing
- LLM-based analysis (Google Gemini)
- structured report generation
- modern React UI for guided interview prep

The app is split into:
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB + Gemini API

---

## Features

- User authentication (register, login, logout, protected routes)
- Cookie-based JWT session handling
- Upload resume (PDF) + provide job description
- AI-generated interview report with strict JSON structure
- Technical and behavioral question breakdown with guidance
- Skill gap analysis with severity labels
- Multi-day preparation plan
- Generate tailored resume PDF using AI + Puppeteer
- View history of generated interview reports
- Portfolio contact form with Nodemailer email delivery
- Custom error page and responsive UI

---

## Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Tailwind CSS 4
- Vite

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT + bcryptjs
- Multer (file upload)
- pdf-parse
- @google/genai (Gemini)
- Puppeteer
- Nodemailer

---

## Folder Structure

```text
CareerLens/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── interview.controller.js
│   │   │   └── portfolio.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── blacklist.model.js
│   │   │   └── interviewReport.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── interview.route.js
│   │   │   └── portfolio.routes.js
│   │   └── services/
│   │       └── ai.services.js
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── public/
│   │   └── Resume.pdf
│   ├── src/
│   │   ├── App.jsx
│   │   ├── app.route.jsx
│   │   └── features/
│   │       ├── auth/
│   │       ├── interview/
│   │       ├── portfolio/
│   │       └── pages/
│   └── package.json
└── README.md
```

---

## Installation

### 1) Clone the repository
```bash
git clone https://github.com/Jatin3979/CareerLens.git
cd CareerLens
```

### 2) Install backend dependencies
```bash
cd Backend
npm install
```

### 3) Install frontend dependencies
```bash
cd ../Frontend
npm install
```

---

## Environment Variables

Create `Backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

> Security note: never commit real secrets. If secrets were ever committed, rotate them immediately.

Frontend currently uses hardcoded API base URL (`http://localhost:3000/api`) in service files and does not require a `.env` file right now.

---

## Running Locally

Open two terminals:

### Terminal 1: Start backend
```bash
cd Backend
npm run dev
```
Backend runs on: `http://localhost:3000`

### Terminal 2: Start frontend
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth
- `POST /auth/register` — register user
- `POST /auth/login` — login user (sets cookie token)
- `POST /auth/logout` — logout user (blacklists token)
- `GET /auth/profile` — get current user profile (**auth required**)

### Interview
- `POST /interview/` — generate interview report from resume + inputs (**auth required**, multipart form-data with `resume`)
- `GET /interview/` — get all reports of current user (**auth required**)
- `GET /interview/report/:interviewId` — get report by ID (**auth required**)
- `POST /interview/resume/pdf/:interviewId` — generate/download tailored resume PDF (**auth required**)

### Portfolio
- `POST /portfolio/contact` — send contact form email

---

## Architecture

```text
[React Frontend]
   |
   | Axios (withCredentials)
   v
[Express API Layer]
   |-- Auth Routes -> JWT + Cookie + Blacklist
   |-- Interview Routes -> Multer -> PDF Parse -> Gemini -> MongoDB
   |-- Portfolio Routes -> Nodemailer
   v
[MongoDB]
```

---

## AI Workflow

1. User submits:
   - job description
   - self-description (optional)
   - resume file (PDF)
2. Backend validates auth + file/body.
3. Resume content is extracted using `pdf-parse`.
4. Prompt is created in `ai.services.js`.
5. Gemini generates a structured JSON interview report (schema-constrained).
6. Report is saved in MongoDB (`InterviewReport` model).
7. Frontend renders:
   - match score
   - technical questions
   - behavioral questions
   - skill gaps
   - preparation roadmap
8. On resume export, Gemini generates ATS-friendly HTML -> Puppeteer converts to PDF.

---

## Deployment

No deployment config files are currently present in the repository.  
Recommended deployment split:

- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway / Fly.io
- **Database**: MongoDB Atlas

Production checklist:
- move API URLs to environment variables
- set secure CORS origin
- use secure cookie settings in production
- rotate and manage secrets via hosting platform secret manager

---

## Screenshots

Add screenshots to an `assets/screenshots` folder and replace placeholders below:

```md
![Login Page](assets/screenshots/login.png)
![Home - Generate Interview Plan](assets/screenshots/home.png)
![Interview Report](assets/screenshots/interview-report.png)
![Contact Page](assets/screenshots/contact.png)
```

---

## Future Improvements

- Add frontend env support (`VITE_API_BASE_URL`) and remove hardcoded URLs
- Add refresh token flow / stronger auth session management
- Add input schema validation (e.g., Zod) at API boundaries
- Support DOCX parsing directly (currently optimized around PDF parsing flow)
- Add automated tests (unit + integration + e2e)
- Add CI/CD workflow
- Add role-based dashboards and analytics
- Add report sharing/export options beyond PDF

---

## License

ISC (as defined in `Backend/package.json`).

---

## Author

**Jatin Kumar**  
GitHub: [@Jatin3979](https://github.com/Jatin3979)
