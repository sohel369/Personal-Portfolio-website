import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ message: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ message: 'Sending...', type: 'sending' })

    const formData = new FormData(e.target)
    
    // Client-side validation
    const name = formData.get('name')?.trim()
    const email = formData.get('email')?.trim()
    const message = formData.get('message')?.trim()

    if (!name || !email || !message) {
      setFormStatus({ 
        message: 'Please fill in all required fields (Name, Email, Message).', 
        type: 'error' 
      })
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormStatus({ 
        message: 'Please enter a valid email address.', 
        type: 'error' 
      })
      setIsSubmitting(false)
      return
    }
    
    try {
      // Prepare form data
      const formDataObj = {
        name,
        email,
        phone: formData.get('phone')?.trim() || '',
        subject: formData.get('subject')?.trim() || '',
        message
      }

      // Send to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFormStatus({ 
          message: data.message || "Message sent successfully! I'll get back to you soon.", 
          type: 'success' 
        })
        // Reset form
        if (formRef.current) {
          formRef.current.reset()
        }
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({ message: '', type: '' })
        }, 5000)
      } else {
        setFormStatus({ 
          message: data.details || data.error || "Something went wrong! Please try again.", 
          type: 'error' 
        })
        // Clear error message after 5 seconds
        setTimeout(() => {
          setFormStatus({ message: '', type: '' })
        }, 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus({ 
        message: "Network error! Please check your connection and try again.", 
        type: 'error' 
      })
      setTimeout(() => {
        setFormStatus({ message: '', type: '' })
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact" data-title="Contact - Muhammad Sohel">
      <div className="contact-wrapper">
        <div className="contact-header">
          <h2 className="heading">Contact <span>Me</span></h2>
          <p className="contact-subtitle">Let's work together to bring your ideas to life. Get in touch!</p>
        </div>

        <div className="contact-content">
          {/* Contact Info Section */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className='bx bx-envelope'></i>
              </div>
              <h3>Email Me</h3>
              <p>sohel@example.com</p>
              <a href="mailto:sohel@example.com">Send Email</a>
            </div>

            <div className="contact-info-card">
              <div className="info-icon">
                <i className='bx bx-phone'></i>
              </div>
              <h3>Call Me</h3>
              <p>+1 234 567 8900</p>
              <a href="tel:+12345678900">Call Now</a>
            </div>

            <div className="contact-social">
              <h3>Follow Me</h3>
              <div className="social-icons-grid">
                <a href="#" className="social-icon-link" aria-label="LinkedIn">
                  <i className='bx bxl-linkedin-square'></i>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-icon-link" aria-label="GitHub">
                  <i className='bx bxl-github'></i>
                  <span>GitHub</span>
                </a>
                <a href="#" className="social-icon-link" aria-label="Twitter">
                  <i className='bx bxl-twitter'></i>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-icon-link" aria-label="Instagram">
                  <i className='bx bxl-instagram-alt'></i>
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-icon-link" aria-label="Facebook">
                  <i className='bx bxl-facebook'></i>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-icon-link" aria-label="Dribbble">
                  <i className='bx bxl-dribbble'></i>
                  <span>Dribbble</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-wrapper">
            <form 
              ref={formRef}
              id="contactForm" 
              className="contact-form" 
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <i className='bx bx-user'></i>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i className='bx bx-envelope'></i>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <i className='bx bx-phone'></i>
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="form-input" 
                    placeholder="Enter your phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <i className='bx bx-message-square-detail'></i>
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="form-input" 
                    placeholder="What's this about?"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <i className='bx bx-message'></i>
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea" 
                  rows="6" 
                  placeholder="Tell me about your project..." 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <i className="bx bx-loader-alt bx-spin"></i>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#000' }}>Send Message</span>
                    <i className='bx bx-send'></i>
                  </>
                )}
              </button>
              {formStatus.message && (
                <p id="formStatus" className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

