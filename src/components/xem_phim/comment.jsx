'use client'

import { useEffect, useState } from "react";

function Comment() {
    const [isVisible, setIsVisible] = useState(false); // Set to false to hide by default
    const url = window.location.href;

    useEffect(() => {
        if (!isVisible) return; // Prevent script execution if comments are hidden

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "458546473274979",
                autoLogAppEvents: true,
                xfbml: true,
                version: "v19.0",
            });
            window.FB.XFBML.parse();
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/vi_VN/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, [isVisible]); // Only run when visibility changes

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide Comments" : "Show Comments"}
            </button>
            {isVisible && (
                <div
                    style={{ background: "#fff", borderRadius: "7px" }}
                    className="fb-comments"
                    data-href={url}
                    data-numposts="5"
                    data-width="100%"
                />
            )}
        </div>
    );
}

export default Comment;
