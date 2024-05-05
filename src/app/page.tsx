"use client"

import {useState} from "react";
import CentralLogo from "../app/ui/centralLogo";
import LandingPage from "../app/ui/landingPage";

export default function Home() {
  "use client";
  const [showLandingPage, setShowLandingPage] = useState(false);

  const handleAnimationComplete = () => {
    setShowLandingPage(true);
  };

  return (
    <div className="animated-gradient h-screen">
      <div className="flex content size-full justify-center">
        {!showLandingPage && <CentralLogo onAnimationComplete={handleAnimationComplete} />}
        {showLandingPage && <LandingPage />}
      </div>
    </div>
  );
}
