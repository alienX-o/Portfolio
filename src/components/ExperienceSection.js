import { useState, useEffect, useRef } from "react";
import { Calendar, Building } from "lucide-react";

export default function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  // Data for experiences
  const experiences = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCompiler Data Systems",
      period: "May 2025 – Present",
      description: [
        "Developed scalable and high-performance Web Applications and Mobile Apps using React.js, React Native, Node.js, MySQL, REST APIs, Azure",
        "Collaborated on backend development, API integrations, and real-time feature implementations.",
      ],
      skills: [
        "React.js",
        "React Native",
        "Node.js",
        "MySQL",
        "REST APIs",
        "Azure",
      ],
    },
    {
      id: 2,
      title: "Software Engineer Intern",
      company: "TechCompiler Data Systems",
      period: "Dec 2024 – April 2025",
      description: [
        "Contributed to software development lifecycle and gained hands-on experience with industry tools and practices.",
      ],
      skills: ["React.js", "Node.js", "REST APIs"],
    },
    {
      id: 3,
      title: "Full-Stack Intern",
      company: "Igniter's Hub, Noida",
      period: "June 2023 – Aug 2023",
      description: [
        "Built and optimized RESTful APIs using SpringBoot while designing dynamic frontend interfaces in React.js.",
        "Integrated robust authentication mechanisms and managed secure database operations with MySQL.",
      ],
      skills: [
        "SpringBoot",
        "React.js",
        "RESTful APIs",
        "MySQL",
        "Authentication",
      ],
    },
  ];

  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start showing items with staggered delay
            const timer = setTimeout(() => {
              setVisibleItems(experiences.map((exp) => exp.id));
            }, 300);

            return () => clearTimeout(timer);
          }
        });
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
  }, [experiences]);

  return (
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

        {/* Experience cards */}
        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`mb-12 flex w-full transition-all duration-1000 ${
                visibleItems.includes(experience.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Card content with different layout based on index for timeline effect */}
              <div
                className={`relative bg-gray-900 p-6 rounded-lg shadow-lg w-full md:w-5/12 z-10 
                ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Timeline connector */}
                <div
                  className={`hidden md:block absolute top-6 w-10 h-1 bg-blue-500 
                  ${
                    index % 2 === 0
                      ? "right-0 translate-x-full"
                      : "left-0 -translate-x-full"
                  }`}
                ></div>

                {/* Circle on timeline */}
                <div
                  className={`hidden md:flex absolute top-4 w-5 h-5 bg-blue-500 rounded-full items-center justify-center
                  ${
                    index % 2 === 0
                      ? "right-0 translate-x-1/2 translate-x-12"
                      : "left-0 -translate-x-1/2 -translate-x-12"
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-2 text-blue-400">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{experience.period}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{experience.title}</h3>

                  <div className="flex items-center mb-4 text-gray-400">
                    <Building size={16} className="mr-2" />
                    <span>{experience.company}</span>
                  </div>

                  <div className="mb-4">
                    {experience.description.map((desc, idx) => (
                      <p key={idx} className="text-gray-300 mb-2">
                        {desc}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-800 text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
