import nodemailer from 'nodemailer'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message, phone } = req.body

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

    // Get SMTP configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }

    // Check if SMTP is configured
    const isSmtpConfigured = smtpConfig.auth.user && smtpConfig.auth.pass && 
                             smtpConfig.auth.user !== 'your-email@gmail.com' && 
                             smtpConfig.auth.pass !== 'your-app-password-here'
    
    if (!isSmtpConfigured) {
      console.warn('SMTP credentials not configured, will only save to database', {
        hasUser: !!smtpConfig.auth.user,
        hasPass: !!smtpConfig.auth.pass
      })
      
      // Try to save to database even if SMTP is not configured
      let dbResult = null
      try {
        const { data, error } = await supabaseAdmin
          .from('contact_messages')
          .insert([
            {
              name,
              email,
              phone: phone || null,
              subject: subject || 'No subject',
              message,
              created_at: new Date().toISOString()
            }
          ])
          .select()

        if (error) {
          console.error('Supabase error:', error)
          return res.status(500).json({ 
            error: 'Contact form is not fully configured',
            details: 'Please configure SMTP_USER and SMTP_PASS in Vercel environment variables. For Gmail, you need to create an App Password (not your regular password).',
            note: 'Your message could not be saved. Please try contacting directly via email.'
          })
        } else {
          dbResult = data[0]
          console.log('Message saved to database:', dbResult.id)
        }
      } catch (dbError) {
        console.error('Database save error:', dbError)
        return res.status(500).json({ 
          error: 'Contact form is not fully configured',
          details: 'Please configure SMTP_USER and SMTP_PASS in Vercel environment variables. For Gmail, you need to create an App Password (not your regular password).',
          note: 'Your message could not be saved. Please try contacting directly via email.'
        })
      }
      
      // Return success even without email (message saved to DB)
      return res.status(200).json({ 
        success: true,
        message: 'Message received! We\'ll get back to you soon.',
        dbId: dbResult?.id,
        note: 'Note: Email notifications are not configured. Your message has been saved to our database.'
      })
    }
    
    // Warn if using placeholder values
    if (smtpConfig.auth.user === 'your-email@gmail.com' || smtpConfig.auth.pass === 'your-app-password-here') {
      console.warn('WARNING: SMTP credentials appear to be placeholder values!')
    }

    // Create transporter
    let transporter
    try {
      transporter = nodemailer.createTransport(smtpConfig)
    } catch (transporterError) {
      console.error('Failed to create transporter:', transporterError)
      // Fall back to database-only save
      try {
        const { data, error } = await supabaseAdmin
          .from('contact_messages')
          .insert([
            {
              name,
              email,
              phone: phone || null,
              subject: subject || 'No subject',
              message,
              created_at: new Date().toISOString()
            }
          ])
          .select()

        if (error) {
          throw error
        }
        
        return res.status(200).json({ 
          success: true,
          message: 'Message received! We\'ll get back to you soon.',
          dbId: data[0]?.id,
          note: 'Note: Email service is temporarily unavailable. Your message has been saved.'
        })
      } catch (dbError) {
        return res.status(500).json({ 
          error: 'Failed to process your message',
          details: 'Please try again later or contact directly via email.'
        })
      }
    }

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', {
        code: verifyError.code,
        command: verifyError.command,
        response: verifyError.response,
        responseCode: verifyError.responseCode,
        message: verifyError.message
      })
      
      // Provide more specific error messages
      let errorDetails = 'Failed to connect to email server. '
      
      if (verifyError.code === 'EAUTH') {
        errorDetails += 'Authentication failed. Please check your SMTP_USER and SMTP_PASS in .env.local. Make sure you\'re using an App Password for Gmail, not your regular password.'
      } else if (verifyError.code === 'ECONNECTION' || verifyError.code === 'ETIMEDOUT') {
        errorDetails += 'Could not connect to SMTP server. Check your SMTP_HOST and SMTP_PORT settings, and ensure your firewall allows the connection.'
      } else if (verifyError.code === 'EENVELOPE') {
        errorDetails += 'Invalid email address. Please check TO_EMAIL and FROM_EMAIL in .env.local.'
      } else {
        errorDetails += `Error: ${verifyError.message || verifyError.code || 'Unknown error'}. Please verify your SMTP settings in .env.local.`
      }
      
      // Check if credentials are still placeholders
      if (smtpConfig.auth.user === 'your-email@gmail.com' || smtpConfig.auth.pass === 'your-app-password-here') {
        errorDetails += ' NOTE: Your SMTP credentials appear to be placeholder values. Please update them with your actual Gmail credentials and App Password.'
      }
      
      return res.status(500).json({ 
        error: 'Email service configuration error',
        details: errorDetails,
        debug: process.env.NODE_ENV === 'development' ? {
          host: smtpConfig.host,
          port: smtpConfig.port,
          user: smtpConfig.auth.user ? smtpConfig.auth.user.substring(0, 3) + '***' : 'not set',
          hasPassword: !!smtpConfig.auth.pass
        } : undefined
      })
    }

    // Prepare email content
    const receiverEmail = process.env.TO_EMAIL || 'sohel0130844@gmail.com'
    const fromEmail = process.env.FROM_EMAIL || smtpConfig.auth.user
    const emailSubject = subject || `New Contact Form Message from ${name}`
    
    const mailOptions = {
      from: `"${name}" <${fromEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #00eeee 0%, #0088cc 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #00eeee; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00eeee; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                ${subject ? `
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>This message was sent from your portfolio website contact form.</p>
                  <p>You can reply directly to this email to respond to ${name}.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${subject ? `Subject: ${subject}\n` : ''}
Message:
${message}

---
This message was sent from your portfolio website contact form.
You can reply directly to this email to respond to ${name}.
      `
    }

    // Send email
    let emailResult
    try {
      emailResult = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', emailResult.messageId)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: emailError.message || 'Unknown error occurred while sending email'
      })
    }

    // Save to Supabase database (optional but recommended)
    let dbResult = null
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            phone: phone || null,
            subject: subject || 'No subject',
            message,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error (non-critical):', error)
        // Don't fail the request if DB save fails, email was sent successfully
      } else {
        dbResult = data[0]
        console.log('Message saved to database:', dbResult.id)
      }
    } catch (dbError) {
      console.error('Database save error (non-critical):', dbError)
      // Continue even if database save fails
    }

    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      emailId: emailResult.messageId,
      dbId: dbResult?.id
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    })
  }
}

