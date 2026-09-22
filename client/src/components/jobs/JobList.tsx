import type { Job } from "../../types/job";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({
  jobs,
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h2>No jobs found</h2>

        <p>
          Try another job title, skill, or location.
        </p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}