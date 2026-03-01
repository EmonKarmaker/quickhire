# QuickHire — Job Board Application

A full-stack mini job board application built with **React.js** (Vite) for the frontend and **Node.js/Express** for the backend. Users can browse job listings, search/filter jobs, view details, and submit applications. An admin panel allows posting and managing job listings.

> UI designed based on the provided Figma template with matching layout, typography (Clash Display + Epilogue), color scheme (#4640DE primary), spacing, and overall look.

---

## Features

### Frontend
- **Landing Page** — Hero section with search, category exploration, featured jobs grid, latest jobs list, CTA banner, footer
- **Job Listings Page** — Search by keyword/location, filter by category and job type, responsive grid with animated cards
- **Job Detail Page** — Full job description with formatted sections, company sidebar, Apply Now form
- **Apply Form** — Name, Email, Resume URL, Cover Note with client + server validation, success/error feedback
- **Admin Panel** — Dashboard stats, job CRUD (create via modal, delete with confirmation), applications viewer with expandable details
- **Responsive** — Mobile-first design with hamburger nav, slide-out filter panel, adaptive grids
- **UX Polish** — Loading spinners, toast notifications, fade-in animations, empty states, active filter pills

### Backend
- RESTful API with proper validation and error handling
- Job CRUD operations (Create, Read, Delete)
- Application submission with job existence verification
- Search by keyword, filter by category/location/type
- Categories endpoint with job counts
- JSON file-based storage (portable, no database setup required)
- 18 pre-seeded job listings matching the Figma design

---

## Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Frontend   | React 19, Vite 7, React Router 7              |
| Styling    | Tailwind CSS 4, Custom CSS Variables           |
| Fonts      | Clash Display, Epilogue (Google Fonts)         |
| Icons      | React Icons (Heroicons)                        |
| HTTP       | Axios                                          |
| Backend    | Node.js, Express 5                             |
| Validation | express-validator                              |
| Database   | JSON file storage (jobs.json, applications.json)|
| IDs        | UUID v4                                        |

---

## Project Structure

```
quickhire/
├── backend/
│   ├── config/
│   │   └── database.js          # DB init, seed data, read/write helpers
│   ├── data/
│   │   ├── jobs.json            # Job listings data (auto-seeded)
│   │   └── applications.json    # Applications data
│   ├── routes/
│   │   ├── jobs.js              # GET/POST/DELETE /api/jobs
│   │   └── applications.js      # GET/POST /api/applications
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── JobCard.jsx          # Reusable job card component
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx             # Hero section with search
│   │   │   │   ├── CompanyLogos.jsx     # Partner logos banner
│   │   │   │   ├── CategorySection.jsx  # 8-category grid
│   │   │   │   ├── CTABanner.jsx        # Start posting jobs CTA
│   │   │   │   ├── FeaturedJobs.jsx     # Featured jobs grid
│   │   │   │   └── LatestJobs.jsx       # Latest jobs list
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx           # Sticky nav with mobile menu
│   │   │       └── Footer.jsx           # Dark footer with newsletter
│   │   ├── pages/
│   │   │   ├── HomePage.jsx             # Landing page
│   │   │   ├── JobsPage.jsx             # Job listings + search/filter
│   │   │   │   JobDetailPage.jsx        # Job detail + apply form
│   │   │   └── AdminPage.jsx            # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js                   # Axios API service layer
│   │   ├── App.jsx                      # Router setup
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Tailwind + custom styles
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (recommended v20+)
- **npm** v9+

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start the Backend Server

```bash
cd ../backend
node server.js
```

The API will run on **http://localhost:5000**. The database is auto-seeded with 18 job listings on first run.

### 5. Start the Frontend Dev Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on **http://localhost:3000** with API proxy to the backend.

### 6. Open the Application

Visit **http://localhost:3000** in your browser.

### Production Build

```bash
cd frontend
npm run build
```

The built files are output to `frontend/dist/`. The backend server automatically serves these static files, so in production you only need:

```bash
cd backend
node server.js
# Visit http://localhost:5000
```

---

## API Endpoints

### Jobs

| Method | Endpoint               | Description                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/jobs`            | List all jobs (with optional filters) |
| GET    | `/api/jobs/:id`        | Get single job details                |
| POST   | `/api/jobs`            | Create a new job (Admin)              |
| DELETE | `/api/jobs/:id`        | Delete a job (Admin)                  |
| GET    | `/api/jobs/categories` | Get categories with job counts        |

**Query Parameters for GET /api/jobs:**

| Param      | Description                               |
|------------|-------------------------------------------|
| `search`   | Search in title, company, description     |
| `category` | Filter by category (exact match)          |
| `location` | Filter by location (partial match)        |
| `type`     | Filter by job type (exact match)          |

### Applications

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| POST   | `/api/applications`  | Submit a job application       |
| GET    | `/api/applications`  | List all applications (Admin)  |

**POST /api/applications Body:**

```json
{
  "job_id": "job_001",
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://linkedin.com/in/johndoe",
  "cover_note": "I am interested in this position..."
}
```

### Health Check

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | `/api/health` | API health status |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable   | Default       | Description     |
|------------|---------------|-----------------|
| `PORT`     | `5000`        | API server port |
| `NODE_ENV` | `development` | Environment     |

### Frontend (`frontend/.env`)

| Variable       | Default | Description                          |
|----------------|---------|--------------------------------------|
| `VITE_API_URL` | `/api`  | API base URL (uses proxy in dev)     |

---

## Pages Overview

| Route       | Page            | Description                                              |
|-------------|-----------------|----------------------------------------------------------|
| `/`         | Home            | Landing page with hero, categories, featured/latest jobs |
| `/jobs`     | Job Listings    | Searchable, filterable job grid                          |
| `/jobs/:id` | Job Detail      | Full description + Apply Now form                        |
| `/admin`    | Admin Dashboard | Create/delete jobs, view applications                    |

---

## Design Implementation

The UI closely follows the provided Figma template:

- **Typography**: Clash Display (headings), Epilogue (body text)
- **Primary Color**: `#4640DE` (indigo/purple)
- **Accent Colors**: `#26A4FF` (blue), `#FFB836` (yellow), `#56CDAD` (green), `#FF6550` (red)
- **Dark Theme**: Footer `#202430`
- **Layout**: Max-width 1192px container, consistent 8px spacing grid
- **Components**: Category cards with hover fill, job cards with company logos and colored tags, dark footer with newsletter subscription
- **Responsive**: Mobile hamburger nav, stacked grids, floating filter button on mobile

---

## Validation

All input fields are validated on both client and server side:

- **Name**: Required, trimmed
- **Email**: Required, valid email format
- **Resume Link**: Required, valid URL format
- **Cover Note**: Required, trimmed
- **Job fields**: Title, Company, Location, Category, Type, Description — all required

---

## Author

Built as a technical assessment for Associate Software Engineer position.
