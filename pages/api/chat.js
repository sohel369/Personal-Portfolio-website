export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, conversationHistory = [] } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const apiKey = process.env.OPENAI_API_KEY

    // If API key is missing, automatically use fallback chatbot
    if (!apiKey) {
      console.log('OPENAI_API_KEY is missing, using fallback chatbot')
      try {
        const { getResponse } = await import('../../lib/chatbot-fallback.js')
        const fallbackResponse = getResponse(message)
        return res.status(200).json({ 
          message: fallbackResponse,
          source: 'fallback'
        })
      } catch (fallbackError) {
        console.error('Fallback chatbot error:', fallbackError)
        return res.status(200).json({ 
          message: "I can help you with information about services, portfolio projects, skills, and how to contact Muhammad Sohel. Please use the Contact form below to get in touch directly!",
          source: 'fallback'
        })
      }
    }

    console.log('API Key found:', apiKey.substring(0, 10) + '...')

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant for Muhammad Sohel's portfolio website. 

IMPORTANT: Always reply in 1-2 short sentences maximum. Use simple words. Be direct and concise. No long explanations.

You help visitors learn about:
- Web development services (Web Design, Web Development, Backend Development, UI/UX Design)
- Portfolio projects and technologies
- Skills and expertise
- How to contact Muhammad Sohel

Keep every response brief and easy to understand.`
      },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      {
        role: 'user',
        content: message
      }
    ]

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 50, // Limit to 50 tokens for short responses (1-2 sentences)
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })
      
      // Check for quota/billing errors
      const errorMessage = errorData.error?.message || ''
      const errorCode = errorData.error?.code || ''
      const isQuotaError = errorMessage.includes('quota') || 
                          errorMessage.includes('billing') || 
                          errorCode === 'insufficient_quota' ||
                          response.status === 429
      
      // If quota exceeded, use fallback chatbot
      if (isQuotaError) {
        console.log('OpenAI quota exceeded, using fallback chatbot')
        try {
          const { getResponse } = await import('../../lib/chatbot-fallback.js')
          const fallbackResponse = getResponse(message)
          return res.status(200).json({ 
            message: fallbackResponse,
            source: 'fallback'
          })
        } catch (fallbackError) {
          console.error('Fallback chatbot error:', fallbackError)
          return res.status(200).json({ 
            message: "I can help you with information about services, portfolio projects, skills, and how to contact Muhammad Sohel. Please use the Contact form below to get in touch directly!",
            source: 'fallback'
          })
        }
      }
      
      return res.status(response.status).json({ 
        error: 'Failed to get AI response',
        details: errorMessage || errorCode || `HTTP ${response.status}: ${response.statusText}`,
        errorType: 'api_error',
        fullError: process.env.NODE_ENV === 'development' ? errorData : undefined
      })
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return res.status(200).json({ 
      message: aiMessage,
      usage: data.usage
    })

  } catch (error) {
    console.error('Chat API error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

