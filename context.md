# UGC Ad Builder - Project Context

## Project Overview
The UGC Ad Builder is a comprehensive system designed to automate the creation of User-Generated Content (UGC) style ads. It consists of a high-end, premium React frontend and a robust n8n automation workflow backend.

## Architecture

### 1. Frontend (React + Vite)
- **Location**: `/frontend`
- **Tech Stack**: 
  - Framework: React with Vite
  - Styling: Vanilla CSS with CSS Variables for theme management
  - Icons: Lucide-React
  - Animation: CSS transitions and keyframes
- **Core Components**:
  - `Hero.jsx`: Premium entry section with moving thumbnails and gradient typography.
  - `Samples.jsx`: Grid showcase of AI-generated UGC examples with performance metrics.
  - `BuilderForm.jsx`: The main interaction point. Features drag-and-drop file upload, advanced ad parameter selection (Platform, Ad Type, Tone, Aspect Ratio), and real-time form validation.
- **Key Features**:
  - **Local Asset Hosting**: All UI assets (Samples/Hero thumbnails) are served locally from `frontend/public/assets`.
  - **Webhook Integration**: Submits multipart `FormData` (including images) to a local n8n instance.
  - **State Management**: Handles complex loading states, submission errors, and success flow transitions.

### 2. Backend (n8n Workflow)
- **File**: `UGC Ad Builder Workflow.json`
- **Workflow Steps**:
  1. **Webhook Trigger**: Receives binary image data and metadata (description, platform, tone, ratio) from the frontend via `POST /ugc-ad-trigger`.
  2. **Analysis & Archival** (Parallel):
     - **Google Drive**: Uploads the raw user asset to a specific folder for archival.
     - **Image Analysis**: Uses an AI Agent (OpenAI) to generate a detailed description of the product or character in the uploaded image.
  3. **Visual synthesis**:
     - **Image Prompt Generation**: An AI Agent constructs a highly detailed "UGC-style" image prompt based on the analysis and user concept.
     - **Image Generation**: Calls `fal.ai/flux/schnell` to generate a high-quality base image.
  4. **Video Creation**:
     - **Video Prompt Generation**: An AI Agent creates a motion prompt, combining the generated image URL with the user's concept, tone, and platform requirements.
     - **Video Generation**: Calls `fal.ai/kling-video/v1/standard/image-to-video` to animate the generated image into a video.
  5. **Delivery**:
     - **Gmail**: Sends the final video URL directly to the user's email address.

### 3. Environment Variables
- **Location**: `/frontend/.env` (and documented in root)
- **Values**: Configured with Google Client ID/Secret, Gemini API Key, OpenAI API Key, and GitHub Token for secure API interactions.

## Implementation Progress

### Completed Tasks
- [x] Initial n8n workflow design and JSON export.
- [x] Frontend scaffolding with Vite and React.
- [x] Design system implementation (Dark mode, premium aesthetics).
- [x] Hero and Samples sections with real AI-generated image assets.
- [x] BuilderForm with drag-and-drop and configuration selectors.
- [x] **Submission Logic**: Connected the form to the n8n webhook with full `FormData` support.
- [x] **UI Polish**: Implemented loading spinners, success messaging, and form reset capabilities.
- [x] **Workflow Refinement**: Finalized `UGC Ad Builder Workflow.json` with Flux Schnell (Images) and Kling (Video) via Fal.ai.

### Current Configuration
- **Frontend URL**: `http://localhost:5173`
- **Webhook Endpoint**: `http://localhost:5678/webhook-test/ugc-ad-trigger` (Tunnel/Local)
- **Asset Directory**: `frontend/public/assets/`

## Next Steps: Deployment (Vercel)

To deploy the frontend to Vercel, follow these steps:

1.  **Preparation**:
    *   Ensure your `build` command in `package.json` is correct (usually `vite build`).
    *   Verify all environment variables in plain `.env` are prefixed with `VITE_` if used in the frontend code.
    *   Push your latest code to a GitHub repository.

2.  **Vercel Setup**:
    *   Log in to Vercel and click "Add New... > Project".
    *   Import your GitHub repository.
    *   **Framework Preset**: Select "Vite".
    *   **Root Directory**: Select `frontend` (since your React app is in the subfolder).

3.  **Environment Variables**:
    *   In the Vercel project settings, add the environment variables found in your `.env`.
    *   **Important**: Since the n8n webhook is currently `localhost`, you must update `VITE_N8N_WEBHOOK_URL` to your **production** n8n webhook URL (using the Production URL in n8n, not the Test URL).
    *   Your n8n instance must be publicly accessible (e.g., self-hosted on a server or n8n Cloud), or you must use a tunnel service that stays active.

4.  **Deploy**:
    *   Click "Deploy". Vercel will build and host your site.
    *   Test the form submission to ensure it reaches your production n8n instance.

## Design Principles
- **Clean & Premium**: High contrast, generous whitespace, and subtle gradients.
- **Interactive**: Hover states, smooth animations, and clear feedback loops (Loading/Success).
- **Responsive**: Mobile-first grid layouts for the form and gallery.
