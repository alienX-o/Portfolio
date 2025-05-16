import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const titleRef = useRef(null);

  const roles = [
    "Software Developer",
    "Full-Stack Engineer",
    "React Developer",
    "Mobile App Developer",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect
  useEffect(() => {
    const interval = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
          setTypingSpeed(50); // Faster when deleting
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setCurrentRole(roles[(currentRoleIndex + 1) % roles.length]);
          setTypingSpeed(150);
        }
      } else {
        if (charIndex < currentRole.length) {
          setCharIndex(charIndex + 1);
          setTypingSpeed(150); // Normal typing speed
        } else {
          setTypingSpeed(2000); // Pause at the end
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(interval);
  }, [
    charIndex,
    currentRole,
    currentRoleIndex,
    isDeleting,
    roles,
    typingSpeed,
  ]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax effect for the geometric shapes
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll down function
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes with parallax effect */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"
          style={{
            transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"
          style={{
            transform: `translate(${-offset.x * 3}px, ${-offset.y * 3}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-cyan-500 opacity-10 blur-3xl"
          style={{
            transform: `translate(${offset.x * 1.5}px, ${offset.y * 1.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Content with staggered entrance animation */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Greeting */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-blue-400 text-xl mb-4">Hello, I'm</p>
          </div>

          {/* Name */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Aryan Yadav
              </span>
            </h1>
          </div>

          {/* Profession with typing effect */}
          <div
            ref={titleRef}
            className={`h-10 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
              {currentRole.substring(0, charIndex)}
              <span className="animate-blink">|</span>
            </h2>
          </div>

          {/* Short bio */}
          <div
            className={`max-w-2xl transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-400 text-lg mb-10">
              Passionate about creating elegant, high-performance applications
              with modern technologies. Specialized in React.js, React Native,
              and full-stack development.
            </p>
          </div>

          {/* Contact buttons */}
          <div
            className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="mailto:aryanking05644@gmail.com"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-1 shadow-lg"
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-1"
            >
              <span>Download CV</span>
            </a>
          </div>

          {/* Social links */}
          <div
            className={`flex space-x-6 mt-10 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:aryanking05644@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+917737099712"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Phone size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollDown}
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
