import React from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./components/Portfolio";

// Add global styles
const GlobalStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

    :root {
      --blue-glow: 0 0 15px rgba(59, 130, 246, 0.5);
      --purple-glow: 0 0 15px rgba(168, 85, 247, 0.5);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: "Inter", sans-serif;
      background-color: #000;
      color: #fff;
      line-height: 1.6;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #111;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
      border-radius: 4px;
    }

    /* Text selection */
    ::selection {
      background: rgba(59, 130, 246, 0.3);
      color: #fff;
    }

    /* Animations */
    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }

    .animate-blink {
      animation: blink 1s step-end infinite;
    }

    /* Dynamic hover effects */
    .hover-glow:hover {
      box-shadow: var(--blue-glow);
    }

    /* Smooth transitions */
    .transition-all {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }

    /* Fix scrolling issues */
    .overflow-hidden {
      overflow: hidden;
    }
  `}</style>
);

// Main application with global styles
const App = () => (
  <>
    <GlobalStyles />
    <Portfolio />
  </>
);

// Render the app
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
