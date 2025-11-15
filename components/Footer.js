import { useEffect } from 'react'

// Use regular anchor tags for smooth scroll within page
const ScrollLink = ({ href, children }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

export default function Footer() {
  useEffect(() => {
    const currentYearElement = document.getElementById('current-year')
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const emailInput = e.target.querySelector('.newsletter-input')
    const email = emailInput.value
    
    if (email) {
      alert('Thank you for subscribing! You will receive updates soon.')
      emailInput.value = ''
    }
  }

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <img src="/logoShortcutIcon.png" alt="SOHEL Developer Logo" className="footer-logo-img" />
              <h3>SOHEL <span>Developer</span></h3>
            </div>
            <p className="footer-description">Passionate developer crafting exceptional digital experiences. Transforming ideas into innovative solutions with cutting-edge technology.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className='bx bxl-linkedin-square'></i>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <i className='bx bxl-github'></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className='bx bxl-instagram-alt'></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className='bx bxl-twitter'></i>
              </a>
            </div>
          </div>

          <div className="footer-column footer-links">
            <h4>Quick Links</h4>
            <ul className="footer-menu">
              <li><ScrollLink href="#home">Home</ScrollLink></li>
              <li><ScrollLink href="#education">Education</ScrollLink></li>
              <li><ScrollLink href="#service">Services</ScrollLink></li>
              <li><ScrollLink href="#testimonials">Testimonials</ScrollLink></li>
              <li><ScrollLink href="#contact">Contact</ScrollLink></li>
            </ul>
          </div>

          <div className="footer-column footer-services">
            <h4>Services</h4>
            <ul className="footer-menu">
              <li><ScrollLink href="#service">Web Design</ScrollLink></li>
              <li><ScrollLink href="#service">Web Development</ScrollLink></li>
              <li><ScrollLink href="#service">Backend Development</ScrollLink></li>
              <li><ScrollLink href="#service">Mobile Apps</ScrollLink></li>
              <li><ScrollLink href="#service">UI/UX Design</ScrollLink></li>
            </ul>
          </div>

          <div className="footer-column footer-newsletter">
            <h4>Newsletter</h4>
            <p className="newsletter-description">Subscribe to get updates on new projects and tech insights.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input type="email" placeholder="Enter your email" className="newsletter-input" required />
                <button type="submit" className="newsletter-btn">
                  <i className='bx bx-send'></i>
                </button>
              </div>
            </form>
            <p className="newsletter-note">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; <span id="current-year"></span> SOHEL Developer. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

