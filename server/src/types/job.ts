export interface Job {
  id: string;

  title: string;

  companyName: string;

  companyLogo?: string;

  location: {
    city?: string;
    state?: string;
    country?: string;
  };

  employmentType?: string;

  description: string;

  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };

  postedAt?: string;

  isRemote: boolean;

  applyUrl: string;

  source?: string;
}

export interface JobSearchResult {
  jobs: Job[];
  nextCursor?: string;
}