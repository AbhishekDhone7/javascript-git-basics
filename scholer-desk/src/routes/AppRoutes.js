import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/shared/LandingPage';
import NotFoundPage from '../pages/shared/NotFoundPage';
import LoginPage from '../pages/student/auth/LoginPage';
import RegisterPage from '../pages/student/auth/RegisterPage';
import ForgotPasswordPage from '../pages/student/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/student/auth/ResetPasswordPage';
import EmailVerificationPage from '../pages/student/auth/EmailVerificationPage';
import SuccessPage from '../pages/student/auth/SuccessPage';
import StudentDashboardPage from '../pages/student/dashboard/StudentDashboardPage';
import StudentPostsPage from '../pages/student/posts/StudentPostsPage';
import CreatePostPage from '../pages/student/posts/CreatePostPage';
import PostDetailsPage from '../pages/student/posts/PostDetailsPage';
import StudentProfilePage from '../pages/student/profile/StudentProfilePage';
import StudentSettingsPage from '../pages/student/settings/StudentSettingsPage';
import StudentNotificationsPage from '../pages/student/notifications/StudentNotificationsPage';
import AdminDashboardPage from '../pages/admin/dashboard/AdminDashboardPage';
import AdminStudentsPage from '../pages/admin/students/AdminStudentsPage';
import AdminPostsPage from '../pages/admin/posts/AdminPostsPage';
import AdminReportsPage from '../pages/admin/reports/AdminReportsPage';
import AdminSettingsPage from '../pages/admin/settings/AdminSettingsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/email-verification" element={<EmailVerificationPage />} />
      <Route path="/success" element={<SuccessPage />} />

      <Route path="/dashboard" element={<StudentDashboardPage />} />
      <Route path="/posts" element={<StudentPostsPage />} />
      <Route path="/posts/create" element={<CreatePostPage />} />
      <Route path="/posts/:id" element={<PostDetailsPage />} />
      <Route path="/posts/:id/edit" element={<CreatePostPage />} />
      <Route path="/profile" element={<StudentProfilePage />} />
      <Route path="/settings" element={<StudentSettingsPage />} />
      <Route path="/notifications" element={<StudentNotificationsPage />} />

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/students" element={<AdminStudentsPage />} />
      <Route path="/admin/posts" element={<AdminPostsPage />} />
      <Route path="/admin/reports" element={<AdminReportsPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;