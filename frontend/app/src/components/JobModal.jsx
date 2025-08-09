import "../pages/jobs.css";

// SVG Icons as components for reuse
const LocationIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="icon">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const SalaryIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="icon">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

// Job Modal Component
const JobModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div
      className="modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content mx-64">
        <div className="modal-header">
          <div>
            <h2 className="font-bold text-2xl">{job.title}</h2>
            <div className="flex gap-2 items-center py-2">
              <LocationIcon />
              {job.location}
              {job.companyName && <> • {job.companyName}</>}
              {job.jobType && <> • {job.jobType}</>}
            </div>
            <div className="flex gap-2 items-center py-2">
              <SalaryIcon />
              {job.salary
                ? `${job.salary.toLocaleString()}`
                : "Salary not specified"}
              {job.datePosted && <> • Posted {job.datePosted}</>}
            </div>
          </div>
        </div>

        {job.tags && job.tags.length > 0 && (
          <div className="modal-body">
            <p>{job.description}</p>
            <h4>Required Skills</h4>
            <div>
              {job.tags.map((tag, idx) => (
                <span key={idx} className="job-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div class="flex gap-5 p-4">
          <button class="btn btn-primary">Apply Now</button>
          <button class="btn btn-secondary">Save Job</button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
