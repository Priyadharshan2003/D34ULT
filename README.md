
# Define 3.0
The official template repository for Define 3.0

![DefineHack 2025 Logo](https://github.com/user-attachments/assets/8173bc16-418e-4912-b500-c6427e4ba4b6)



# EcoFinX
 Cover Image  If applicable

### Team Information
- **Team Name**: D34ULT 
- **Track**: Fintech Track (AHURA)

### Team Members
| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| PRIYADHARSHAN | DEVELOPER | [@priyadharshan2003](https://github.com/priyadharshan2003) | [linkedin](https://in.linkedin.com/in/priyadharshan-chandranath) |
| ABINANTHAN | DEVELOPER | [@Abinanthan47](https://github.com/Abinanthan47) | [linkedin](https://www.linkedin.com/in/abinanthan-24btr/) |
| DINESH | DESIGNER | [@Dinesh-DK124](https://github.com/Dinesh-DK124) | [linkedin](https://in.linkedin.com/in/dinesh-dk-03979b265) |
| SOORYA GANESH | CONTENT STRATEGY | [@Sooryaganesh114](https://github.com/Sooryaganesh114) | [linkedin](https://www.linkedin.com/in/soorya-ganesh-sakthivel-94525a274) |

## Project Details

### Overview
_The "EcoFinX" is a prototype fintech website designed to empower users with financial insights and seamless customer support through an AI-powered chatbot. It features a clean, intuitive interface with a dynamic dashboard displaying personalized financial data and sustainability metrics, promoting eco-conscious financial decisions. By integrating advanced technologies like NLP, predictive analytics, and blockchain, the project aims to redefine fintech accessibility while prioritizing sustainability._

### Problem Statement
_Traditional fintech platforms often lack personalized, real-time financial guidance and fail to integrate sustainability into user experiences, leaving users uninformed about the environmental impact of their financial choices. Customer support is typically slow or generic, and dashboards are cluttered, making it hard for users to interpret data effectively. There’s a need for an innovative, user-friendly fintech solution that combines AI-driven insights, robust support, and a focus on sustainable finance to address these gaps._

### Solution
_EcoFinX delivers a sophisticated yet accessible fintech website prototype that empowers users to manage their finances and embrace sustainability through an integrated AI-driven ecosystem. The solution features a clean, intuitive dashboard displaying real-time financial metrics (income/expenses, savings goals, investments) alongside sustainability metrics (carbon footprint, eco-score, green tips), ensuring users gain a holistic view of their wealth and its environmental impact. An AI-powered chatbot enhances the experience by providing instant customer support (FAQs), actionable financial tips, and personalized analysis, leveraging APIs like Climatiq for CO₂ data and ESG/Sustainability APIs for investment insights. To drive engagement, a gamification layer rewards users with points, badges, and leaderboard rankings for achieving financial and sustainability milestones—transforming responsible finance into an interactive, motivating journey. By combining cutting-edge technology with a sustainability-first approach, SustainaFin redefines fintech as a tool for both personal prosperity and planetary good._

### Demo
[![Project Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
_Replace VIDEO_ID with your YouTube video ID or provide an alternative demo link_

### Live Project
[Project Name](https://your-project-url.com)

## Technical Implementation


## Technologies Used

### Frontend
- **Next.js** - _For server-side rendering, static site generation, and a robust React framework._
- **TypeScript** - _For type-safe JavaScript development, improving code reliability._
- **JavaScript** - _Core scripting language for dynamic frontend features._

### UI
- **Tailwind CSS** - _For rapid, utility-first styling with a clean, responsive design._
- **Shadcn UI** - _For pre-built, customizable UI components to accelerate dashboard and chatbot development._

### Backend
- **Node.js** - _Runtime for executing server-side JavaScript._
- **Express.js** - _Lightweight framework for building API routes and handling backend logic._

### Database
- **PostgreSQL/MongoDB** - _PostgreSQL for structured financial/sustainability data or MongoDB for flexible, document-based storage._

### APIs
- **Gemini API** - _For AI-powered chatbot functionality, providing financial insights and NLP capabilities._
- **Climatiq API** - _For calculating carbon footprints and integrating sustainability metrics._
- **ESG/Sustainability APIs** - _For green investment insights and portfolio suggestions._

### DevOps
- **Vercel** - _For seamless frontend deployment, hosting, and domain management._
- **Firebase** - _For real-time database features (e.g., gamification scores) and authentication backup._
- **Inngest** - _For event-driven workflows, such as triggering gamification updates or API calls._

### Other Tools
- **Clerk Auth** - _For secure, user-friendly authentication (login/signup flows)._
- **Git/GitHub** - _For version control and collaboration._
  
## Key Features

- **Interactive Dashboard**  
  _A centralized hub displaying financial and sustainability insights, providing users with a clear overview of their money and environmental impact._

- **Financial Metrics Tracking**  
  _Monitor income/expenses, savings goals, and investments in real-time with intuitive visualizations for smarter financial decisions._

- **Sustainability Metrics**  
  _Track your carbon footprint, eco-score, and receive green tips powered by the Climatiq API, promoting eco-conscious living._

- **AI-Powered Chatbot**  
  _Get instant support with FAQs, actionable financial tips, and personalized AI analysis leveraging Gemini and ESG/Sustainability APIs._

- **Investment Insights**  
  _Receive tailored portfolio suggestions based on ESG data, helping users invest sustainably and profitably._

- **Gamification (Coming Soon)**  
  _Earn points and badges for achieving financial and sustainability goals, with a leaderboard to inspire friendly competition._

## Flowchart
Below is the system architecture visualized as a flowchart

```
flowchart TD
    A[User] --> B[Dashboard]
    B --> C[Financial Metrics]
    B --> D[Sustainability Metrics]
    B --> E[AI Chatbot]
    C --> C1[Income/Expenses]
    C --> C2[Savings Goals]
    C --> C3[Investments]
    D --> D1[Carbon Footprint]
    D --> D2[Eco-Score]
    D --> D3[Green Tips]
    E --> E1[FAQs]
    E --> E2[Actionable Tips]
    E --> E3[AI Analysis]
    D3 --> F[Climatiq API]
    E3 --> G[ESG/Sustainability APIs]
    F --> H[CO₂ Data]
    G --> I[Investment Insights]
    H --> J[Visualizations]
    I --> K[Portfolio Suggestions]
```

## Additional Resources

## Project Timeline
### Development Process and Milestones

EcoFinX was built in a streamlined 24-hour sprint, balancing rapid development with robust functionality. The process followed a phased approach to deliver a fintech prototype with an AI chatbot, dashboard, and sustainability features.

- **Phase 1: Planning & Setup (Hours 1-2)**  
  _Milestone_: Project initialized with Next.js, TypeScript, Tailwind CSS, Clerk Auth, and database (PostgreSQL/MongoDB) configured.  
  Defined scope and set up API routes for core features.

- **Phase 2: Core Development (Hours 3-6)**  
  _Milestone_: Functional dashboard displaying financial metrics and sustainability data, plus an AI chatbot integrated with Gemini API for basic FAQs and advice.

- **Phase 3: Enhancements (Hours 7-12)**  
  _Milestone_: Added Climatiq API for carbon footprint tracking, ESG API mockups for investment insights, and initial gamification logic (points system via Firebase).

- **Phase 4: Polish & Deployment (Hours 13-16)**  
  _Milestone_: Deployed frontend on Vercel, backend on Railway, optimized UI/UX with Shadcn UI, and ensured mobile responsiveness.

- **Phase 5: Finalization (Hours 17-24)**  
  _Milestone_: Completed testing, produced demo video and pitch deck, and submitted the project with documentation highlighting sustainability impact.


### Challenges Faced
_Discuss technical challenges and how you overcame them_

### Future Enhancements
_Share your vision for future development_

### References (if any)
- [Reference 1](link)
- [Reference 2](link)

---

### Submission Checklist
- [ ] Completed all sections of this README
- [ ] Added project demo video
- [ ] Provided live project link
- [ ] Ensured all team members are listed
- [ ] Included setup instructions
- [ ] Submitted final code to repository

---

© Define 3.0 | [Define 3.0](https://www.define3.xyz/)
