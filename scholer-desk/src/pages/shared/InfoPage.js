import React from 'react';
import AppButton from '../../components/buttons/AppButton';
import AppFooter from '../../components/common/AppFooter';
import './InfoPage.css';

const content = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How ScholarDesk handles student and institution data.',
    sections: [
      ['Information We Use', 'ScholarDesk uses profile, post, and activity information to provide campus publishing and moderation features.'],
      ['Your Controls', 'Students can update profile visibility and notification preferences from Settings.'],
      ['Data Requests', 'Contact campus support to request an export or correction of your account information.']
    ]
  },
  terms: {
    title: 'Terms of Service',
    description: 'The shared rules for responsible campus publishing.',
    sections: [
      ['Community Standards', 'Publish accurate, respectful material and follow your institution policies.'],
      ['Content Ownership', 'Authors retain ownership of their work while allowing ScholarDesk to display it in the service.'],
      ['Moderation', 'Administrators may review reported content and restrict accounts that violate campus standards.']
    ]
  },
  support: {
    title: 'Contact Support',
    description: 'Get help with access, publishing, or moderation.',
    sections: [
      ['Student Support', 'Email support@scholardesk.edu for account and publishing assistance.'],
      ['Administrator Support', 'Email admin-support@scholardesk.edu for institution configuration and moderation help.'],
      ['Response Time', 'Support requests are normally reviewed within one business day.']
    ]
  },
  api: {
    title: 'API Documentation',
    description: 'Integration guidance for approved institution developers.',
    sections: [
      ['Authentication', 'Institution integrations use scoped access tokens issued by a ScholarDesk administrator.'],
      ['Core Resources', 'The service exposes students, posts, categories, comments, notifications, and reports.'],
      ['Development Access', 'Contact administrator support to request sandbox credentials and the OpenAPI contract.']
    ]
  }
};

function InfoPage({ page }) {
  const details = content[page];

  return (
    <div className="info-page">
      <header><AppButton variant="ghost" to="/">ScholarDesk</AppButton><AppButton variant="outline" to="/login">Sign In</AppButton></header>
      <main className="page-container">
        <h1>{details.title}</h1>
        <p className="lead">{details.description}</p>
        <div className="info-sections">{details.sections.map(([title, body]) => <section className="surface-card" key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
        {page === 'support' ? <a className="app-button app-button--primary" href="mailto:support@scholardesk.edu">Email Support</a> : null}
      </main>
      <AppFooter compact />
    </div>
  );
}

export default InfoPage;
