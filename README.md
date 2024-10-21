# Job Portal - Django & React CRUD Application

## Overview

This project is a comprehensive full-stack job portal application that facilitates CRUD (Create, Read, Update, Delete) operations on job listings. The application is built using Django for the backend, React for the frontend, and PostgreSQL as the database management system.

## Key Features

- Robust job listing management (Create, Read, Update, Delete)
- Detailed job information display
- Seamless REST API integration for efficient frontend-backend communication

## Technology Stack

- Backend: Django and Django REST Framework
- Frontend: React.js
- Database: PostgreSQL

## Installation and Setup

### Backend (Django)

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/rahuldidvaniya/crud-django-react.git
   cd backend
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure PostgreSQL in `settings.py`:

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

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Launch the Django development server:

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

3. Start the React development server:

   ```bash
   npm start
   ```

### PostgreSQL Configuration

To ensure proper functionality, it's crucial to set up the necessary PostgreSQL tables and functions for job record management. Follow these steps:

1. Ensure PostgreSQL is running and connected to your database.

2. Connect to your PostgreSQL database via terminal:

   ```bash
   psql -U <your_db_user> -d <your_db_name>
   ```

3. Execute the provided SQL script to create required functions:

   ```bash
   \i path/to/db/db_functions.sql
   ```

### PostgreSQL Function Overview

The `db_functions.sql` file includes the following essential functions and table creation scripts:

- Table creation:
  - `CREATE TABLE job`: Creates the job table
  - `CREATE TABLE job_application`: Creates the job application table

- Functions:
  - `create_job`: Inserts a new job record
  - `edit_job`: Updates an existing job record
  - `delete_job`: Removes a job record
  - `create_job_application`: Inserts a new job application
  - `delete_job_application`: Removes a job application
  - `get_all_jobs`: Retrieves all job listings
  - `get_all_job_applications`: Retrieves all job applications

These tables and functions are integral to the application's interaction with job and job application records.

## Usage

- Access the React frontend at http://localhost:3000
- Utilize the job management interface to add, update, and delete job listings
- View comprehensive job listings, including company logos
- Download attached resumes for job applications

## API Endpoints

The application exposes the following RESTful API endpoints:

- `GET /api/job/`: Retrieve all job listings or create a new listing
- `DELETE /api/job/<int:pk>/`: Delete a specific job listing
- `PUT /api/job/<int:pk>/edit/`: Update a specific job listing
- `GET /api/job-applications/`: Create a new job application
- `DELETE /api/applications/<int:pk>/`: Delete a specific job application
- `GET /api/resumes/<str:filename>/`: Download a specific resume

These endpoints are implemented using Django REST Framework and accessed via Axios in the frontend.
