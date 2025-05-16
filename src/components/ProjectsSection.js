import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Code } from "lucide-react";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Online Auction Platform",
      description:
        "A real-time bidding platform enabling live auctions with automatic bid handling. Features secure authentication, real-time updates, and intuitive UI.",
      details:
        "Developed a real-time bidding platform enabling live auctions with automatic bid handling. Implemented Socket.IO for instantaneous updates. Integrated advanced security measures, including JWT-based authentication and multi-factor verification.",
      image: "/api/placeholder/600/350",
      technologies: [
        "Node.js",
        "React.js",
        "MySQL",
        "Socket.IO",
        "WebSockets",
        "JWT",
      ],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 2,
      title: "Task Management Mobile App",
      description:
        "A comprehensive task management app with push notifications, real-time sync, and offline support.",
      details:
        "Developed a comprehensive task management app featuring push notifications, real-time sync, and offline support. Designed an intuitive dashboard for task analytics and performance tracking. Leveraged third-party APIs to integrate calendar and notification functionalities. Integrated advanced security measures, including JWT-based authentication and multi-factor verification.",
      image: "/api/placeholder/600/350",
      technologies: [
        "React Native",
        "REST APIs",
        "Azure SQL",
        "Node.js",
        "JWT",
      ],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 3,
      title: "Real-Time Currency Converter",
      description:
        "A responsive currency converter with live exchange rate API integration and optimized performance.",
      details:
        "Built a responsive currency converter with live exchange rate API integration. Developed comprehensive unit and integration tests to ensure high reliability and performance. Employed caching strategies to reduce API latency and improve user experience. Designed a clean, adaptive UI with Thymeleaf for optimal multi-device compatibility.",
      image: "/api/placeholder/600/350",
      technologies: [
        "Spring Boot",
        "Thymeleaf",
        "Hibernate",
        "MySQL",
        "REST APIs",
      ],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 4,
      title: "Sign Language Video Call",
      description:
        "A real-time sign language translation system for video calls using AI and machine learning.",
      details:
        "Developed a real-time sign language translation system for video calls. Trained a deep learning model to accurately detect hand gestures and convert them to text. Integrated WebRTC for seamless, low-latency video communication. Optimized server performance for real-time inference handling.",
      image: "/api/placeholder/600/350",
      technologies: ["Python", "TensorFlow", "Next.js", "WebRTC"],
      demoLink: "#",
      codeLink: "#",
    },
  ];

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Set first project as active by default
  useEffect(() => {
    if (isVisible && !activeProject && projects.length > 0) {
      setActiveProject(projects[0].id);
    }
  }, [isVisible, activeProject, projects]);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Project showcase */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Project navigation sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-20">
            <div className="flex flex-col space-y-4">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`text-left p-4 rounded-lg transition-all duration-300 ${
                    activeProject === project.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-900 hover:bg-gray-800 text-gray-300"
                  }`}
                  style={{
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-sm">
                    {activeProject === project.id
                      ? "Currently viewing"
                      : project.technologies.slice(0, 3).join(", ") +
                        (project.technologies.length > 3 ? "..." : "")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="lg:w-2/3">
          {projects.map(
            (project) =>
              activeProject === project.id && (
                <div
                  key={project.id}
                  className="bg-gray-900 rounded-lg overflow-hidden transition-all duration-500"
                  style={{
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: "300ms",
                  }}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tech badges overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-500 bg-opacity-30 backdrop-blur-sm text-white text-xs rounded-full border border-blue-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6">{project.details}</p>

                    {/* Project links */}
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        <Github size={18} />
                        <span>Source Code</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        <Code size={18} />
                        <span>Case Study</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
