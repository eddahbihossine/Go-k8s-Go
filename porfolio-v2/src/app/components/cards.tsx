"use client";


const projects = [
  {
    title: "Project 1",
    description: "A modern dashboard using Next.js and Tailwind.",
    techStack: ["Kubernetes", "Go", "docker"],
  },
  {
    title: "Project 2",
    description: "A Three.js interactive visualization.",
    techStack: ["Three.js", "React", "TypeScript"],
  },
  {
    title: "Project 3",
    description: "A real-time chat application with WebSockets.",
    techStack: ["Node.js", "Express", "Socket.io"],
  },
];

export default function ProjectsSection() {


  return (
    <div className="max-w-3xl text-center mx-auto">
      <h2 className="text-5xl text-gold font-[Hamid] mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
            <p className="text-gray-300 mt-2">{project.description}</p>
            <ul className="mt-4">
              {project.techStack.map((tech, index) => (
                <li key={index} className="text-gray-300">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}