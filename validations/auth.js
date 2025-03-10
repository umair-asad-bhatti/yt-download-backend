const { validateEmail } = require('../utils/index');

class AuthValidations {
  static validSignUpData = (data) => {
    let errors = {};

    if (!data.email || data.email.trim() === '') {
      errors.email = 'Must not be empty';
    }
    if (!data.password || data.password.trim() === '') {
      errors.password = 'Must not be empty';
    }
    // Email validation
    if (data.email && !validateEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };

  static validLoginData = (data) => {
    let errors = {};

    if (!data.email || data.email.trim() === '') {
      errors.email = 'Must not be empty';
    }
    if (!data.password || data.password.trim() === '') {
      errors.password = 'Must not be empty';
    }
    // Email validation
    if (data.email && !validateEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };
}

module.exports = AuthValidations;
