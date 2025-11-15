# AI Chat Setup - Concise Responses

This guide explains the AI chat setup with concise, short responses (1-2 sentences).

## Features

✅ **Concise AI Responses**: Limited to 1-2 short sentences  
✅ **Simple Language**: Easy to understand words  
✅ **Token Limit**: 50 tokens max per response  
✅ **Fallback Support**: Rule-based chatbot when OpenAI quota exceeded  
✅ **Mobile-Friendly**: Responsive design  

## API Route: `/api/chat`

### Configuration

The API route is configured to enforce short responses:

- **max_tokens**: 50 (ensures 1-2 sentences)
- **System Prompt**: Explicitly instructs AI to be brief
- **Temperature**: 0.7 (balanced creativity)

### System Prompt

```
You are a helpful AI assistant for SOHEL Developer's portfolio website. 

IMPORTANT: Always reply in 1-2 short sentences maximum. Use simple words. Be direct and concise. No long explanations.

You help visitors learn about:
- Web development services (Web Design, Web Development, Backend Development, UI/UX Design)
- Portfolio projects and technologies
- Skills and expertise
- How to contact SOHEL Developer

Keep every response brief and easy to understand.
```

## Environment Variables

Create or update `.env.local`:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-proj-your-api-key-here

# Optional: Supabase (for fallback)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Response Examples

### Before (Long)
```
"SOHEL Developer offers a comprehensive range of web development services including Web Design, Web Development, Backend Development, UI/UX Design, and Mobile App Development. Each service is tailored to meet your specific business needs and requirements. Would you like to know more about any specific service?"
```

### After (Concise)
```
"Services: Web Design, Web Development, Backend, UI/UX, and Mobile Apps."
```

## Code Files

### 1. API Route: `pages/api/chat.js`
- Handles OpenAI API calls
- Enforces 50 token limit
- Falls back to rule-based chatbot if quota exceeded

### 2. React Component: `components/ChatWidget.js`
- Displays chat interface
- Handles user input
- Shows loading states
- Mobile-responsive

### 3. Fallback Chatbot: `lib/chatbot-fallback.js`
- Rule-based responses
- All responses are 1-2 sentences
- No API required

## Testing

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open the chat widget (bottom-right corner)

3. Try these questions:
   - "What services do you offer?"
   - "Tell me about the portfolio"
   - "What are your skills?"
   - "How can I contact you?"

4. Verify responses are short (1-2 sentences)

## Customization

### Adjust Token Limit

In `pages/api/chat.js`, change `max_tokens`:

```javascript
max_tokens: 50, // Increase for longer responses (default: 50)
```

### Modify System Prompt

Update the system prompt in `pages/api/chat.js`:

```javascript
content: `Your custom system prompt here...`
```

### Update Fallback Responses

Edit `lib/chatbot-fallback.js` to customize fallback responses.

## Troubleshooting

### Responses are too long?

1. Check `max_tokens` is set to 50
2. Verify system prompt includes "1-2 short sentences"
3. Test with different questions

### Not getting responses?

1. Check OpenAI API key in `.env.local`
2. Verify API key is valid
3. Check browser console for errors
4. Check server logs for API errors

### Using fallback chatbot?

- This means OpenAI quota is exceeded
- Fallback responses are already concise
- Consider upgrading OpenAI plan or using fallback only

## Response Length Control

The system uses multiple methods to ensure short responses:

1. **Token Limit**: `max_tokens: 50` (hard limit)
2. **System Prompt**: Explicit instruction to be brief
3. **Fallback Responses**: Pre-written short responses
4. **Post-processing**: Could add truncation if needed

## Example API Request/Response

### Request
```json
POST /api/chat
{
  "message": "What services do you offer?",
  "conversationHistory": []
}
```

### Response
```json
{
  "message": "Services: Web Design, Web Development, Backend, UI/UX, and Mobile Apps.",
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 12,
    "total_tokens": 57
  }
}
```

## Notes

- Token limit of 50 ensures responses stay under ~40 words
- System prompt is critical for enforcing brevity
- Fallback chatbot responses are pre-written to be concise
- All responses are validated to be user-friendly

