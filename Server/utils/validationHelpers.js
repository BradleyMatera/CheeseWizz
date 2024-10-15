// utils/validationHelpers.js

const validateContactData = (contactData) => {
  const requiredFields = ['fname', 'lname', 'email', 'phone', 'birthday'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  requiredFields.forEach((field) => {
    if (!contactData[field]) {
      throw new Error(`Field ${field} is missing.`);
    }
  });

  if (!emailRegex.test(contactData.email)) {
    throw new Error('Invalid email format.');
  }

  if (!phoneRegex.test(contactData.phone)) {
    throw new Error('Invalid phone format. Expected format is XXX-XXX-XXXX.');
  }

  const birthday = new Date(contactData.birthday);
  if (isNaN(birthday)) {
    throw new Error('Invalid birthday format. Expected YYYY-MM-DD.');
  }
};

module.exports = { validateContactData };