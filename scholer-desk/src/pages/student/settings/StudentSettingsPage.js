import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockUsers } from '../../../utils/mockSelectors';
import './StudentSettingsPage.css';

function StudentSettingsPage() {
  const user = mockUsers[0];
  const [activeTab, setActiveTab] = useState('Profile');
  const [saved, setSaved] = useState(false);
  const tabs = ['Profile', 'Notifications', 'Privacy', 'Account'];

  return (
    <AppShell section="student" active="settings">
      <section className="settings-page">
        <h1 className="section-title">Settings</h1>
        <p className="subtle">Manage your account preferences and application experience.</p>
        <div className="settings-grid">
          <aside className="tabs surface-card">{tabs.map((tab) => <button type="button" key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => { setActiveTab(tab); setSaved(false); }}>{tab}</button>)}</aside>
          <div className="content">
            {activeTab === 'Profile' ? <article className="surface-card profile-box"><h2>Profile Settings</h2><div className="row"><img src={user.profileImage} alt={user.name} /><div><h3>{user.name}</h3><p>{user.bio}</p></div></div><AppButton onClick={() => setSaved(true)}>Save Changes</AppButton>{saved ? <p role="status">Profile settings saved.</p> : null}</article> : null}
            {activeTab === 'Notifications' ? <article className="surface-card toggles"><h2>Notifications</h2><div><span>Email Alerts</span><input aria-label="Email Alerts" type="checkbox" defaultChecked /></div><div><span>Push Notifications</span><input aria-label="Push Notifications" type="checkbox" /></div><div><span>Report Reminders</span><input aria-label="Report Reminders" type="checkbox" defaultChecked /></div><AppButton onClick={() => setSaved(true)}>Save Preferences</AppButton>{saved ? <p role="status">Notification preferences saved.</p> : null}</article> : null}
            {activeTab === 'Privacy' ? <article className="surface-card toggles"><h2>Privacy</h2><div><span>Public Profile</span><input aria-label="Public Profile" type="checkbox" defaultChecked /></div><div><span>Show Activity Status</span><input aria-label="Show Activity Status" type="checkbox" defaultChecked /></div><AppButton onClick={() => setSaved(true)}>Save Privacy</AppButton>{saved ? <p role="status">Privacy settings saved.</p> : null}</article> : null}
            {activeTab === 'Account' ? <article className="surface-card account"><h2>Account Management</h2><div className="danger"><strong>Sign out of ScholarDesk</strong><AppButton variant="secondary" to="/login">Logout</AppButton></div><div className="danger"><strong>Update your password</strong><AppButton variant="outline" to="/reset-password">Change Password</AppButton></div></article> : null}
          </div>
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentSettingsPage;