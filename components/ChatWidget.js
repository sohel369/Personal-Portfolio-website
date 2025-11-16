import { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "Hi! How can I help you today?",
      isUser: false,
      time: "Just now"
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)
  const messagesEndRef = useRef(null)

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      text,
      isUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const sendMessage = async () => {
    const message = inputValue.trim()
    if (!message || isLoading) return

    // Add user message
    addMessage(message, true)
    setInputValue('')
    setIsLoading(true)

    // Prepare conversation history for API
    const conversationHistory = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }))

    try {
      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: conversationHistory
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // If we have a fallback response, use it instead of throwing error
        if (data.source === 'fallback' && data.message) {
          addMessage(data.message, false)
          return
        }
        
        // Try to use fallback API if main API fails
        if (response.status === 500 && data.error) {
          console.warn('Main chat API failed, trying fallback:', data.error)
          try {
            const fallbackResponse = await fetch('/api/chat-fallback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: message })
            })
            const fallbackData = await fallbackResponse.json()
            if (fallbackResponse.ok && fallbackData.message) {
              addMessage(fallbackData.message, false)
              return
            }
          } catch (fallbackErr) {
            console.error('Fallback API also failed:', fallbackErr)
          }
        }
        
        const errorMsg = data.details || data.error || 'Failed to get response'
        console.error('API Error:', { status: response.status, data })
        throw new Error(errorMsg)
      }

      // Add AI response (works for both OpenAI and fallback)
      addMessage(data.message, false)
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Try fallback API as last resort
      try {
        const fallbackResponse = await fetch('/api/chat-fallback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message })
        })
        const fallbackData = await fallbackResponse.json()
        if (fallbackResponse.ok && fallbackData.message) {
          addMessage(fallbackData.message, false)
          return
        }
      } catch (fallbackErr) {
        console.error('Fallback API also failed:', fallbackErr)
      }
      
      // If all else fails, show helpful error message
      const errorMessage = error.message || "Sorry, I'm having trouble connecting right now. Please try again later or check the Contact section for other ways to reach out."
      addMessage(
        `I'm having trouble connecting. ${errorMessage.includes('check your .env.local') ? 'The chat service is being configured. ' : ''}Please use the Contact form below to get in touch!`,
        false
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (message) => {
    setInputValue(message)
    setTimeout(() => {
      sendMessage()
    }, 100)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      const input = chatContainerRef.current.querySelector('.chat-input')
      if (input) {
        input.focus()
      }
    }
  }, [isOpen])

  return (
    <div className="ai-chat-widget" id="aiChatWidget">
      <div 
        className="chat-toggle" 
        id="chatToggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className='bx bx-bot'></i>
        <span className="chat-badge">AI</span>
      </div>
      <div 
        className={`chat-container ${isOpen ? 'active' : ''}`} 
        id="chatContainer"
        ref={chatContainerRef}
      >
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <i className='bx bx-bot'></i>
            </div>
            <div className="chat-header-text">
              <h3>AI Assistant</h3>
              <span className="chat-status">Online</span>
            </div>
          </div>
          <button 
            className="chat-close" 
            id="chatClose"
            onClick={() => setIsOpen(false)}
          >
            <i className='bx bx-x'></i>
          </button>
        </div>
        <div className="chat-messages" id="chatMessages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
              <div className="message-avatar">
                <i className={msg.isUser ? 'bx bx-user' : 'bx bx-bot'}></i>
              </div>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot-message">
              <div className="message-avatar">
                <i className='bx bx-bot'></i>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-input" 
              id="chatInput" 
              placeholder={isLoading ? "AI is typing..." : "Type your message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  sendMessage()
                }
              }}
              disabled={isLoading}
            />
            <button 
              className="chat-send" 
              id="chatSend"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className='bx bx-loader-alt bx-spin'></i>
              ) : (
                <i className='bx bx-send'></i>
              )}
            </button>
          </div>
          <div className="chat-quick-replies">
            <button 
              className="quick-reply-btn"
              onClick={() => handleQuickReply('Tell me about services')}
            >
              Tell me about services
            </button>
            <button 
              className="quick-reply-btn"
              onClick={() => handleQuickReply('View portfolio')}
            >
              View portfolio
            </button>
            <button 
              className="quick-reply-btn"
              onClick={() => handleQuickReply('Contact info')}
            >
              Contact info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

