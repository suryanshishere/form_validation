const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const aadharRegex = /^[0-9]{12}$/;
const phoneRegex = /^[0-9]{10}$/;
const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
const nameRegex = /^[a-zA-Z\s]{2,50}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export const validateField = (name: string, value: string) => {
  if (!value.trim()) return 'This field is required';

  switch (name) {
    case 'firstName':
    case 'lastName':
      if (value.length < 2 || value.length > 50)
        return 'Name must be between 2 and 50 characters';
      if (!/^[a-zA-Z\s]+$/.test(value))
        return 'Name must contain only letters and spaces';
      break;

    case 'username':
      if (value.length < 4 || value.length > 20)
        return 'Username must be 4–20 characters long';
      if (!/^[a-zA-Z0-9_]+$/.test(value))
        return 'Username can only include letters, numbers, and underscores';
      break;

    case 'email':
      if (!emailRegex.test(value))
        return 'Please enter a valid email (e.g., user@example.com)';
      break;

    case 'password':
      if (value.length < 8)
        return 'Password must be at least 8 characters long';
      if (!/[A-Z]/.test(value))
        return 'Password must include at least one uppercase letter';
      if (!/[a-z]/.test(value))
        return 'Password must include at least one lowercase letter';
      if (!/\d/.test(value))
        return 'Password must include at least one number';
      if (!/[@#$%^&+=!]/.test(value))
        return 'Password must include at least one special character (@#$%^&+=!)';
      break;

    case 'phone':
      if (!/^\d+$/.test(value))
        return 'Phone number must contain only digits';
      if (value.length !== 10)
        return 'Phone number must be exactly 10 digits';
      break;

    case 'pan':
      if (!panRegex.test(value))
        return 'PAN must be in format: 5 uppercase letters, 4 digits, 1 uppercase letter (e.g., ABCDE1234F)';
      break;

    case 'aadhar':
      if (!/^\d+$/.test(value))
        return 'Aadhar number must contain only digits';
      if (value.length !== 12)
        return 'Aadhar number must be exactly 12 digits';
      break;

    default:
      break;
  }

  return '';
};
