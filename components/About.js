export default function About() {
  return (
    <section className="about" id="about" data-title="About - Muhammad Sohel">
      <div className="about-wrapper">
        <div className="about-content">
          <div className="about-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Crafting Digital <span>Excellence</span></h2>
            <p className="section-description">Passionate developer with a vision to transform ideas into exceptional digital experiences</p>
          </div>

          <div className="about-main">
            <div className="about-text">
              <div className="about-intro">
                <h3>Hello! I'm SOHEL, a Creative Developer</h3>
                <p>With over 5 years of experience in web development, I specialize in creating innovative digital solutions that combine cutting-edge technology with stunning design. My passion lies in transforming complex ideas into user-friendly, high-performance applications.</p>
              </div>

              <div className="about-details">
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className='bx bx-code-alt'></i>
                  </div>
                  <div className="detail-content">
                    <h4>Clean Code</h4>
                    <p>Writing maintainable, scalable, and efficient code that stands the test of time.</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <i className='bx bx-palette'></i>
                  </div>
                  <div className="detail-content">
                    <h4>Creative Design</h4>
                    <p>Blending aesthetics with functionality to create visually stunning user experiences.</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <i className='bx bx-rocket'></i>
                  </div>
                  <div className="detail-content">
                    <h4>Performance</h4>
                    <p>Optimizing applications for speed, efficiency, and seamless user interactions.</p>
                  </div>
                </div>
              </div>

              <div className="about-skills">
                <h4>Core Skills</h4>
                <div className="skills-list">
                  <span className="skill-tag">Frontend Development</span>
                  <span className="skill-tag">Backend Development</span>
                  <span className="skill-tag">UI/UX Design</span>
                  <span className="skill-tag">Mobile Apps</span>
                  <span className="skill-tag">Cloud Solutions</span>
                  <span className="skill-tag">API Development</span>
                </div>
              </div>
            </div>

            <div className="about-image">
              <div className="about-img-wrapper">
                <div className="about-img-glow"></div>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn4zpMIKUbgJpiQ73yJbL48o2OsBW4DfvHD0dV1vtm31MVeyOiTjtvl-gVlbGkTuvcSy0&usqp=CAU"
                  alt="SOHEL Developer"
                />
                <div className="about-img-border"></div>
                <div className="about-badge">
                  <i className='bx bx-award'></i>
                  <span>5+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

