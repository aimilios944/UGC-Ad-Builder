# UGC Ad Builder

AI-powered UGC (User-Generated Content) ad creation platform. Upload your product images, define your ad concept, and receive a fully generated video ad via email.

## 🚀 Features

- **Drag & Drop Upload**: Easy file upload for product images
- **Multi-Platform Support**: TikTok, Instagram Reels, YouTube Shorts, Facebook Ads
- **AI-Powered Generation**: Uses OpenAI GPT-4o + Fal.ai (Flux Schnell + Kling Video)
- **Email Delivery**: Receive your finished video directly in your inbox
- **Premium UI**: Dark mode, glassmorphism, responsive design

## 📁 Project Structure

```
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Hero, Samples, BuilderForm
│   │   └── styles/         # Global CSS + Variables
│   └── public/assets/      # Sample images
├── UGC Ad Builder Workflow.json   # n8n workflow (import this)
├── context.md              # Project documentation
└── .gitignore
```

## 🛠️ Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (n8n)

1. Start your n8n instance
2. Import `UGC Ad Builder Workflow.json`
3. Configure credentials:
   - OpenAI API
   - Google Drive OAuth
   - Gmail OAuth
   - Fal.ai API Key
4. Activate the workflow

## 🌐 Deployment

See `context.md` for detailed Vercel deployment instructions.

## 📄 License

MIT
