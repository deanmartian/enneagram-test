# Enneagram Test Norway 🇳🇴

A professional Norwegian Enneagram personality test with expert validation by Marit Reiersgård. This comprehensive assessment consists of 99 carefully crafted questions designed to accurately determine your Enneagram personality type.

## 🌟 Features

- **99 Comprehensive Questions**: Scientifically validated questions for accurate type assessment
- **Expert Validation**: All content reviewed and validated by Enneagram expert Marit Reiersgård
- **Detailed Type Analysis**: In-depth personality type descriptions and insights
- **Newsletter Integration**: Built-in email collection for ongoing Enneagram insights
- **Database Ready**: Structured for easy database integration and result storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **GDPR Compliant**: Cookie consent and privacy policy included
- **Modern UI/UX**: Clean, professional design with smooth user experience

## 🛠️ Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React icons
- **Runtime**: Bun for fast package management
- **Linting**: Biome for code formatting and linting
- **Deployment**: Netlify-ready configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/deanmartian/enneagram-test-norway.git
   cd enneagram-test-norway
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run TypeScript and ESLint checks
- `bun format` - Format code with Biome

## 📁 Project Structure

```
enneagram-test/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── test/           # Test page with questions
│   │   ├── result/         # Results page
│   │   ├── privacy/        # Privacy policy
│   │   └── cookies/        # Cookie policy
│   ├── components/         # React components
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── NewsletterSignup.tsx
│   │   └── ...
│   ├── data/              # Static data
│   │   ├── questions.json  # All 99 test questions
│   │   ├── types.ts       # Enneagram type definitions
│   │   └── expert.ts      # Expert information
│   ├── lib/               # Utility functions
│   │   ├── scoring.ts     # Test scoring logic
│   │   ├── database.ts    # Database utilities
│   │   └── newsletter.ts  # Newsletter integration
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
│   └── images/           # Expert photos and assets
└── data/                 # Alternative data location
```

## 🧮 Test Scoring Logic

The test uses a sophisticated scoring algorithm that:
- Analyzes responses across 99 questions
- Weights questions based on their relevance to each type
- Calculates confidence scores for all 9 Enneagram types
- Determines the most likely primary type
- Provides insights into secondary types (wing)

## 🎨 Design Features

- **Professional Color Scheme**: Calming blues and whites for a trustworthy feel
- **Responsive Layout**: Optimized for all device sizes
- **Progress Tracking**: Visual progress bar throughout the test
- **Smooth Transitions**: Elegant animations and page transitions
- **Accessibility**: Built with accessibility best practices

## 📊 Production Deployment

### Netlify Deployment

The project includes a `netlify.toml` configuration file for easy deployment:

1. Connect your GitHub repository to Netlify
2. The build settings are automatically configured
3. Deploy with a single click

### Environment Variables

For production, you may want to set up:
- `NEWSLETTER_API_KEY` - For newsletter service integration
- `DATABASE_URL` - For database connection
- `ANALYTICS_ID` - For analytics tracking

## 🧪 Testing

The application includes comprehensive test data and validation:
- All 99 questions are stored in structured JSON format
- Type definitions ensure data consistency
- Expert validation ensures accuracy of results

## 🤝 Contributing

This is a professional project with expert validation. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project contains expert-validated content by Marit Reiersgård. Please respect intellectual property rights.

## 👥 Credits

- **Expert Validation**: Marit Reiersgård - Professional Enneagram Consultant
- **Development**: Professional web development team
- **Content**: Norwegian Enneagram assessment methodology

## 📞 Support

For questions about the test methodology or expert consultation, please contact through the newsletter signup or visit the expert's professional channels.

---

**Built with ❤️ for accurate personality assessment and personal growth**
