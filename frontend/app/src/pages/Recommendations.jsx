import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CareerCard from "../components/CareerCard";
import FloatingElements from "../components/FloatingElements";
import CareerModal from "../components/CareerModal";
import { fetchRecommendations } from "../utils/apiFetching";
import { ClipLoader } from "react-spinners";
import {
  FaLaptopCode,
  FaDatabase,
  FaCodeBranch,
  FaMicrochip,
} from "react-icons/fa";

const icons = [
  <FaLaptopCode />,
  <FaDatabase />,
  <FaCodeBranch />,
  <FaMicrochip />,
];

const gradientColors = [
  "from-pink-500 to-yellow-500",
  "from-green-400 to-blue-500",
  "from-purple-500 to-indigo-500",
  "from-red-400 to-orange-500",
  "from-cyan-400 to-sky-500",
  "from-emerald-400 to-lime-500",
];

const Recommendations = () => {
  const [openModal, setOpenModal] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  console.log(user);
  const authorize_and_ready =
    isAuthenticated &&
    user?.description !== undefined &&
    user?.interests !== undefined &&
    user?.personality !== undefined &&
    user?.skills !== undefined;

  const {
    data: recommended_jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recommendations"],
    enabled: authorize_and_ready, // استدعي الطلب بس لو المستخدم مسجل دخول
    queryFn: () => fetchRecommendations(user),
  });

  useEffect(() => {
    if (Array.isArray(recommended_jobs?.data) && !isError) {
      setCareers([...recommended_jobs?.data].sort((a, b) => b.score - a.score));
    }
  }, [user, recommended_jobs, isError]);

  if (!authorize_and_ready) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg mb-4">
          Please complete your profile to see recommendations.
        </p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => navigate("/profile")}
        >
          Go to Profile Page
        </button>
      </div>
    );
  }

  const careersWithUI = careers?.map((career) => ({
    ...career,
    color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
  }));

  console.log("Retrieved Jobs: ", recommended_jobs?.data);

  if (isError)
    return (
      <div className="flex justify-center items-center text-center mt-50 text-red-500">
        {error.message}
      </div>
    );

  // باقي الكود عادي
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <FloatingElements />
      <div className="container mx-auto px-6 py-8 relative z-10">
        <Header />
        {isLoading || recommended_jobs?.data === undefined ? (
          <div className="flex justify-center gap-4 items-center text-center mt-5">
            <ClipLoader />
            Fetching Recommended Job...
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Top Match */}
            {careersWithUI?.map((career) => {
              console.log(career?.score);
              if (career?.score > 0.5) {
                return (
                  <div key={career.id} className="mb-12">
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center px-6 py-3 bg-yellow-400 text-yellow-900 rounded-full font-bold text-lg">
                        🏆 Best Matches-
                        {(career?.score * 100).toFixed(0)}% Compatibility
                      </span>
                    </div>

                    <CareerCard
                      career={career}
                      onClick={() => setOpenModal(career.id)}
                      isTopMatch
                    />
                  </div>
                );
              } else {
                return "";
              }
            })}

            {/* Other Matches */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Great Matches
              </h3>
              <p className="text-purple-600">
                Explore these alternative career paths that align with your
                skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {careersWithUI?.map((career) =>
                career?.score < 0.5 ? (
                  <CareerCard
                    key={career.id}
                    career={career}
                    onClick={() => setOpenModal(career.id)}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        )}
      </div>

      {openModal && (
        <CareerModal
          career={careers?.find((c) => c.id === openModal)}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Recommendations;
