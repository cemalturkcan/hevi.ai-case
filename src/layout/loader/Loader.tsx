import "./style.css";
import { useEffect, useState } from "react";
import type { Router as RemixRouter } from "@remix-run/router/dist/router";

function RootLayout({ router }: { router: RemixRouter }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const splashScreenInterval = setInterval(() => {
      const navState = router.state.navigation.state;
      if (navState == "idle") {
        setIsLoading(false);
        clearInterval(splashScreenInterval);
      }
    }, 100);
    return () => {
      clearInterval(splashScreenInterval);
    };
  }, []);

  return (
    isLoading && (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )
  );
}

export default RootLayout;
