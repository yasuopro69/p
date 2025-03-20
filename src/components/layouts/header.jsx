"use client";
import React, { useState, useEffect } from "react";
// import Link from "next/link";
import { Link } from "next-view-transitions";

const AppHeader = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.querySelector(".navbar");

      if (navbar) {
        navbar.style.top =
          scrollTop > lastScrollTop
            ? "-100px"
            : scrollTop < 20
            ? "0"
            : navbar.style.top;
      }

      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    setCurrentPath(window.location.pathname);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const API_THE_LOAI = process.env.API_THE_LOAI;
  const API_QUOC_GIA = process.env.API_QUOC_GIA;

  const [theLoai, setTheLoai] = useState([]);
  const [quocGia, setQuocGia] = useState([]);
  const [namPhatHanh, setNamPhatHanh] = useState(() => {
    const years = [];
    for (let i = 2024; i >= 1990; i--) {
      years.push({ name: i, slug: i });
    }
    return years;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [theLoaiRes, quocGiaRes] = await Promise.all([
          fetch(API_THE_LOAI).then((res) => res.json()),
          fetch(API_QUOC_GIA).then((res) => res.json()),
        ]);
        theLoaiRes.splice(
          theLoaiRes.findIndex((item) => item.slug === "phim-18"),
          1
        );
        localStorage.setItem("theLoai", JSON.stringify(theLoaiRes));
        localStorage.setItem("quocGia", JSON.stringify(quocGiaRes));
        setTheLoai(theLoaiRes);
        setQuocGia(quocGiaRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (localStorage.getItem("theLoai") && localStorage.getItem("quocGia")) {
      setTheLoai(JSON.parse(localStorage.getItem("theLoai")));
      setQuocGia(JSON.parse(localStorage.getItem("quocGia")));
    } else {
      fetchData();
    }
  }, [API_THE_LOAI, API_QUOC_GIA]);

  const dataRoute = [
    { name: "Phim mới cập nhật", path: "/phim-moi-cap-nhat" },
    { name: "Phim lẻ", path: "/danh-sach/phim-le" },
    { name: "Phim bộ", path: "/danh-sach/phim-bo" },
    { name: "Hoạt hình", path: "/danh-sach/hoat-hinh" },
    { name: "TV Show", path: "/danh-sach/tv-shows" },
  ];

  const renderLink = (path, children) => {
    if (isMobile) {
      return (
        <a
          href={path}
          onClick={() => setCurrentPath(path)}
          className={
            "nav-link nav-link-vd mx-lg-2 fw " +
            (currentPath === path ? "active" : "")
          }
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={path}
        onClick={() => setCurrentPath(path)}
        className={
          "nav-link nav-link-vd mx-lg-2 fw " +
          (currentPath === path ? "active" : "")
        }
      >
        {children}
      </Link>
    );
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ transition: "0.3s ease-in-out" }}
    >
      <div className="container">
        {/* {renderLink("/", <span className="navbar-brand me-auto text-warning fw">Gin Movies</span>)} */}
        <Link
          onClick={() => setCurrentPath("/")}
          className="navbar-brand me-auto text-warning fw"
          href="/"
        >
          Gin Movies
        </Link>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <a onClick={() => setCurrentPath("/")} href="/">
              <h5
                className="offcanvas-title text-warning fw"
                id="offcanvasNavbarLabel"
              >
                Gin Movies
              </h5>
            </a>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              {dataRoute.map((item, index) => (
                <li className="nav-item" key={index}>
                  {renderLink(item.path, item.name)}
                </li>
              ))}

              <li className="nav-item dropdown">
                <Link
                  className="nav-link mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thể loại
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {theLoai.map((item, index) => (
                    <li key={index}>
                      {isMobile ? (
                        <a
                          className="dropdown-item"
                          href={`/the-loai/${item.slug}`}
                          onClick={() =>
                            setCurrentPath(`/the-loai/${item.slug}`)
                          }
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          className="dropdown-item"
                          href={`/the-loai/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link  mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Quốc gia
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {quocGia.map((item, index) => (
                    <li key={index}>
                      {isMobile ? (
                        <a
                          className="dropdown-item"
                          href={`/the-loai/${item.slug}`}
                          onClick={() =>
                            setCurrentPath(`/the-loai/${item.slug}`)
                          }
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          className="dropdown-item"
                          href={`/quoc-gia/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link  mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Năm
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {namPhatHanh.map((item, index) => (
                    <li key={index}>
                      {isMobile ? (
                        <a
                          className="dropdown-item"
                          href={`/the-loai/${item.slug}`}
                          onClick={() =>
                            setCurrentPath(`/the-loai/${item.slug}`)
                          }
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          className="dropdown-item"
                          href={`/nam/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <Link
            onClick={() => setCurrentPath("/tim-kiem")}
            href="/tim-kiem"
            className={
              `ms-2 me-md-4 ` +
              (currentPath === "/tim-kiem" ? "text-warning" : "text-dark")
            }
          >
            <i className="fe fe-search fs-3" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </nav>
  );
};
export default AppHeader;
