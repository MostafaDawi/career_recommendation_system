import { useRef, useState } from "react";
import "../pages/jobs.css";

// Add Job Modal Component
const AddJobModal = ({ onAddJob, onClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const skillInputRef = useRef(null);

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !salary || !description) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (Number(salary) <= 0) {
      setErrorMessage("Please enter a valid salary amount.");
      return;
    }

    const newJob = {
      title,
      location,
      salary: Number(salary),
      description,
      tags: skills.length > 0 ? skills : ["General"],
      jobType,
      companyName,
    };

    onAddJob(newJob);
    onClose();
  };

  const onSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div
      className="modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Add New Job
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-red-800 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} id="addJobForm" className="space-y-4">
          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Job Title <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job title"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job location"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Salary <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              min="0"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter salary"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Enter job description"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Job Type
            </span>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Company Name
            </span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company name"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">
              Contact Email
            </span>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter contact email"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700 font-medium mb-1">Skills</span>
            <input
              ref={skillInputRef}
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={onSkillKeyDown}
              placeholder="Type skill and press Enter"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center bg-indigo-100 text-indigo-700 text-sm font-medium rounded px-2 py-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-indigo-700 hover:text-indigo-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
