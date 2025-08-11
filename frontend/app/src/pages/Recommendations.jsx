import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CareerCard from "../components/CareerCard";
import FloatingElements from "../components/FloatingElements";
import CareerModal from "../components/CareerModal";
import { fetchRecommendations } from "../utils/apiFetching";

const Recommendations = () => {
  const [openModal, setOpenModal] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  console.log(user);

  const {
    data: recommended_jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recommendations"],
    enabled: isAuthenticated, // استدعي الطلب بس لو المستخدم مسجل دخول
    queryFn: () => fetchRecommendations(user),
  });

  useEffect(() => {
    if (Array.isArray(recommended_jobs)) {
      setCareers([...recommended_jobs].sort((a, b) => b.score - a.score));
    }
  }, [user, recommended_jobs]);

  if (!recommended_jobs) {
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

  console.log("Retrieved Jobs: ", recommended_jobs?.data);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">{error.message}</div>
    );

  // باقي الكود عادي
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <FloatingElements />
      <div className="container mx-auto px-6 py-8 relative z-10">
        <Header />
        <div className="max-w-6xl mx-auto">
          {/* Top Match */}
          {careers?.map((career) => {
            career?.score > 0.85 ? (
              <div key={career.id} className="mb-12">
                (
                <div className="text-center mb-6">
                  <span className="inline-flex items-center px-6 py-3 bg-yellow-400 text-yellow-900 rounded-full font-bold text-lg">
                    🏆 Perfect Match-
                    {(career?.score * 100).toFixed(0)}% Compatibility
                  </span>
                </div>
                )
                <CareerCard
                  career={career}
                  onClick={() => setOpenModal(career.id)}
                  isTopMatch
                />
              </div>
            ) : (
              ""
            );
          })}

          {/* Other Matches */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Great Matches
            </h3>
            <p className="text-purple-600">
              Explore these alternative career paths that align with your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {careers?.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                onClick={() => setOpenModal(career.id)}
              />
            ))}
          </div>
        </div>
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
