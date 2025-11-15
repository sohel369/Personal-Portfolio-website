import { useEffect, useRef } from 'react'

/**
 * DynamicTitle Component
 * Automatically updates browser tab title based on the section currently in view
 * 
 * Usage:
 * 1. Add data-title attribute to each section: <section data-title="About - SOHEL Developer">
 * 2. Import and add <DynamicTitle defaultTitle="SOHEL Developer" /> to your page
 */
export default function DynamicTitle({ 
  defaultTitle = 'SOHEL Developer',
  rootMargin = '-20% 0px -60% 0px', // Section is considered "in view" when 20% from top
  threshold = 0.1
}) {
  const observerRef = useRef(null)
  const sectionsRef = useRef([])
  const currentTitleRef = useRef(defaultTitle)

  useEffect(() => {
    // Get all sections with data-title attribute
    const sections = document.querySelectorAll('section[data-title]')
    sectionsRef.current = Array.from(sections)

    if (sectionsRef.current.length === 0) {
      console.warn('DynamicTitle: No sections with data-title attribute found')
      return
    }

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio (most visible)
        let mostVisible = null
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry
          }
        })

        // If we have a visible section, update the title
        if (mostVisible && mostVisible.isIntersecting) {
          const newTitle = mostVisible.target.getAttribute('data-title')
          if (newTitle && newTitle !== currentTitleRef.current) {
            currentTitleRef.current = newTitle
            document.title = newTitle
          }
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: rootMargin,
        threshold: threshold
      }
    )

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      observerRef.current.observe(section)
    })

    // Set initial title
    document.title = defaultTitle
    currentTitleRef.current = defaultTitle

    // Check initial viewport to set title on page load
    const checkInitialSection = () => {
      const viewportTop = window.scrollY
      const viewportBottom = viewportTop + window.innerHeight
      const viewportCenter = viewportTop + window.innerHeight / 2

      // Find section closest to viewport center
      let closestSection = null
      let closestDistance = Infinity

      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height
        const sectionCenter = sectionTop + rect.height / 2

        // Check if section is in viewport
        if (sectionTop < viewportBottom && sectionBottom > viewportTop) {
          const distance = Math.abs(sectionCenter - viewportCenter)
          if (distance < closestDistance) {
            closestDistance = distance
            closestSection = section
          }
        }
      })

      if (closestSection) {
        const title = closestSection.getAttribute('data-title')
        if (title) {
          document.title = title
          currentTitleRef.current = title
        }
      }
    }

    // Check initial section after a short delay to ensure DOM is ready
    setTimeout(checkInitialSection, 100)

    // Cleanup function
    return () => {
      if (observerRef.current) {
        sectionsRef.current.forEach((section) => {
          observerRef.current.unobserve(section)
        })
        observerRef.current.disconnect()
      }
      // Reset to default title on unmount
      document.title = defaultTitle
    }
  }, [defaultTitle, rootMargin, threshold])

  // This component doesn't render anything
  return null
}

