
# 📬 EmailFlow Frontend

This is the **frontend** of the EmailFlow application — a drag-and-drop tool to design, connect, and schedule automated email sequences visually.

---

## 🌐 Live Demo
👉 [View the Live App](https://your-deployment-link.com) 

---

## 🖼️ Screenshots
<!-- Add actual image links if available -->
![Flow Builder](/app-screenshot.png)

---

## 🛠️ Tech Stack

- **React.js**
- **Redux** (global state management)
- **React Router DOM**
- **React Flow (XYFlow)** for flowchart nodes
- **React Toastify** for notifications
- **Google OAuth 2.0** for authentication

---

## 🚀 Features

- Visual flowchart builder for email sequences
- Add nodes ( Cold Email, Delay) using buttons
- Nodes: Lead Source, Cold Email, Delay
- Connect nodes using auto-connect logic
- Validate flowchart before saving
- Protected routes using JWT & OAuth
- Real-time feedback via Toast notifications
- Responsive and modern UI

---

## 🔐 Authentication

- Login/Signup with JWT
- Google OAuth integration
- Token stored in `localStorage`
- Automatic session expiry detection
- ProtectedRoute logic using Redux state

**Demo Credentials:**

```bash
Email: demo@email.com
Password: demoPassword
```

---

## 📂 Folder Structure

```
frontend/
├── Components/
│   ├── AuthForms/
│   └── FlowChartBuilder.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   ├── ProtectedRoute.js
│   └── Dashboard.js
│
├── store/
│   └── authSlice.js
├── utils/
│   ├── ValidateFlowchart.js
│   └── isTokenExpired.js
├── styles/
│   ├── App.css
│   ├── Auth.module.css
│   └── Dashboard.module.css
├── App.js
├── index.js
```

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Gayatri3012/Emailflow-frontend.git
cd emailflow-frontend
npm install
npm start
```

Create a `.env` file:

```env
REACT_APP_CLIENT_ID=your-client-id
```

---

## 🔄 Routing Structure

Handled with `react-router-dom`:

- `/` – Home
- `/signup` – Signup Page
- `/login` – Login Page
- `/dashboard` – User Dashboard (Protected)
- `/emailFlow` – New Flowchart Builder (Protected)
- `/emailFlow/:id` – Edit Flowchart (Protected)

---

## 🌐 OAuth Integration

Google OAuth is used for login/signup. Upon successful login, JWT token and user info are stored in localStorage and used in Authorization headers for API calls.

---

## 🧪 Testing

Basic unit and component tests:

- `App.test.js`
- `setupTests.js`

Run tests with:

```bash
npm test
```

---

## ⚠️ Known Issues

- No drag-and-drop for nodes (added via buttons)
- Initial load delay due to Render/Vercel cold starts

---

## 👩‍💻 Author

- [@Gayatri3012](https://github.com/Gayatri3012)
- Email: takawalegayatri@email.com

---

## 🧾 License

MIT – For educational/demo purposes only.
