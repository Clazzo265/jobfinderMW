import axios from "axios";
import type { JobsResponse } from "../types/job";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function searchJobs(
  query: string,
  location = "Malawi"
): Promise<JobsResponse> {
  const response = await axios.get<JobsResponse>(
    `${API_BASE_URL}/jobs`,
    {
      params: {
        q: query,
        location,
      },
    }
  );

  return response.data;
}