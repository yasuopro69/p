"use client";

import { useEffect } from "react";

const AdSenseAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <></>
    // <ins
    //   className="adsbygoogle"
    //   style={{ display: "block", textAlign: "center" }}
    //   data-ad-client="ca-pub-9807388431439024"
    //   data-ad-slot="7040444270"
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"
    // ></ins>
  );
};

export default AdSenseAd;
