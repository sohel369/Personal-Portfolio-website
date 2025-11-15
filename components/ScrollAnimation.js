import { useEffect, useRef, useState } from 'react'

/**
 * ScrollAnimation Component
 * Adds premium scroll-triggered animations to elements
 * 
 * Usage:
 * <ScrollAnimation animation="fadeInUp" delay={0.2}>
 *   <div>Your content</div>
 * </ScrollAnimation>
 */
export default function ScrollAnimation({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0,
  duration = 0.8,
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Unobserve after animation triggers
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  return (
    <div
      ref={elementRef}
      className={`scroll-animate ${animation} ${isVisible ? 'animate-in' : ''}`}
      style={{
        '--animation-delay': `${delay}s`,
        '--animation-duration': `${duration}s`
      }}
    >
      {children}
    </div>
  )
}

