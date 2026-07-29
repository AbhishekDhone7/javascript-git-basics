const generateId = (prefix = 'id') => `${prefix}-${Date.now()}`;

export default generateId;
