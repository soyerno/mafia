export const validateUsername = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters';
  }
  if (name.length > 15) {
    return 'Name must be less than 15 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    return 'Name can only contain letters, numbers, and underscores';
  }
  return null;
};