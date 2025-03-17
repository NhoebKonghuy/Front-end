import { TbReportSearch } from "react-icons/tb";
import { useState } from "react";
import { GrSchedulePlay } from "react-icons/gr";
import ApiClient from "../../utils/ApiClient";
import { useEffect, React } from "react";
import { useReports } from "/src/hooks/HookData";


const ReportPage = () => {
  const {reports, loading, error} = useReports();

  
  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-black mb-4">
        <GrSchedulePlay size={40} /> View Reports
      </h2>
      <div className="row justify-content-center">
        {reports.map((item) => (
          <div key={item.id} className="col-md-4 col-sm-6 mb-4">
            <a
              href={item.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <div className="card report-card text-center shadow-lg border-0 rounded-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <TbReportSearch
                    size={80}
                    className="text-black report-icon"
                  />
                  <h5 className="card-title fw-bold mt-3">{item.username}</h5>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
