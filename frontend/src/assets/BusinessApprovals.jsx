import React, { useEffect, useState } from "react";
import "../styles/BusinessApprovals.css";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import BusinessTable from "../components/BusinessTable";

const BusinessApprovals = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetch("http://localhost:8000/admin/businesses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setBusinesses(data);
        } else {
          setBusinesses([]);
        }
      });
  }, []);

  const filtered = businesses.filter(b => b.status === filter);

  const navigate = useNavigate();

  const navigateDashboard = ()  => {
      navigate("/admindashboard")
  }

  return (
    <>
    <VideoBackground />
    <div className="admin-page">
      <h2>Business Approvals</h2>

      <div className="filter-tabs">
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("approved")}>Approved</button>
        <button onClick={() => setFilter("rejected")}>Rejected</button>
      </div>

      <BusinessTable businesses={filtered} refresh={setBusinesses} />
      <div>
        <button onClick={navigateDashboard}><i className="fa-solid fa-arrow-left"></i> Back to dashboard</button>
      </div>
    </div>
    </>
  );
};

export default BusinessApprovals;
