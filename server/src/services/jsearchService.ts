import axios from "axios";
import type { Job } from "../types/job.js";

const JSEARCH_HOST =
  process.env.RAPIDAPI_HOST || "jsearch.p.rapidapi.com";

const JSEARCH_URL = "https://" + JSEARCH_HOST;

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string | null;

  job_city?: string | null;
  job_state?: string | null;
  job_country?: string | null;

  job_employment_type?: string | null;

  job_description?: string | null;

  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_salary_currency?: string | null;
  job_salary_period?: string | null;

  job_posted_at_datetime_utc?: string | null;

  job_is_remote?: boolean;

  job_apply_link?: string | null;

  job_publisher?: string | null;
}

interface JSearchResponse {
  status?: string;
  request_id?: string;

  parameters?: {
    query?: string;
    num_pages?: number;
    country?: string;
    language?: string;
  };

  data?: {
    jobs?: JSearchJob[];
    cursor?: string;
  };
}

export async function searchJobs(
  query: string,
  location = "Malawi",
  page = 1
): Promise<Job[]> {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY is not configured");
  }

  const searchQuery = `${query} in ${location}`;

  const response = await axios.get<JSearchResponse>(
    `${JSEARCH_URL}/search-v2`,
    {
      params: {
        query: searchQuery,
        country: "mw",
        num_pages: 1,
      },

      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": JSEARCH_HOST,
      },
    }
  );

  const jobs = response.data?.data?.jobs || [];

  return jobs.map((job): Job => ({
    id: job.job_id,

    title: job.job_title,

    companyName: job.employer_name,

    companyLogo:
      job.employer_logo || undefined,

    location: {
      city:
        job.job_city || undefined,

      state:
        job.job_state || undefined,

      country:
        job.job_country || undefined,
    },

    employmentType:
      job.job_employment_type || undefined,

    description:
      job.job_description || "",

    salary:
      job.job_min_salary != null ||
      job.job_max_salary != null
        ? {
            min:
              job.job_min_salary ?? undefined,

            max:
              job.job_max_salary ?? undefined,

            currency:
              job.job_salary_currency || undefined,

            period:
              job.job_salary_period || undefined,
          }
        : undefined,

    postedAt:
      job.job_posted_at_datetime_utc ||
      undefined,

    isRemote:
      Boolean(job.job_is_remote),

    applyUrl:
      job.job_apply_link || "",

    source:
      job.job_publisher || undefined,
  }));
}