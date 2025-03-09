# Define 3.0

## EcoFinX
![EcoFinX Banner](https://github.com/Priyadharshan2003/D34ULT/blob/main/landingpage.png)

## 👥 Team D34ULT

| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| PRIYADHARSHAN | DEVELOPER | [@priyadharshan2003](https://github.com/priyadharshan2003) | [LinkedIn](https://in.linkedin.com/in/priyadharshan-chandranath) |
| ABINANTHAN | DEVELOPER | [@Abinanthan47](https://github.com/Abinanthan47) | [LinkedIn](https://www.linkedin.com/in/abinanthan-24btr/) |
| DINESH | DESIGNER | [@Dinesh-DK124](https://github.com/Dinesh-DK124) | [LinkedIn](https://in.linkedin.com/in/dinesh-dk-03979b265) |
| SOORYA GANESH | CONTENT STRATEGY | [@Sooryaganesh114](https://github.com/Sooryaganesh114) | [LinkedIn](https://www.linkedin.com/in/soorya-ganesh-sakthivel-94525a274) |



## Where Finance Meets Sustainability

**EcoFinX** is an innovative fintech platform that empowers users to manage finances with a strong focus on environmental impact. By combining powerful financial management tools with sustainability metrics, EcoFinX helps users make eco-conscious financial decisions while maintaining economic prosperity.

[![Project Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

## 🌟 Key Features

- **AI-Powered Financial Assistant** - Get personalized financial guidance and instant support through our advanced AI chatbot
- **Comprehensive Dashboard** - View your financial health and environmental impact at a glance
- **Carbon Footprint Tracking** - Monitor how your spending habits affect the environment
- **Transaction Management** - Track expenses, income, and budgets with an intuitive interface
- **Sustainability Insights** - Receive actionable tips to reduce your environmental impact
- **Investment Analysis** - Explore sustainable investment opportunities with ESG metrics

## 🛠️ Technologies Used

### Frontend
- **Next.js** - Server-side rendering and robust React framework
- **Tailwind CSS** - Utility-first styling for responsive design
- **Shadcn UI** - Customizable components for a polished user experience

### Backend
- **Node.js** - Server-side JavaScript runtime
- **PostgreSQL** - Relational database for structured financial data
- **Prisma** - Type-safe database client and ORM

### Authentication & Security
- **Clerk** - Secure authentication and user management
- **Arcjet** - Rate limiting and security protection

### AI & Integrations
- **Google Gemini API** - Powers our intelligent chatbot
- **Recharts** - Data visualization for financial metrics
- **Inngest** - Event-driven workflows and background processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- NPM or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Priyadharshan2003/D34ULT.git
cd D34ULT

# Install dependencies
npm install

# Set up environment variables
# Create a .env file based on .env.example

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🔧 Environment Variables

Create a `.env` file with the following variables:
```
DATABASE_URL=
DIRECT_URL=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
ARCJET_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=
```



## 🌐 System Architecture

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
    D1 --> H[CO₂ Data]
    E3 --> I[Investment Insights]
    H --> J[Visualizations]
    I --> K[Portfolio Suggestions]
```

##   Project Snapshots
![Landing Page](https://github.com/Priyadharshan2003/D34ULT/blob/main/landingpage.png)
![dashboard](https://github.com/Priyadharshan2003/D34ULT/blob/main/dashboard.png)
![Ai_bot](https://github.com/Priyadharshan2003/D34ULT/blob/main/Ai_chat_bot.png)
![EcoFinX Carbon Foot Print Tracking]()


## 🔮 Future Enhancements

- **Community Challenges** - Join eco-friendly financial challenges with other users
- **Advanced Analytics** - Deeper insights into spending patterns and carbon impact
- **Mobile Application** - Native apps for iOS and Android
- **Expanded Gamification** - More rewards and incentives for sustainable financial choices
- **Blockchain Integration** - For transparent carbon offset transactions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

This project was developed for **Define 3.0** Hackathon in the Fintech Track (AHURA). Special thanks to the mentors and organizers who made this possible.

---

© 2025 EcoFinX | Built with 💚 by Team D34ULT
