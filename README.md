# Job Portal - Django & React CRUD Application

This project is a full-stack job portal application that allows users to perform CRUD (Create, Read, Update, Delete) operations on job listings. It is built using Django for the backend and React for the frontend, with PostgreSQL as the database.

## Features

- Add, update, view, and delete job listings.
- Display job details, including company logo.
- Download resumes associated with jobs.
- REST API integration for seamless frontend-backend communication.
- Uses Axios for API requests from the React frontend.

## Tech Stack

- Backend: Django with PostgreSQL
- Frontend: React.js
- Database: PostgreSQL
- API Requests: Axios

## Installation

### Backend (Django)

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up PostgreSQL and configure your `settings.py`:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': '<your_db_name>',
           'USER': '<your_db_user>',
           'PASSWORD': '<your_db_password>',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

4. Run database migrations:

   ```bash
   python manage.py migrate
   ```

5. Start the Django server:

   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Run the frontend development server:

   ```bash
   npm start
   ```

### Setting Up PostgreSQL Functions

To properly use this project, you must create the necessary PostgreSQL functions used for managing job records (e.g., getjobs, editJob, deleteJob, and addJob). Follow these steps to set up the required functions:

1. Ensure PostgreSQL is running and connected to your database.

2. Open a terminal and connect to your PostgreSQL database:

   ```bash
   psql -U <your_db_user> -d <your_db_name>
   ```

3. Run the provided SQL script `db_functions.sql` to create the required functions:

   ```bash
   \i path/to/db/db_functions.sql
   ```

### PostgreSQL Functions

The `db_functions.sql` file includes the following functions:

- `create_job`: Inserts a new job into the job table with details such as title, job type, location, company name, salary, and logo.
- `edit_job`: Updates a specific job record based on job ID, modifying fields like title, description, job type, location, company name, and salary.
- `delete_job`: Deletes a job from the job table by its ID.
- `create_job_application`: Inserts a new job application into the job_application table with details such as job ID, applicant's name, email, education, experience, cover letter, and resume path.
- `delete_job_application`: Deletes a specific job application from the job_application table by its ID.
- `get_all_jobs`: Retrieves all job listings from the job table, including details like job title, type, location, company name, posting date, salary, logo, and description.
- `get_all_job_applications`: Retrieves all job applications from the job_application table, including details such as the job ID, applicant's name, email, education, experience, cover letter, and resume path.

Once these functions are created, the application will use them to interact with job and job application records.

### Database Structure

The PostgreSQL database uses a table called `api_job` to store job information such as id, title, description, location, and logo.

### Usage

- Visit http://localhost:3000 to interact with the React frontend.
- Use the job form to add new jobs, update existing ones, and delete them.
- View all job listings along with company logos, and download attached resumes.

### API Endpoints

The API endpoints are built using Django REST framework and accessed via Axios in the frontend.

- `GET /api/jobs/`: Retrieve all job listings.
- `POST /api/jobs/`: Create a new job listing.
- `PUT /api/jobs/:id/`: Update a job listing.
- `DELETE /api/jobs/:id/`: Delete a job listing.

### Folder Structure

my-django-react-crud-app/
├── backend/
├── frontend/
├── db/
│   └── db_functions.sql
└── README.md

