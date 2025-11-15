// Fallback chatbot responses (rule-based, no API required)

const responses = {
  greetings: [
    "Hi! How can I help you today?",
    "Hello! What would you like to know?",
    "Hey! Ask me about services, portfolio, or skills."
  ],
  services: [
    "Services: Web Design, Web Development, Backend, UI/UX, and Mobile Apps.",
    "We offer Web Design, Development, Backend, UI/UX, and Mobile services.",
    "Services include Web Design, Development, Backend, UI/UX, and Mobile Apps."
  ],
  portfolio: [
    "Check the Portfolio section above. Muhammad Sohel has 50+ projects with 30+ clients over 5+ years.",
    "View 50+ projects in the Portfolio section. Scroll up to see them!",
    "Portfolio has 50+ projects. Check the Portfolio section above."
  ],
  skills: [
    "Skills: Frontend (React, Next.js), Backend, Web Design, UI/UX, and Mobile.",
    "Expert in Frontend, Backend, Web Design, UI/UX, and Mobile Development.",
    "Skills include Frontend, Backend, Web Design, UI/UX, and Mobile."
  ],
  contact: [
    "Use the Contact form below or check the footer for social links.",
    "Scroll to the Contact section below to get in touch.",
    "Contact via the form below or social links in the footer."
  ],
  pricing: [
    "Fill out the Contact form for pricing. We'll send you a quote.",
    "Contact us for pricing. Use the form below with your project details.",
    "Get pricing by filling the Contact form. We'll respond with a quote."
  ],
  experience: [
    "5+ years experience, 50+ projects, 30+ clients.",
    "Experience: 5+ years, 50+ projects, 30+ clients.",
    "5+ years in the industry with 50+ projects for 30+ clients."
  ],
  default: [
    "I can help with services, portfolio, skills, or contact info. What do you need?",
    "Ask about services, portfolio, skills, or how to contact us.",
    "I can tell you about services, portfolio, skills, or contact info."
  ]
}

export function getResponse(userMessage) {
  const message = userMessage.toLowerCase().trim()
  
  // Greetings
  if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)]
  }
  
  // Services
  if (message.match(/\b(service|services|what do you do|what can you do|offer|offering|provide)\b/)) {
    return responses.services[Math.floor(Math.random() * responses.services.length)]
  }
  
  // Portfolio
  if (message.match(/\b(portfolio|project|projects|work|showcase|examples|what have you built)\b/)) {
    return responses.portfolio[Math.floor(Math.random() * responses.portfolio.length)]
  }
  
  // Skills
  if (message.match(/\b(skill|skills|expertise|technologies|tech stack|what technologies|what can you build)\b/)) {
    return responses.skills[Math.floor(Math.random() * responses.skills.length)]
  }
  
  // Contact
  if (message.match(/\b(contact|get in touch|reach|email|phone|how to contact|hire|hire you)\b/)) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)]
  }
  
  // Pricing
  if (message.match(/\b(price|pricing|cost|how much|quote|budget|rate|rates)\b/)) {
    return responses.pricing[Math.floor(Math.random() * responses.pricing.length)]
  }
  
  // Experience
  if (message.match(/\b(experience|years|how long|background|about you|tell me about)\b/)) {
    return responses.experience[Math.floor(Math.random() * responses.experience.length)]
  }
  
  // Default response
  return responses.default[Math.floor(Math.random() * responses.default.length)]
}

