import React, { useState, useEffect } from 'react';
import AdminHeaderSidebar from './AdminHeaderSidebar';
import { useParams } from 'react-router-dom';

function Feedback() {
  const { courseId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:8333/api/feedback/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [courseId, token]);

  return (
    <AdminHeaderSidebar>
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Feedback</h2>
        <p className="text-lg text-gray-600 mb-8">View all feedback for this course</p>

        <div className="grid gap-6">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({feedback.rating}/5)</span>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          ))}

          {feedbacks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No feedback available for this course yet.
            </div>
          )}
        </div>
      </div>
    </AdminHeaderSidebar>
  );
}

export default Feedback;