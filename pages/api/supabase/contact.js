import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format'
      })
    }

    // Insert contact message into Supabase
    // Note: You'll need to create a 'contact_messages' table in Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          subject: subject || 'No subject',
          message,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ 
        error: 'Failed to save contact message',
        details: error.message
      })
    }

    return res.status(200).json({ 
      success: true,
      message: 'Contact message saved successfully',
      data: data[0]
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    })
  }
}

