import React from 'react';
import './Hero.css';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-badge">
                <Sparkles size={14} className="badge-icon" />
                <span>Powered by Gemini 3.0, n8n, NanoBanana, and Veo3.1</span>
            </div>

            <h1 className="hero-headline">
                Create UGC Ads <br />
                <span className="text-gradient">That Convert</span>
            </h1>

            <p className="hero-subhead">
                Your AI-powered creative studio for high-performance video ads.
            </p>

            <div className="stats-row">
                <div className="stat-item">
                    <span className="stat-value">10x</span>
                    <span className="stat-label">Faster Creation</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">95%</span>
                    <span className="stat-label">Higher Engagement</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">50k+</span>
                    <span className="stat-label">Ads Created</span>
                </div>
            </div>

            <div className="hero-ctas">
                <button className="btn btn-primary">
                    Start Creating Free
                    <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary">
                    <Play size={18} fill="currentColor" />
                    View Examples
                </button>
            </div>

            <div className="hero-thumbnails">
                {/* Placeholder for corner thumbnails */}
                <div className="thumb thumb-tl"></div>
                <div className="thumb thumb-tr"></div>
                <div className="thumb thumb-bl"></div>
                <div className="thumb thumb-br"></div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to Get Started</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default Hero;
