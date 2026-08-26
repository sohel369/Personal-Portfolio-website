import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    // Select all key elements to animate when scrolled into view
    const selectors = [
      '.section-header',
      '.service-header',
      '.portfolio-header',
      '.skills-header',
      '.process-header',
      '.testimonials-header',
      '.about-header',
      '.service_box',
      '.project-card',
      '.skill-card',
      '.tool-item',
      '.soft-skill-item',
      '.process-step',
      '.testimonial_card',
      '.detail-item',
      '.about-intro',
      '.about-image',
      '.contact-info-card',
      '.contact-form',
      '.scroll-reveal'
    ]

    const elements = document.querySelectorAll(selectors.join(','))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            
            // Calculate staggered delay for grid items
            const parent = entry.target.parentElement
            if (parent && !entry.target.style.getPropertyValue('--reveal-delay')) {
              const children = Array.from(parent.children)
              const index = children.indexOf(entry.target)
              if (index >= 0) {
                entry.target.style.setProperty('--reveal-delay', `${(index % 6) * 0.1}s`)
              }
            }
            
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    elements.forEach((el) => {
      if (!el.classList.contains('scroll-reveal') && !el.classList.contains('scroll-animate')) {
        el.classList.add('scroll-reveal')
      }
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
