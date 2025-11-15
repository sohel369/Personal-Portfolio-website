export default function Testimonials() {
  const testimonials = [
    {
      text: "Working with SOHEL was an absolute pleasure! The attention to detail and creative solutions exceeded all our expectations. Our website has never looked better and performs flawlessly.",
      author: "Sara Johnson",
      role: "CEO, Tech Solutions",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1FUcaJKIIkvIVBkOxVg7V_ZjkR6TDRUKkBA&s"
    },
    {
      text: "Outstanding professionalism and expertise! The team delivered a stunning mobile app that perfectly captured our vision. Highly recommend for anyone looking for top-tier development services.",
      author: "Julia Martinez",
      role: "Founder, Digital Innovations",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VKusgK4hhO606vBQ57noi3ssDAK8BvoRHg&s"
    },
    {
      text: "Exceptional work! The backend infrastructure they built is rock-solid and scalable. Our platform handles thousands of users seamlessly. Couldn't be happier with the results!",
      author: "Sadia Ahmed",
      role: "CTO, Cloud Systems",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR8Q-kfuO9BK0o_qZVxLwW-CNdFRnoEhMbjA&s"
    }
  ]

  return (
    <section className="testimonials" id="testimonials" data-title="Testimonials - SOHEL Developer">
      <div className="testimonials-wrapper">
        <div className="testimonials-header">
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">What Clients <span>Say</span></h2>
          <p className="section-description">Hear from satisfied clients who have experienced exceptional results and outstanding service</p>
        </div>

        <div className="testimonials_container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial_card">
              <div className="quote-icon">
                <i className='bx bxs-quote-alt-left'></i>
              </div>
              <div className="testimonial_content">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="testimonial_text">"{testimonial.text}"</p>
              </div>
              <div className="testimonial_author">
                <div className="author_image">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div className="image_border"></div>
                </div>
                <div className="author_info">
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
              <div className="card_overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

