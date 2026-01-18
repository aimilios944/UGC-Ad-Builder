import React from 'react';
import './Samples.css';
import { Play, Heart, Eye, MousePointer2 } from 'lucide-react';

const samplesData = [
    {
        id: 1,
        title: "Skincare Routine",
        category: "Beauty & Wellness",
        description: "Morning glow routine with natural lighting.",
        views: "1.2M",
        likes: "45K",
        ctr: "3.2%",
        image: "/assets/skincare.png"
    },
    {
        id: 2,
        title: "Tech Unboxing",
        category: "Consumer Tech",
        description: "ASMR style unboxing of latest gadget.",
        views: "850K",
        likes: "32K",
        ctr: "2.8%",
        image: "/assets/tech.png"
    },
    {
        id: 3,
        title: "Fashion Haul",
        category: "Apparel",
        description: "Summer collection try-on haul.",
        views: "2.1M",
        likes: "120K",
        ctr: "4.5%",
        image: "/assets/fashion.png"
    }
];

const Samples = () => {
    return (
        <section className="samples-section">
            <div className="section-header">
                <h2 className="section-title">See What's Possible</h2>
                <p className="section-subtitle">High-performing creatives generated in minutes.</p>
            </div>

            <div className="samples-grid">
                {samplesData.map((sample) => (
                    <div key={sample.id} className="sample-card">
                        <div className="card-media">
                            <img src={sample.image} alt={sample.title} />
                            <div className="play-overlay">
                                <Play fill="currentColor" size={32} />
                            </div>
                            <div className="category-pill">{sample.category}</div>
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <h3>{sample.title}</h3>
                                <div className="ctr-pill">
                                    <MousePointer2 size={12} />
                                    {sample.ctr} CTR
                                </div>
                            </div>
                            <p className="card-desc">{sample.description}</p>

                            <div className="card-metrics">
                                <div className="metric">
                                    <Eye size={16} />
                                    <span>{sample.views}</span>
                                </div>
                                <div className="metric">
                                    <Heart size={16} />
                                    <span>{sample.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Samples;
