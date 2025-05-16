import { useState, useEffect, useRef } from "react";
import { GraduationCap, Award, Medal } from "lucide-react";

export default function EducationSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Education data
  const education = {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Govt. Engineering College, Ajmer",
    period: "2020 – 2024",
    cgpa: "8.0",
    achievements: [
      "Single Person to Qualify for the Regional Mathematics Olympiad (RMO) in the whole district",
    ],
    certifications: [
      {
        name: "Java Development Internship",
        issuer: "Igniter's Hub",
        year: "2023",
      },
    ],
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
    <div ref={sectionRef} className="container mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Education & Achievements
          </span>
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Education and achievements content */}
      <div className="max-w-4xl mx-auto">
        {/* Main education card */}
        <div
          className="bg-gray-900 rounded-lg p-8 mb-12 shadow-lg border border-gray-800 relative overflow-hidden"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
          }}
        >
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500 opacity-5"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500 opacity-5"></div>

          <div className="flex items-start">
            <div className="mr-6">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <GraduationCap size={28} className="text-blue-400" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{education.degree}</h3>
              <p className="text-xl text-gray-300 mb-1">
                {education.institution}
              </p>
              <p className="text-gray-400 mb-4">{education.period}</p>

              <div className="mb-6 inline-block px-4 py-2 bg-gray-800 rounded-lg">
                <span className="text-gray-300">CGPA: </span>
                <span className="font-bold text-blue-400">
                  {education.cgpa}
                </span>
              </div>

              <div className="animate-pulse w-full h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

              {/* Course highlights or relevant subjects (you can add if available) */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-3 flex items-center text-gray-200">
                  <Award size={18} className="mr-2 text-blue-400" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {education.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                      style={{
                        transform: isVisible
                          ? "translateX(0)"
                          : "translateX(-20px)",
                        opacity: isVisible ? 1 : 0,
                        transition:
                          "transform 0.5s ease-out, opacity 0.5s ease-out",
                        transitionDelay: `${index * 200 + 300}ms`,
                      }}
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className="bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-800"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
            transitionDelay: "400ms",
          }}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Medal size={20} className="mr-3 text-blue-400" />
            Certifications & Honors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                  transitionDelay: `${index * 200 + 600}ms`,
                }}
              >
                <h4 className="font-semibold text-blue-300 mb-2">
                  {cert.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div
          className="mt-16 text-center py-8"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
            transitionDelay: "800ms",
          }}
        >
          <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Interested in discussing a project or potential opportunity? I'm
            always open to new challenges and collaborations.
          </p>
          <a
            href="mailto:aryanking05644@gmail.com"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
