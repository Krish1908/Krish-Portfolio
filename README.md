# 💻 Sanjay Krishna - DevOps Portfolio

A professional, high-performance, single-page portfolio designed for a **Production DevOps & Cloud Engineer**. Features premium glassmorphic dark/light design, system animations, interactive architectural diagrams, real-time scroll synchronization, and integrated form submission via EmailJS.

## 🚀 Live Demo & Repository
- **GitHub Page:** [https://github.com/Krish1908](https://github.com/Krish1908)
- **Email Contacts:** [tnsk1908@gmail.com](mailto:tnsk1908@gmail.com)

---

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5
- **Style:** Vanilla CSS3 (Custom Properties, Grid & Flex Layouts, Glassmorphism, Theme Transitions)
- **Logic:** Vanilla ES6 Javascript (Intersection Observers, Typewriter Effect, Custom Tab Controllers, API Handlers)
- **Form Handling:** EmailJS SDK integration with input validation (numeric phone validation, character constraints)

---

## 📁 Repository Structure
```text
PROF/
├── index.html                               # Core structure, navigation, and section markers
├── styles.css                               # Adaptive design token system and responsive layout engine
├── script.js                                # Interactive listeners, typewriter, tabs, and EmailJS config
├── Sanjay Krishna T N - CLOUD & DEVOPS Resume 04.pdf # Production DevOps Resume
└── README.md                                # Project documentation (this file)
```

---

## ⚡ Setup & Local Run

To run the portfolio locally:

1. Clone or open the workspace:
   ```bash
   cd PROF/
   ```
2. Launch a local web server of your choice:
   - **Python:**
     ```bash
     python -m http.server 8000
     ```
   - **Node.js (live-server):**
     ```bash
     npx live-server
     ```
3. Open `http://localhost:8000` (or the port specified by your tool) in your web browser.

---

## 📧 EmailJS Configuration
Form submission is routed through **EmailJS**. Credentials are coded in `script.js`:
- **Public Key:** `F2C8G6XHddb45MXDM`
- **Service ID:** `service_yvez5q6`
- **Template ID:** `template_auaz8v8`

### Template Variables
The template expects the following parameters:
- `name`: Sender's name
- `email`: Sender's email address
- `country_code`: Selected country code (e.g. `+91`, `+1`)
- `mobile`: Sender's mobile number (numeric, 7–15 digits)
- `subject`: Topic of interest
- `message`: Detailed inquiry message

---

## 📱 Responsiveness & Optimization
- **Grids & Layouts:** Automatically transition from 3/4-columns to single column stacks on viewport widths `< 1024px` and `< 768px`.
- **Diagrams:** Interactive architecture schemas auto-wrap and reorient into vertical flows with arrow rotation on mobile screens.
- **Scroll Observer:** Staggered lazy-loading transitions keep initial load light and animate content elements dynamically on visibility triggers.
