// Helper function to check if a string is a valid DD/MM/YYYY date
export const isValidDDMMYYYY = (dateString: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('/').map(Number);

  // Check month validity (1-12)
  if (month < 1 || month > 12) return false;

  // Check day validity based on month and leap year
  const daysInMonth = new Date(year, month, 0).getDate(); // Gets the last day of the *previous* month, effectively giving days in the target month
  if (day < 1 || day > daysInMonth) return false;

  // Basic year check (optional, adjust as needed)
  if (year < 1900 || year > 2100) return false;

  return true;
};

// Helper function to parse DD/MM/YYYY string to Date object
export const parseDDMMYYYY = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  // Month is 0-indexed in JavaScript Date constructor
  return new Date(year, month - 1, day);
};
