import React, { useState } from 'react';
import './BuilderForm.css';
import { Upload, FileVideo, Sparkles, Send, CheckCircle2 } from 'lucide-react';

const BuilderForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        platform: 'tiktok',
        adType: 'testimonial',
        tone: 'energetic',
        ratio: '9:16',
        email: '',
        agreed: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            description: '',
            platform: 'tiktok',
            adType: 'testimonial',
            tone: 'energetic',
            ratio: '9:16',
            email: '',
            agreed: false
        });
        setFile(null);
        setSubmitted(false);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const data = new FormData();
        data.append('description', formData.description);
        data.append('platform', formData.platform);
        data.append('adType', formData.adType);
        data.append('tone', formData.tone);
        data.append('ratio', formData.ratio);
        data.append('email', formData.email);
        if (file) {
            data.append('file', file);
        }

        try {
            const response = await fetch('http://localhost:5678/webhook-test/ugc-ad-trigger', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) throw new Error('Failed to submit ad request');

            setSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            setError('Submission failed. Please check if your n8n instance is running.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="builder-section">
            <div className="section-header">
                <h2 className="section-title">Start Creating</h2>
                <p className="section-subtitle">Define your ad and let our AI handle the rest.</p>
            </div>

            <div className="builder-container">
                {!submitted ? (
                    <form className="builder-form" onSubmit={handleSubmit}>

                        {/* File Upload */}
                        <div
                            className={`upload-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="file-input"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="file-upload" className="upload-label">
                                {file ? (
                                    <div className="file-preview">
                                        <div className="file-icon"><FileVideo size={32} /></div>
                                        <div className="file-info">
                                            <span className="file-name">{file.name}</span>
                                            <span className="change-file">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={40} className="upload-icon" />
                                        <span className="upload-text">Drag & drop your product footage/images</span>
                                        <span className="upload-hint">or click to browse (Max 50MB)</span>
                                    </>
                                )}
                            </label>
                        </div>

                        {/* Ad Description */}
                        <div className="form-group">
                            <label>Ad Concept / Script</label>
                            <textarea
                                name="description"
                                placeholder="Describe what happens in the video. E.g., 'A quick cut montage of a user unboxing the [Product], smiling and showing the results immediately.'"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Configuration Grid */}
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Platform</label>
                                <select name="platform" value={formData.platform} onChange={handleChange}>
                                    <option value="tiktok">TikTok</option>
                                    <option value="instagram">Instagram Reels</option>
                                    <option value="youtube">YouTube Shorts</option>
                                    <option value="facebook">Facebook Ads</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ad Type</label>
                                <select name="adType" value={formData.adType} onChange={handleChange}>
                                    <option value="testimonial">Testimonial</option>
                                    <option value="problem-solution">Problem/Solution</option>
                                    <option value="how-to">How-to / Tutorial</option>
                                    <option value="unboxing">Unboxing/Haul</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tone</label>
                                <select name="tone" value={formData.tone} onChange={handleChange}>
                                    <option value="energetic">Energetic & Fast</option>
                                    <option value="calm">Calm & Aesthetic</option>
                                    <option value="humorous">Humorous</option>
                                    <option value="professional">Professional</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Aspect Ratio</label>
                                <select name="ratio" value={formData.ratio} onChange={handleChange}>
                                    <option value="9:16">9:16 (Vertical)</option>
                                    <option value="1:1">1:1 (Square)</option>
                                    <option value="16:9">16:9 (Horizontal)</option>
                                </select>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Where should we send the video?"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Consent */}
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="consent"
                                name="agreed"
                                checked={formData.agreed}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="consent">
                                I certify that I have the rights to use the uploaded assets.
                            </label>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <div className="loading-spinner"></div> Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} /> Generate UGC Ad
                                </>
                            )}
                        </button>

                    </form>
                ) : (
                    <div className="results-area">
                        <div className="success-message">
                            <CheckCircle2 size={48} className="success-icon" />
                            <h3>Submission Successful!</h3>
                            <p>Thank you for submitting your AI UGC ad. You'll receive the video link at your email shortly.</p>
                            <button className="btn btn-secondary mt-4" onClick={resetForm}>
                                Create another ad
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BuilderForm;
