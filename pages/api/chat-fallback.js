// Fallback chatbot API route that doesn't require OpenAI API
// Uses rule-based responses for common portfolio questions

import { getResponse } from '../../lib/chatbot-fallback.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Get response from rule-based system
    const aiMessage = getResponse(message)

    return res.status(200).json({ 
      message: aiMessage,
      source: 'fallback'
    })

  } catch (error) {
    console.error('Chat fallback API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    })
  }
}

