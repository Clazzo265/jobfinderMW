import { useState } from "react";
import { Search, MapPin } from "lucide-react";

import JobList from "./components/jobs/JobList";
import type { Job } from "./types/job";
import { searchJobs } from "./services/jobApi";

import "./App.css";

function App() {
  const [query, setQuery] = useState(
    "software developer"
  );

  const [location, setLocation] = useState(
    "Malawi"
  );

  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Please enter a job title or skill.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await searchJobs(
        query.trim(),
        location.trim() || "Malawi"
      );

      setJobs(result.jobs);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load jobs. Make sure the JobFinder MW server is running."
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <div className="brand">
            <div className="brand-mark">
              J
            </div>

            <div>
              <strong>JobFinder MW</strong>
              <span>Jobs for Malawi</span>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <span className="eyebrow">
            🇲🇼 JOBS FOR MALAWI
          </span>

          <h1>
            Find your next
            <span> opportunity.</span>
          </h1>

          <p>
            Discover jobs in Malawi and remote
            opportunities from across the world.
          </p>

          <form
            className="search-box"
            onSubmit={handleSearch}
          >
            <div className="search-field">
              <Search size={20} />

              <input
                type="text"
                placeholder="Job title, skill or keyword"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
              />
            </div>

            <div className="search-field">
              <MapPin size={20} />

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Searching..."
                : "Search jobs"}
            </button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <section className="jobs-section">
          <div className="section-header">
            <div>
              <span className="section-label">
                OPPORTUNITIES
              </span>

              <h2>
                Latest job opportunities
              </h2>
            </div>

            {jobs.length > 0 && (
              <span className="result-count">
                {jobs.length} jobs found
              </span>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Finding opportunities...</p>
            </div>
          ) : (
            <JobList jobs={jobs} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;