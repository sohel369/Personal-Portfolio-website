export default function Skills() {
  return (
    <section className="skills" id="skills" data-title="Skills - SOHEL Developer">
      <div className="skills-wrapper">
        <div className="skills-header">
          <span className="section-tag">My Expertise</span>
          <h2 className="section-title">Technical <span>Skills</span></h2>
          <p className="section-description">Mastering cutting-edge technologies to deliver exceptional digital solutions</p>
        </div>

        <div className="skills-content">
          <div className="skills-category">
            <h3 className="category-title">
              <i className='bx bx-code-alt'></i>
              Technical Skills
            </h3>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-html5'></i>
                </div>
                <h4>HTML5</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '95%' }}></div>
                  </div>
                  <span>95%</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-css3'></i>
                </div>
                <h4>CSS3</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '90%' }}></div>
                  </div>
                  <span>90%</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-javascript'></i>
                </div>
                <h4>JavaScript</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '88%' }}></div>
                  </div>
                  <span>88%</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-react'></i>
                </div>
                <h4>React</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '85%' }}></div>
                  </div>
                  <span>85%</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-nodejs'></i>
                </div>
                <h4>Node.js</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '82%' }}></div>
                  </div>
                  <span>82%</span>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon">
                  <i className='bx bxl-python'></i>
                </div>
                <h4>Python</h4>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: '80%' }}></div>
                  </div>
                  <span>80%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-category">
            <h3 className="category-title">
              <i className='bx bx-cog'></i>
              Tools & Frameworks
            </h3>
            <div className="tools-grid">
              <div className="tool-item">
                <i className='bx bxl-react'></i>
                <span>React</span>
              </div>
              <div className="tool-item">
                <i className='bx bx-code-alt'></i>
                <span>Next.js</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-tailwind-css'></i>
                <span>Tailwind CSS</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-figma'></i>
                <span>Figma</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-git'></i>
                <span>Git</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-github'></i>
                <span>GitHub</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-visual-studio'></i>
                <span>VS Code</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-mongodb'></i>
                <span>MongoDB</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-firebase'></i>
                <span>Firebase</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-aws'></i>
                <span>AWS</span>
              </div>
              <div className="tool-item">
                <i className='bx bxl-docker'></i>
                <span>Docker</span>
              </div>
              <div className="tool-item">
                <i className='bx bx-data'></i>
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>

          <div className="skills-category">
            <h3 className="category-title">
              <i className='bx bx-user'></i>
              Soft Skills
            </h3>
            <div className="soft-skills">
              <div className="soft-skill-item">
                <i className='bx bx-group'></i>
                <span>Team Collaboration</span>
              </div>
              <div className="soft-skill-item">
                <i className='bx bx-message-dots'></i>
                <span>Communication</span>
              </div>
              <div className="soft-skill-item">
                <i className='bx bx-lightbulb'></i>
                <span>Problem Solving</span>
              </div>
              <div className="soft-skill-item">
                <i className='bx bx-time'></i>
                <span>Time Management</span>
              </div>
              <div className="soft-skill-item">
                <i className='bx bx-trending-up'></i>
                <span>Adaptability</span>
              </div>
              <div className="soft-skill-item">
                <i className='bx bx-target-lock'></i>
                <span>Attention to Detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

