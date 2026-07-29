import { combineReducers } from '@reduxjs/toolkit';
import studentAuthReducer from './student/authSlice';
import studentPostReducer from './student/postSlice';
import studentProfileReducer from './student/profileSlice';
import studentNotificationReducer from './student/notificationSlice';
import adminAuthReducer from './admin/authSlice';
import adminDashboardReducer from './admin/dashboardSlice';
import adminStudentReducer from './admin/studentSlice';
import adminPostReducer from './admin/postSlice';
import adminAnalyticsReducer from './admin/analyticsSlice';
import appReducer from './common/appSlice';
import themeReducer from './common/themeSlice';
import loadingReducer from './common/loadingSlice';

const rootReducer = combineReducers({
  student: combineReducers({
    auth: studentAuthReducer,
    posts: studentPostReducer,
    profile: studentProfileReducer,
    notifications: studentNotificationReducer
  }),
  admin: combineReducers({
    auth: adminAuthReducer,
    dashboard: adminDashboardReducer,
    students: adminStudentReducer,
    posts: adminPostReducer,
    analytics: adminAnalyticsReducer
  }),
  common: combineReducers({
    app: appReducer,
    theme: themeReducer,
    loading: loadingReducer
  })
});

export default rootReducer;
