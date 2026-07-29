import users from '../mock/users.json';
import posts from '../mock/posts.json';
import comments from '../mock/comments.json';
import categories from '../mock/categories.json';
import notifications from '../mock/notifications.json';
import reports from '../mock/reports.json';

export const mockUsers = users;
export const mockPosts = posts;
export const mockComments = comments;
export const mockCategories = categories;
export const mockNotifications = notifications;
export const mockReports = reports;

export const getUserById = (userId) => users.find((u) => u.id === userId);
export const getCategoryById = (categoryId) => categories.find((c) => c.id === categoryId);

export const postsWithMeta = posts.map((post) => ({
  ...post,
  author: getUserById(post.authorId),
  category: getCategoryById(post.categoryId)
}));