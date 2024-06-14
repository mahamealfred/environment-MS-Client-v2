import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { fetchAllComplaints } from "../apis/complaintController";

function TrendingTracks({ complaintData }) {
  const groupComplaintsByCategoryAndStatus = () => {
    const groupedComplaints = {};

    complaintData?.forEach((complaint) => {
      const categoryName = complaint?.Category?.name;
      const status = complaint?.status;

      if (!groupedComplaints[categoryName]) {
        groupedComplaints[categoryName] = {};
      }

      if (!groupedComplaints[categoryName][status]) {
        groupedComplaints[categoryName][status] = 0;
      }

      groupedComplaints[categoryName][status]++;
    });

    return groupedComplaints;
  };

  const calculateTotalByStatus = (groupedComplaints) => {
    const totals = {};

    Object.values(groupedComplaints).forEach((statuses) => {
      Object.entries(statuses).forEach(([status, count]) => {
        if (!totals[status]) {
          totals[status] = 0;
        }
        totals[status] += count;
      });
    });

    return totals;
  };

  const groupedComplaints = groupComplaintsByCategoryAndStatus();
  const totalsByStatus = calculateTotalByStatus(groupedComplaints);

  return (
    <div className="trending__tracks">
      <div className="trending__info">
        <div>
          <h3>Complaints Status</h3>
          <span></span>
        </div>
        <div className="icon">
          <BsArrowRight />
        </div>
      </div>
      {Object.keys(groupedComplaints).map((categoryName) => (
        <div key={categoryName} className="trend">
          <h4>{categoryName}</h4>
          <div className="status__counts">
            {Object.entries(groupedComplaints[categoryName])?.map(
              ([status, count]) => (
                <div className="status" key={status}>
                  <span>{status}:</span>
                  <span>{count}</span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
      <div className="totals">
        <h4>Total by Status</h4>
        <div className="status__counts">
          {Object.entries(totalsByStatus).map(([status, total]) => (
            <div className="status" key={status}>
              <span>{status}:</span>
              <span>{total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingTracks;
