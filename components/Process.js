export default function Process() {
  const steps = [
    {
      number: "01",
      icon: "bx-search-alt-2",
      title: "Discovery & Planning",
      description: "Understanding your vision, goals, and requirements. We discuss project scope, timeline, and create a detailed plan to ensure we're aligned from day one."
    },
    {
      number: "02",
      icon: "bx-code-alt",
      title: "Development & Design",
      description: "Building your solution with clean code and modern design. Regular updates and iterations ensure the project evolves exactly as you envision it."
    },
    {
      number: "03",
      icon: "bx-rocket",
      title: "Launch & Support",
      description: "Deploying your project with thorough testing and optimization. Ongoing support ensures everything runs smoothly and continues to meet your needs."
    }
  ]

  return (
    <section className="process" id="process" data-title="Process - Muhammad Sohel">
      <div className="process-wrapper">
        <div className="process-header">
          <span className="section-tag">My Approach</span>
          <h2 className="section-title">How I <span>Work</span></h2>
          <p className="section-description">A proven process that ensures successful project delivery and client satisfaction</p>
        </div>

        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">
                <i className={`bx ${step.icon}`}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

