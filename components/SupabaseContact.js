import { useState } from 'react'

export default function SupabaseContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/supabase/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to send message')
      }

      setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="supabase-contact-form" style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      border: '1px solid rgba(0, 238, 238, 0.2)'
    }}>
      <h2 style={{ 
        color: '#00eeee', 
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Contact Form (Supabase)
      </h2>

      {submitStatus && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '5px',
          background: submitStatus.type === 'success' 
            ? 'rgba(0, 255, 0, 0.1)' 
            : 'rgba(255, 0, 0, 0.1)',
          border: `1px solid ${submitStatus.type === 'success' ? '#00ff00' : '#ff0000'}`,
          color: submitStatus.type === 'success' ? '#00ff00' : '#ff0000'
        }}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#fff' 
          }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(0, 238, 238, 0.3)',
              borderRadius: '5px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#fff' 
          }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(0, 238, 238, 0.3)',
              borderRadius: '5px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#fff' 
          }}>
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(0, 238, 238, 0.3)',
              borderRadius: '5px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#fff' 
          }}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(0, 238, 238, 0.3)',
              borderRadius: '5px',
              color: '#fff',
              fontSize: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: isSubmitting 
              ? 'rgba(0, 238, 238, 0.5)' 
              : '#00eeee',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

