// Use regular anchor tags for smooth scroll within page
const ScrollLink = ({ href, children, className }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

export default function Services() {
  const services = [
    {
      number: "01",
      icon: "bx-palette",
      title: "Website Design",
      description: "Creating stunning, user-friendly interfaces that captivate audiences and drive engagement. Modern design principles meet creative innovation."
    },
    {
      number: "02",
      icon: "bx-code-alt",
      title: "Website Development",
      description: "Building responsive, high-performance websites using the latest technologies. Clean code, fast loading, and seamless user experiences."
    },
    {
      number: "03",
      icon: "bx-server",
      title: "Backend Development",
      description: "Robust server-side solutions with scalable architecture. Secure APIs, database optimization, and cloud integration for peak performance."
    },
    {
      number: "04",
      icon: "bx-mobile-alt",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences. iOS and Android solutions tailored to your needs."
    },
    {
      number: "05",
      icon: "bx-line-chart",
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality. Intuitive interfaces that enhance user satisfaction and business goals."
    },
    {
      number: "06",
      icon: "bx-rocket",
      title: "Consulting & Strategy",
      description: "Expert guidance on technology decisions, digital transformation, and growth strategies. Turn your vision into a successful digital reality."
    }
  ]

  return (
    <section className="service" id="service" data-title="Services - SOHEL Developer">
      <div className="service-wrapper">
        <div className="service-header">
          <span className="section-tag">What I Offer</span>
          <h2 className="section-title">My <span>Services</span></h2>
          <p className="section-description">Delivering exceptional digital solutions with cutting-edge technology and creative excellence</p>
        </div>

        <div className="service_container">
          {services.map((service, index) => (
            <div key={index} className="service_box">
              <div className="service_icon">
                <i className={`bx ${service.icon}`}></i>
                <div className="icon-bg"></div>
              </div>
              <div className="service_info">
                <span className="service_number">{service.number}</span>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <ScrollLink href="#contact" className="service_link">
                  <span>Learn More</span>
                  <i className='bx bx-right-arrow-alt'></i>
                </ScrollLink>
              </div>
              <div className="service_overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

