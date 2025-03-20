"use client";
import { useState, useEffect } from "react";
function AppFooter() {
  const [year, setYear] = useState(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div className="footer__custom">
      <footer className="mt-4 d-flex flex-wrap justify-content-between align-items-center p-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></a>
          <span className="mb-3 mb-md-0 text-dark fw ">
            © {year ? year : "Loading..."} Copyright by {" "}
            <a
              className="text-warning"
              href=""
              target="_blank"
            >
              {process.env.BOSS}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default AppFooter;
