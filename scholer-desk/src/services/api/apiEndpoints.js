const apiEndpoints = {
  student: {
    auth: '/student/auth',
    posts: '/student/posts',
    profile: '/student/profile',
    notifications: '/student/notifications'
  },
  admin: {
    auth: '/admin/auth',
    dashboard: '/admin/dashboard',
    students: '/admin/students',
    posts: '/admin/posts',
    categories: '/admin/categories',
    reports: '/admin/reports',
    analytics: '/admin/analytics'
  }
};

export default apiEndpoints;
