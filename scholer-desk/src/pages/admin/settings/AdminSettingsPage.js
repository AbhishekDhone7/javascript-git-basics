import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppFooter from '../../../components/common/AppFooter';
import AppButton from '../../../components/buttons/AppButton';
import './AdminSettingsPage.css';

function AdminSettingsPage() {
  const defaults = { escalations: true, summaries: true, digest: false, twoFactor: true, exports: true };
  const [settings, setSettings] = useState(defaults);
  const [saved, setSaved] = useState(false);

  function toggle(key) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  }

  return (
    <AppShell section="admin" active="settings">
      <section className="admin-settings-page">
        <h1 className="section-title">Settings</h1>
        <p className="subtle">Manage administrative preferences and moderation defaults.</p>
        <article className="surface-card block">
          <h2>Notification Rules</h2>
          <div className="row"><span>Email Escalations</span><input aria-label="Email Escalations" type="checkbox" checked={settings.escalations} onChange={() => toggle('escalations')} /></div>
          <div className="row"><span>Auto Flag Summaries</span><input aria-label="Auto Flag Summaries" type="checkbox" checked={settings.summaries} onChange={() => toggle('summaries')} /></div>
          <div className="row"><span>Weekly Audit Digest</span><input aria-label="Weekly Audit Digest" type="checkbox" checked={settings.digest} onChange={() => toggle('digest')} /></div>
        </article>
        <article className="surface-card block">
          <h2>Security & Access</h2>
          <div className="row"><span>Require 2FA for moderators</span><input aria-label="Require 2FA for moderators" type="checkbox" checked={settings.twoFactor} onChange={() => toggle('twoFactor')} /></div>
          <div className="row"><span>Allow CSV exports</span><input aria-label="Allow CSV exports" type="checkbox" checked={settings.exports} onChange={() => toggle('exports')} /></div>
          <div className="actions"><AppButton onClick={() => setSaved(true)}>Save Changes</AppButton><AppButton variant="outline" onClick={() => { setSettings(defaults); setSaved(false); }}>Reset Defaults</AppButton></div>
          {saved ? <p role="status">Administrative settings saved.</p> : null}
        </article>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminSettingsPage;