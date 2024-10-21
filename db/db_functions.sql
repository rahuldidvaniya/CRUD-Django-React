
-- function to create a job
CREATE OR REPLACE FUNCTION public.create_job(
	p_title text,
	p_description text,
	p_job_type character varying,
	p_location text,
	p_company_name text,
	p_salary numeric,
	p_logo text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
   
    INSERT INTO public.job (title, job_type, location, company_name, posted_at, salary, logo, description)
    VALUES (p_title, p_job_type, p_location, p_company_name, CURRENT_TIMESTAMP, p_salary, p_logo, p_description);
    
 
END;
$BODY$;

ALTER FUNCTION public.create_job(text, text, character varying, text, text, numeric, text)
    OWNER TO postgres;


-- function to create a job application
CREATE OR REPLACE FUNCTION public.create_job_application(
	p_job_id bigint,
	p_full_name text,
	p_email text,
	p_education text,
	p_experience numeric,
	p_cover_letter text,
	p_resume_path text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    INSERT INTO public.job_application (job, full_name, email, education, experience, cover_letter, resume_path)
    VALUES (p_job_id, p_full_name, p_email, p_education, p_experience, p_cover_letter, p_resume_path);
END;
$BODY$;

ALTER FUNCTION public.create_job_application(bigint, text, text, text, numeric, text, text)
    OWNER TO postgres;


-- function to delete a job
CREATE OR REPLACE FUNCTION public.delete_job(
	p_job_id bigint)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
   DELETE FROM public.job WHERE id = p_job_id;
END;
$BODY$;

ALTER FUNCTION public.delete_job(bigint)
    OWNER TO rahul;



-- function to delete a job application
CREATE OR REPLACE FUNCTION public.delete_job_application(
	p_id bigint)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    DELETE FROM public.job_application
    WHERE id = p_id;
END;
	
$BODY$;

ALTER FUNCTION public.delete_job_application(bigint)
    OWNER TO rahul;



-- function to edit a job
CREATE OR REPLACE FUNCTION public.edit_job(
	p_id integer,
	p_title text,
	p_description text,
	p_job_type character varying,
	p_location text,
	p_company_name text,
	p_salary numeric)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    -- Update the job details in the job table
    UPDATE public.job
    SET title = p_title,
        description = p_description,
        job_type = p_job_type,
        location = p_location,
        company_name = p_company_name,
        salary = p_salary
    WHERE id = p_id;
    
    -- No return statement since we don't want to return anything
END;
$BODY$;

ALTER FUNCTION public.edit_job(integer, text, text, character varying, text, text, numeric)
    OWNER TO postgres;



-- function to get all job applications
CREATE OR REPLACE FUNCTION public.get_all_job_applications(
	)
    RETURNS TABLE(id bigint, job bigint, full_name text, email text, education text, experience text, cover_letter text, resume_path text, applied_at timestamp with time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT job_application.id, job_application.job, job_application.full_name, job_application.email, job_application.education, job_application.experience, job_application.cover_letter, job_application.resume_path, job_application.applied_at
    FROM public.job_application;
END;
$BODY$;

ALTER FUNCTION public.get_all_job_applications()
    OWNER TO postgres;


-- function to get all jobs
CREATE OR REPLACE FUNCTION public.get_all_jobs(
	)
    RETURNS TABLE(id bigint, title text, job_type character varying, location text, company_name text, posted_at timestamp with time zone, salary numeric, logo text, description text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
        job.id,
        job.title,
        job.job_type,
        job.location,
        job.company_name,
        job.posted_at,
        job.salary,
        job.logo,
        job.description
    FROM job;
END;
$BODY$;

ALTER FUNCTION public.get_all_jobs()
    OWNER TO rahul;