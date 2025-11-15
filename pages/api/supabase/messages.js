import { supabaseAdmin } from '../../../lib/supabase'

// GET - Fetch all contact messages (admin only)
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ 
          error: 'Failed to fetch messages',
          details: error.message
        })
      }

      return res.status(200).json({ 
        success: true,
        messages: data || []
      })

    } catch (error) {
      console.error('Messages API error:', error)
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

