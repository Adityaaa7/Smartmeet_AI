# 🤖 SmartMeet_AI – AI-Powered Meeting Intelligence Platform

SmartMeet_AI is an intelligent meeting assistant that transforms raw meeting transcripts into **actionable insights**, helping teams save time and stay aligned.

---

## 🚀 Features

### 📝 Role-Based Summaries
- Generates customized summaries based on user roles (Manager, Developer, Designer, etc.)
- Focuses only on relevant information for each role  

### ✅ Action Item Extraction
- Automatically identifies tasks from discussions  
- Detects deadlines and assigns actionable items  

### 💬 Q&A Chatbot
- Ask questions related to the meeting  
- Get quick, contextual answers from transcripts  

---

## 🧠 Tech Stack

**Frontend:**
- React.js  

**Backend:**
- Node.js + Express  

**AI Microservice:**
- Flask (Python)  

**AI / NLP:**
- Transformer-based models (HuggingFace)  

**Database:**
- MongoDB  

---

## ⚙️ System Architecture

- MERN stack handles frontend + API layer  
- Flask microservice handles AI tasks (summarization, extraction)  
- Node.js communicates with Flask via REST APIs  
- Results stored in MongoDB and served to frontend  

---

## 🔄 Workflow

1. User uploads meeting transcript  
2. Node.js backend sends data to Flask microservice  
3. AI model processes transcript  
4. Generates:
   - Role-based summaries  
   - Action items with deadlines  
   - Contextual responses  
5. Data stored in MongoDB and displayed on UI  

---

## 🧪 Example Usage

### Input:
"Team discussed deadlines and assigned tasks. The frontend should be completed by Friday, and backend APIs need review."

### Output:

**Summary:**
The team discussed project timelines and task allocation.

**Action Items:**
- Complete frontend by Friday  
- Review backend APIs  

**Q&A:**
Q: What is the deadline?  
A: Friday  

---

## 🔐 Design Considerations

- Efficient handling of large transcripts using chunking  
- Separation of AI logic via Flask microservice  
- Controlled and structured outputs for better usability  

---

## 🚧 Future Improvements

- More accurate role detection  
- Real-time meeting processing  
- Improved UI/UX  
- Advanced NLP for better context understanding  

---

## 💡 Motivation

Manual meeting analysis is time-consuming and inefficient. SmartMeet_AI automates this process, helping teams focus on execution rather than documentation.

---

## 👨‍💻 Author

**Aditya Jagtap**  
AI + Full Stack Developer  
