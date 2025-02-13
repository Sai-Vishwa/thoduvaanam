import { useEffect, useState } from "react";
import { ArrowLeft, Code, CheckCircle, XCircle } from 'lucide-react';
import Cookies from "js-cookie"
import { useNavigate, useParams } from "react-router-dom";

const ReviewContestPage = () => {
  const [reviewData, setReviewData] = useState({});
  const {uname , tname} = useParams();

  const nav = useNavigate();

  async function fetchData() {
    try {
      const rev = await fetch("http://localhost:4000/basic/contest-review", {
        method: "POST",
        body: JSON.stringify({session:Cookies.get("session"),uname: uname,tname: tname,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await rev.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        setReviewData(data.data);
      }
    } catch (error) {
      alert(error.message);
      nav(`/${uname}`)
    }
  }

  useEffect(() => {
    if (Object.keys(reviewData).length === 0) {
      fetchData();
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'EASY': 'text-green-400',
      'MEDIUM': 'text-yellow-400',
      'HARD': 'text-red-400'
    };
    return colors[difficulty] || 'text-gray-400';
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <div className="text-white">
            {JSON.stringify(reviewData)}
        </div>
     
    </div>
  );
};

export default ReviewContestPage;