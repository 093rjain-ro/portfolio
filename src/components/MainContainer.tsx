import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    // Skew Protection Checker
    const checkVersion = async () => {
      try {
        const response = await fetch('/version.json?t=' + Date.now(), { cache: "no-store" });
        const data = await response.json();
        // @ts-ignore
        if (typeof __APP_VERSION__ !== 'undefined' && data.version && data.version !== __APP_VERSION__) {
          console.warn("New deployment version detected. Forcing page refresh for skew protection.");
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to check version skew", error);
      }
    };
    
    const versionInterval = setInterval(checkVersion, 60000);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkVersion();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearInterval(versionInterval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Work />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
