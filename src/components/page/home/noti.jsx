"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const Noti = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // default closed

  useEffect(() => {
    setIsMounted(true);
    // No automatic modal opening
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isMounted && (
        <Modal
          title="Thông báo"
          open={isModalOpen}
          onOk={handleOk}
          okText="Kê"
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="text-center">
            <div className="w-100 d-flex justify-content-center">
              <img
                src="/img/PAY.png"
                alt="banner - vudevweb.com"
                className="rounded"
                style={{ objectFit: "cover", maxWidth: "200px" }}
              />
            </div>
            <p className="mt-2">
              👉 Ủng hộ mình kinh phí để duy trì website nhé! 👈
            </p>
            <p className="mt-2">
              👉 Liên hệ telegram &nbsp;
              <a href="" target="_blank" rel="noreferrer">
                Gin Movies
              </a>
              &nbsp; để yêu cầu phim! 👈
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Noti;
