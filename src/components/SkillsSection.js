import { useState, useEffect, useRef } from "react";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillsPosition, setSkillsPosition] = useState({ x: 0, y: 0 });

  // Skills data with categories and proficiency levels
  const skillsData = {
    languages: [
      { name: "JavaScript", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Java", proficiency: 80 },
      { name: "Python", proficiency: 75 },
    ],
    frontend: [
      { name: "React.js", proficiency: 95 },
      { name: "HTML5", proficiency: 90 },
      { name: "CSS3", proficiency: 90 },
      { name: "Material-UI", proficiency: 85 },
      { name: "Next.js", proficiency: 80 },
    ],
    backend: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express.js", proficiency: 85 },
      { name: "Spring Boot", proficiency: 80 },
    ],
    mobile: [{ name: "React Native", proficiency: 90 }],
    database: [
      { name: "MySQL", proficiency: 85 },
      { name: "MongoDB", proficiency: 80 },
    ],
    tools: [
      { name: "Git", proficiency: 90 },
      { name: "VS Code", proficiency: 95 },
      { name: "Postman", proficiency: 90 },
      { name: "REST APIs", proficiency: 90 },
    ],
  };

  // Categories with icons/emoji
  const categories = [
    { id: "all", name: "All Skills", emoji: "✨" },
    { id: "languages", name: "Languages", emoji: "📝" },
    { id: "frontend", name: "Frontend", emoji: "🎨" },
    { id: "backend", name: "Backend", emoji: "⚙️" },
    { id: "mobile", name: "Mobile", emoji: "📱" },
    { id: "database", name: "Database", emoji: "🗄️" },
    { id: "tools", name: "Tools", emoji: "🛠️" },
  ];

  // Get all skills or filtered by category
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return Object.entries(skillsData).reduce((acc, [_, skills]) => {
        return [...acc, ...skills];
      }, []);
    }

    return skillsData[activeCategory] || [];
  };

  // Handle mouse movement for interactive effect
  const handleMouseMove = (e) => {
    const bounds = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setSkillsPosition({ x, y });
  };

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

  return (
    <div
      ref={sectionRef}
      className="container mx-auto px-6 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive background gradient */}
      <div
        className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-5 blur-3xl pointer-events-none"
        style={{
          left: `${skillsPosition.x}px`,
          top: `${skillsPosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Category navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredSkills().map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="relative bg-gray-900 rounded-lg p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-blue-500"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 50 + 500}ms`,
            }}
          >
            <h3 className="text-xl font-bold mb-3 text-white">{skill.name}</h3>

            {/* Skill progress bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                style={{
                  width: `${skill.proficiency}%`,
                  transition: "width 1s ease-in-out",
                  transitionDelay: `${index * 100 + 800}ms`,
                }}
              ></div>
            </div>

            {/* Proficiency level */}
            <div className="mt-2 text-right text-sm text-gray-400">
              {hoveredSkill === skill.name ? `${skill.proficiency}%` : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
