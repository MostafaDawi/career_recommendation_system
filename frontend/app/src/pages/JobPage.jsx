import React, { useEffect, useState } from "react";
import "./jobs.css";
import AddJobModal from "../components/AddJobModal";
import JobModal from "../components/JobModal";
import { useJobs } from "../utils/hooks";
import { ClipLoader } from "react-spinners";
import { getToken } from "../utils/auth";

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

const JobClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="icon">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const initialJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern JavaScript frameworks, ensuring high performance and responsive design across various devices and browsers. Work with React, TypeScript, and modern development tools in an agile environment.",
    salary: 95000,
    location: "San Francisco, CA",
    tags: ["React", "TypeScript", "CSS", "JavaScript", "Redux"],
  },
  {
    id: "2",
    title: "Data Scientist",
    description:
      "Join our data science team to extract insights from large datasets, build predictive models, and help drive data-driven decision making across the organization. You'll work with machine learning algorithms, statistical analysis, and big data technologies to solve complex business problems.",
    salary: 110000,
    location: "New York, NY",
    tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    description:
      "Create beautiful and intuitive user experiences for our web and mobile applications. Collaborate with product managers and developers to design user interfaces that are both functional and aesthetically pleasing. Experience with design systems and user research methodologies preferred.",
    salary: 85000,
    location: "Austin, TX",
    tags: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
  },
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern JavaScript frameworks, ensuring high performance and responsive design across various devices and browsers. Work with React, TypeScript, and modern development tools in an agile environment.",
    salary: 95000,
    location: "San Francisco, CA",
    tags: ["React", "TypeScript", "CSS", "JavaScript", "Redux"],
  },
  {
    id: "2",
    title: "Data Scientist",
    description:
      "Join our data science team to extract insights from large datasets, build predictive models, and help drive data-driven decision making across the organization. You'll work with machine learning algorithms, statistical analysis, and big data technologies to solve complex business problems.",
    salary: 110000,
    location: "New York, NY",
    tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    description:
      "Create beautiful and intuitive user experiences for our web and mobile applications. Collaborate with product managers and developers to design user interfaces that are both functional and aesthetically pleasing. Experience with design systems and user research methodologies preferred.",
    salary: 85000,
    location: "Austin, TX",
    tags: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
  },
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern JavaScript frameworks, ensuring high performance and responsive design across various devices and browsers. Work with React, TypeScript, and modern development tools in an agile environment.",
    salary: 95000,
    location: "San Francisco, CA",
    tags: ["React", "TypeScript", "CSS", "JavaScript", "Redux"],
  },
  {
    id: "2",
    title: "Data Scientist",
    description:
      "Join our data science team to extract insights from large datasets, build predictive models, and help drive data-driven decision making across the organization. You'll work with machine learning algorithms, statistical analysis, and big data technologies to solve complex business problems.",
    salary: 110000,
    location: "New York, NY",
    tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    description:
      "Create beautiful and intuitive user experiences for our web and mobile applications. Collaborate with product managers and developers to design user interfaces that are both functional and aesthetically pleasing. Experience with design systems and user research methodologies preferred.",
    salary: 85000,
    location: "Austin, TX",
    tags: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
  },
];

const JobPage = () => {
  const { jobs: careers, jobsError, isLoadingJobs } = useJobs();
  const jobsPerPage = 6;

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filters state
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minSalaryFilter, setMinSalaryFilter] = useState("");
  const [maxSalaryFilter, setMaxSalaryFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");

  useEffect(() => {
    if (careers) {
      setJobs(careers);
    }
  }, [careers]);
  console.log("Received Jobs: ", jobs?.length);

  // Add Job Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs?.length / jobsPerPage);

  // Filter jobs based on filters
  useEffect(() => {
    const title = titleFilter.toLowerCase();
    const location = locationFilter.toLowerCase();
    const minSalary = parseInt(minSalaryFilter) || 0;
    const maxSalary = parseInt(maxSalaryFilter) || Infinity;
    const tags = tagsFilter.toLowerCase().replace(/,/g, "").trim();

    const filtered = jobs?.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(title);
      const locationMatch = job.location
        ? job.location.toLowerCase().includes(location)
        : "N/A";
      const salaryMatch = job.salary >= minSalary && job.salary <= maxSalary;
      const tagsMatch = job.tags
        ? job.tags.some((tag) => tag.toLowerCase().includes(tags))
        : "N/A";
      return titleMatch && locationMatch && salaryMatch && tagsMatch;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    titleFilter,
    locationFilter,
    minSalaryFilter,
    maxSalaryFilter,
    tagsFilter,
    jobs,
  ]);

  // Pagination - get jobs for current page
  const jobsToShow = filteredJobs?.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Handlers
  const clearFilters = () => {
    setTitleFilter("");
    setLocationFilter("");
    setMinSalaryFilter("");
    setMaxSalaryFilter("");
    setTagsFilter("");
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const openModal = (job) => {
    setSelectedJob(job);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedJob(null);
    document.body.style.overflow = "auto";
  };

  const openAddJobModal = () => {
    if (getToken()) {
      setShowAddModal(true);
      document.body.style.overflow = "hidden";
    } else {
      alert("Please Sign in first");
    }
  };

  const closeAddJobModal = () => {
    setShowAddModal(false);
    document.body.style.overflow = "auto";
  };

  const addJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  // Format salary helper
  const formatSalary = (salary) =>
    salary ? `$${salary.toLocaleString()}` : "$ Salary not specified";

  // Apply to job handler
  const applyToJob = (job) => {
    if (job.id) {
      const subject = encodeURIComponent(
        `Application for ${job.title} position`
      );
      const body = encodeURIComponent(
        `Dear Hiring Manager,\n\nI am interested in applying for the ${
          job.title
        } position at ${job.companyName || "your company"} located in ${
          job.location
        }.\n\nPlease find my resume attached.\n\nBest regards,\n[Your Name]`
      );
      window.open(`mailto:${job.contactEmail}?subject=${subject}&body=${body}`);
    } else {
      alert(
        `Thank you for your interest in the ${job.title} position! The application feature will be available soon. Please check back later or contact the company directly.`
      );
    }
  };

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    tags: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const searchJob = () => {
    console.log("Submitted job search");
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="filters-card">
          <h3 className="filters-title">Filter Jobs</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Job Title</label>
              <input
                type="text"
                name="title"
                value={filters?.title}
                onChange={handleFilterChange}
                placeholder="Search by title..."
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input
                type="text"
                name="location"
                value={filters?.location}
                onChange={handleFilterChange}
                placeholder="Search by location..."
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Max Salary</label>
              <input
                type="text"
                name="maxSalary"
                value={filters?.maxSalary}
                onChange={handleFilterChange}
                placeholder="Search by max salary..."
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Min Salary</label>
              <input
                type="text"
                name="minSalary"
                value={filters?.minSalary}
                onChange={handleFilterChange}
                placeholder="Search by min salary..."
                className="filter-input"
              />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Skills/Tags</label>
            <input
              type="text"
              name="tags"
              value={filters?.tags}
              onChange={handleFilterChange}
              placeholder="Search by tags..."
              className="filter-input"
            />
          </div>
          {/* Search & Clear buttons with onClick handlers */}
          <div className="filter-buttons mt-8">
            <button className="btn btn-primary" onClick={searchJob}>
              Search
            </button>
            <button className="btn btn-clear" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        {/* Results Info */}
        <div className="results-info mb-4">
          {filteredJobs?.length > 0
            ? `Showing ${(currentPage - 1) * jobsPerPage + 1}-${Math.min(
                currentPage * jobsPerPage,
                filteredJobs?.length
              )} of ${filteredJobs?.length} jobs`
            : "No jobs found."}
        </div>
        {/* Jobs Grid */}
        <div className="jobs-grid">
          {!isLoadingJobs ? (
            jobsToShow?.map((job) => (
              <div
                key={job.id}
                className="job-card transform-transition duration-300 hover:scale-103"
                onClick={() => openModal(job)}
              >
                <div className="job-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    {job.companyName && (
                      <div className="job-info company-name">
                        {job.companyName}
                      </div>
                    )}
                    <div className="job-info location">
                      <LocationIcon />
                      {job.location ? job.location : "Not Specified"}
                    </div>
                    <div className="job-info salary">
                      {formatSalary(job.salary)}
                    </div>
                    {job.jobType && (
                      <div className="job-info job-type">
                        <JobClockIcon />
                        {job.jobType}
                      </div>
                    )}
                  </div>
                  <span
                    className="job-badge"
                    style={{
                      backgroundColor:
                        parseInt(job.id) >= 11 ? "#10b981" : undefined,
                      color: parseInt(job.id) >= 11 ? "white" : undefined,
                    }}
                  >
                    {parseInt(job.id) >= 11 ? "Just Added" : "New"}
                  </span>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-tags">
                  {job.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="job-tag">
                      {tag}
                    </span>
                  ))}
                  {job.tags?.length > 3 && (
                    <span className="job-tag">
                      +{job.tags?.length - 3} more
                    </span>
                  )}
                </div>

                <div className="job-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(job);
                    }}
                    className="view-details"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      applyToJob(job);
                    }}
                    className="apply-btn"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <ClipLoader />
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (pageNum) =>
                  pageNum >= currentPage - 2 && pageNum <= currentPage + 2
              )
              .map((pageNum) => (
                <button
                  key={pageNum}
                  className={`page-btn ${
                    pageNum === currentPage ? "active" : ""
                  }`}
                  onClick={() => changePage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* Add Job Button */}
        <button className="btn btn-primary" onClick={openAddJobModal}>
          Add Job
        </button>
        {/* Modals */}
        {selectedJob && <JobModal job={selectedJob} onClose={closeModal} />}
        {showAddModal && (
          <AddJobModal onAddJob={addJob} onClose={closeAddJobModal} />
        )}
      </div>
    </div>
  );
};
export default JobPage;
