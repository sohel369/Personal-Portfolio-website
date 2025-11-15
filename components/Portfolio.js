export default function Portfolio() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Built with modern technologies for optimal performance.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      tech: ["Next.js", "TypeScript", "Firebase", "Tailwind"]
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive data visualization dashboard with interactive charts, real-time data updates, and customizable reporting features.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      tech: ["React", "D3.js", "Python", "PostgreSQL"]
    },
    {
      title: "Social Media App",
      description: "Modern social media platform with real-time messaging, image sharing, and interactive features. Built for scalability and performance.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
      tech: ["React Native", "Node.js", "Socket.io", "AWS"]
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations, modern design, and optimized performance. Showcasing projects and skills effectively.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP"]
    },
    {
      title: "Weather App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather information. Clean and intuitive UI.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      tech: ["React", "API", "Tailwind", "Chart.js"]
    }
  ]

  return (
    <section className="portfolio" id="portfolio" data-title="Portfolio - SOHEL Developer">
      <div className="portfolio-wrapper">
        <div className="portfolio-header">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-description">Showcasing innovative solutions and creative implementations</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link" title="Live Demo">
                      <i className='bx bx-link-external'></i>
                    </a>
                    <a href="#" className="project-link" title="GitHub">
                      <i className='bx bxl-github'></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

