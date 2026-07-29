import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../components/buttons/AppButton';
import AppFooter from '../../components/common/AppFooter';
import { postsWithMeta } from '../../utils/mockSelectors';
import './LandingPage.css';

function LandingPage() {
  const highlights = postsWithMeta.slice(0, 2);

  return (
    <div className="landing-page">
      <header className="landing-topbar">
        <strong>ScholarDesk</strong>
        <nav className="desktop-only"><a href="#features">Dashboard</a><a href="#pub">Posts</a><a href="#cta">Reports</a></nav>
        <div><Link to="/login">Login</Link></div>
      </header>

      <section className="page-container hero">
        <div>
          <span className="trusted">Trusted by 500+ Institutions</span>
          <h1>Empowering <span>Student Voices</span> in Every Campus</h1>
          <p>The definitive platform for managing student-led publications, research sharing, and collaborative academic discussions.</p>
          <div className="hero-actions">
            <Link to="/register"><AppButton>Get Started</AppButton></Link>
            <Link to="/posts"><AppButton variant="outline">Browse Posts</AppButton></Link>
          </div>
        </div>
        <img src="https://picsum.photos/seed/landing-hero/900/560" alt="hero" />
      </section>

      <section className="page-container metrics">
        <article><h3>10k+</h3><p>Students Active</p></article>
        <article><h3>50k+</h3><p>Posts Published</p></article>
        <article><h3>200+</h3><p>Universities</p></article>
        <article><h3>99%</h3><p>Uptime</p></article>
      </section>

      <section id="features" className="page-container feature-grid">
        <h2>Designed for Modern Academia</h2>
        <p>Powerful tools to streamline student collaboration and administration.</p>
        <div className="cards">
          <article className="surface-card lg">
            <h3>Sophisticated Post Creation</h3>
            <p>Rich text editing and seamless media embedding.</p>
            <img src="https://picsum.photos/seed/land-f1/1000/340" alt="feature" />
          </article>
          <article className="surface-card dark"><h3>Real-time Notifications</h3><p>Stay updated with instant alerts and campus announcements.</p></article>
          <article className="surface-card"><h3>Collaborative Feed</h3><p>A centralized stream of intellectual exchange.</p></article>
          <article className="surface-card"><h3>Advanced Management</h3><p>Moderation, reporting, and analytics in one suite.</p></article>
        </div>
      </section>

      <section id="pub" className="page-container publish-list">
        <h2>Latest Publications</h2>
        <div className="post-list">
          {highlights.map((post) => (
            <article key={post.id} className="surface-card">
              <img src={post.images?.[0]} alt={post.title} />
              <div className="inner">
                <span>{post.category?.name || 'Research'}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="page-container cta surface-card">
        <h2>Ready to transform your campus discourse?</h2>
        <p>Join thousands of students already sharing their thoughts and research.</p>
        <div><Link to="/register"><AppButton variant="outline">Create Account</AppButton></Link><Link to="/dashboard"><AppButton>Schedule Demo</AppButton></Link></div>
      </section>

      <AppFooter />
    </div>
  );
}

export default LandingPage;