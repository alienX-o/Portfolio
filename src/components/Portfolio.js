import { useState, useEffect, useRef } from "react";
import { ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";
import HeroSection from "./HeroSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";

// Main App Component
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Refs for sections
  const sectionsRef = useRef({});

  // Handle scroll and cursor movement
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);

      // Determine active section
      const sections = [
        "home",
        "experience",
        "skills",
        "projects",
        "education",
      ];
      for (const section of sections) {
        const element = sectionsRef.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor follower */}
      <div
        className="fixed w-6 h-6 rounded-full bg-blue-400 opacity-50 pointer-events-none blur-sm z-50 mix-blend-screen"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Aryan Yadav
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["home", "experience", "skills", "projects", "education"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 flex flex-col items-end space-y-1.5">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "w-6 transform rotate-45 translate-y-2" : "w-6"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "w-4"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "w-6 transform -rotate-45 -translate-y-2" : "w-5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden bg-black bg-opacity-95 transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            {["home", "experience", "skills", "projects", "education"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-3 capitalize transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="pt-16">
        {/* Hero Section */}
        <section
          ref={(el) => (sectionsRef.current.home = el)}
          className="min-h-screen flex items-center relative"
        >
          <HeroSection />
        </section>

        {/* Experience Section */}
        <section
          ref={(el) => (sectionsRef.current.experience = el)}
          className="min-h-screen py-20"
        >
          <ExperienceSection />
        </section>

        {/* Skills Section */}
        <section
          ref={(el) => (sectionsRef.current.skills = el)}
          className="min-h-screen py-20"
        >
          <SkillsSection />
        </section>

        {/* Projects Section */}
        <section
          ref={(el) => (sectionsRef.current.projects = el)}
          className="min-h-screen py-20"
        >
          <ProjectsSection />
        </section>

        {/* Education Section */}
        <section
          ref={(el) => (sectionsRef.current.education = el)}
          className="min-h-screen py-20"
        >
          <EducationSection />
        </section>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-40"
      >
        <ArrowUp size={24} />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-6 md:mb-0 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Aryan Yadav
            </div>
            <div className="flex space-x-6">
              <a
                href="mailto:aryanking05644@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+917737099712"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Aryan Yadav. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Import all section components
