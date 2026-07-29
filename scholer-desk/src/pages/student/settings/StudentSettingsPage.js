import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockUsers } from '../../../utils/mockSelectors';
import './StudentSettingsPage.css';

function StudentSettingsPage() {
  const user = mockUsers[0];
  return (
    <AppShell section="student" active="settings">
      <section className="settings-page">
        <h1 className="section-title">Settings</h1>
        <p className="subtle">Manage your account preferences and application experience.</p>
        <div className="settings-grid">
          <aside className="tabs surface-card"><button className="active">Profile</button><button>Notifications</button><button>Privacy</button><button>Account</button></aside>
          <div className="content">
            <article className="surface-card profile-box"><h2>Profile Settings</h2><div className="row"><img src={user.profileImage} alt={user.name} /><div><h3>{user.name}</h3><p>{user.bio}</p></div></div><AppButton>Save Changes</AppButton></article>
            <article className="surface-card toggles"><h2>Notifications</h2><div><span>Email Alerts</span><input type="checkbox" defaultChecked /></div><div><span>Push Notifications</span><input type="checkbox" /></div><div><span>Report Reminders</span><input type="checkbox" defaultChecked /></div></article>
            <article className="surface-card account"><h2>Account Management</h2><div className="danger"><strong>Logout</strong><AppButton variant="secondary">Logout</AppButton></div></article>
          </div>
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentSettingsPage;