import {
  MapPin,
  Briefcase,
  ExternalLink,
  Clock,
} from "lucide-react";

import type { Job } from "../../types/job";

interface JobCardProps {
  job: Job;
}

function formatDate(dateString?: string) {
  if (!dateString) {
    return "Recently posted";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently posted";
  }

  return new Intl.DateTimeFormat("en-MW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatLocation(job: Job) {
  const parts = [
    job.location.city,
    job.location.state,
    job.location.country,
  ].filter(Boolean);

  if (parts.length === 0) {
    return "Location not specified";
  }

  return parts.join(", ");
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-card-header">
        <div className="company-logo">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
            />
          ) : (
            <span>
              {job.companyName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="job-card-title">
          <h2>{job.title}</h2>

          <p className="company-name">
            {job.companyName}
          </p>
        </div>
      </div>

      <div className="job-meta">
        <span>
          <MapPin size={16} />
          {job.isRemote
            ? "Remote"
            : formatLocation(job)}
        </span>

        {job.employmentType && (
          <span>
            <Briefcase size={16} />
            {job.employmentType}
          </span>
        )}

        <span>
          <Clock size={16} />
          {formatDate(job.postedAt)}
        </span>
      </div>

      {job.description && (
        <p className="job-description">
          {job.description.slice(0, 240)}
          {job.description.length > 240
            ? "..."
            : ""}
        </p>
      )}

      <div className="job-card-footer">
        <span className="job-source">
          {job.source || "JobFinder MW"}
        </span>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-button"
        >
          Apply
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}