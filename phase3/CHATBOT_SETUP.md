# AI Todo Chatbot - Setup & Testing Guide

## ✅ What's Been Configured

### Frontend
- ✅ Chat page created at `/authenticated/chat`
- ✅ Navigation updated with "AI Chat" link
- ✅ ChatInterface component ready
- ✅ Authentication integrated with existing JWT system

### Backend
- ✅ Chat API endpoint: `POST /api/{user_id}/chat`
- ✅ AI service with OpenAI integration
- ✅ MCP tools for task management
- ✅ JWT authentication (compatible with your existing auth)

## 🚀 How to Start Using Your Chatbot

### Step 1: Add Your OpenAI API Key

Edit `backend/.env` and replace `your-openai-api-key-here` with your actual OpenAI API key:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

**Don't have an OpenAI API key?**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

### Step 2: Start Both Backend Servers

You need to run TWO backend servers:

**Terminal 1 - Main Backend (Tasks API):**
```bash
cd backend/src
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Chatbot Backend (AI Chat API):**
```bash
cd backend
python -m app.main
```

The chatbot backend will run on port 8000 by default. If port 8000 is taken, it will use the next available port.

### Step 3: Start Frontend

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:3000

## 🧪 Testing Your Chatbot

### 1. Login to Your App
1. Open http://localhost:3000
2. Login with your credentials (or signup if you don't have an account)

### 2. Navigate to AI Chat
- Click on "💬 AI Chat" in the navigation menu
- You should see the chat interface

### 3. Try These Commands

**Create Tasks:**
```
Add a task to buy groceries
```
```
Create a todo: finish project report by Friday
```
```
Remind me to call mom tomorrow
```

**View Tasks:**
```
Show my tasks
```
```
What do I need to do?
```
```
List all my todos
```

**Complete Tasks:**
```
Mark task 1 as done
```
```
I finished buying groceries
```
```
Complete the first task
```

**Update Tasks:**
```
Change task 1 to 'buy organic food'
```
```
Update the first task
```

**Delete Tasks:**
```
Delete task 2
```
```
Remove the first task
```

## 🔧 Troubleshooting

### "Failed to send message"
**Problem:** Frontend can't reach the backend

**Solutions:**
1. Check that the chatbot backend is running
2. Verify the backend URL in frontend code
3. Check browser console for CORS errors

### "Unauthorized" or "Invalid token"
**Problem:** Authentication not working

**Solutions:**
1. Make sure you're logged in
2. Check that both backends use the same SECRET_KEY in `.env`
3. Try logging out and logging back in

### "AI service temporarily unavailable"
**Problem:** OpenAI API issues

**Solutions:**
1. Verify your OpenAI API key is correct in `backend/.env`
2. Check you have credits in your OpenAI account
3. Check OpenAI API status: https://status.openai.com/

### Backend won't start
**Problem:** Missing dependencies

**Solutions:**
```bash
cd backend
pip install -r requirements.txt
pip install python-jose[cryptography]
```

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│                   http://localhost:3000                  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Dashboard  │  │   AI Chat    │  │   New Task   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           │ JWT Token
                           │
        ┌──────────────────┴──────────────────┐
        │                                      │
        ▼                                      ▼
┌──────────────────┐              ┌──────────────────────┐
│  Main Backend    │              │  Chatbot Backend     │
│  (backend/src)   │              │  (backend/app)       │
│  Port 8000       │              │  Port 8000           │
│                  │              │                      │
│  • Auth          │              │  • AI Chat           │
│  • Tasks CRUD    │              │  • OpenAI            │
│  • Database      │              │  • MCP Tools         │
└──────────────────┘              └──────────────────────┘
        │                                      │
        └──────────────────┬───────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  SQLite Database │
                  │  mymemory.db     │
                  └─────────────────┘
```

## 🎯 What the Chatbot Can Do

The AI chatbot understands natural language and can:

1. **Create Tasks** - Extract task details from conversational input
2. **List Tasks** - Show all, completed, or incomplete tasks
3. **Update Tasks** - Modify task titles and descriptions
4. **Complete Tasks** - Mark tasks as done or undone
5. **Delete Tasks** - Remove tasks from your list

The chatbot is **stateless** - each message is independent, so be specific in your requests!

## 🔐 Security Notes

- Both backends share the same JWT secret for authentication
- Users can only access their own tasks
- All API endpoints require valid authentication
- OpenAI API key is stored securely in environment variables

## 📝 Next Steps

1. ✅ Add your OpenAI API key
2. ✅ Start both backend servers
3. ✅ Start frontend
4. ✅ Login and test the chatbot
5. 🚀 Deploy to production (optional)

## 🆘 Need Help?

If you encounter issues:
1. Check all three terminals for error messages
2. Verify all dependencies are installed
3. Make sure ports 3000 and 8000 are available
4. Check the browser console for frontend errors

Enjoy your AI-powered todo chatbot! 🎉
