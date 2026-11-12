/**
 * Лаб 9 - Даалгавар 3:
 * js/validators.js - Дараах 4 функц бичнэ:
 * 1. validateName(value)     - Хоёр захын зайг хасна. Хоосон биш, 2–50 тэмдэгт, тоо агуулахгүй.
 * 2. validateEmail(value)    - Хоосон биш; «нэр@домэйн.өргөтгөл» хэлбэр (regular expression); зай агуулахгүй.
 * 3. validatePassword(value) - Дор хаяж 8 тэмдэгт; хоосон зайгүй; үсэг (кирилл эсвэл латин) ба тоо агуулна.
 * 4. validateMessage(value)  - Хоёр захын зайг хасна. 10–500 тэмдэгт.
 */

/**
 * 1. validateName(value)
 * Дүрэм: Хоёр захын зайг хасна. Хоосон биш, 2–50 тэмдэгт, тоо агуулахгүй.
 * @param {string} value
 * @returns {boolean}
 */
function validateName(value) {
  if (value === null || value === undefined) return false;
  var trimmed = String(value).trim();

  // Хоосон биш ба 2-50 тэмдэгт
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Тоо агуулахгүй (0-9 цифр байх ёсгүй)
  if (/\d/.test(trimmed)) {
    return false;
  }

  return true;
}

/**
 * 2. validateEmail(value)
 * Дүрэм: Хоосон биш; «нэр@домэйн.өргөтгөл» хэлбэр (regular expression); зай агуулахгүй.
 * @param {string} value
 * @returns {boolean}
 */
function validateEmail(value) {
  if (value === null || value === undefined) return false;
  var str = String(value);

  // Хоосон биш
  if (str.length === 0) {
    return false;
  }

  // Зай агуулахгүй
  if (/\s/.test(str)) {
    return false;
  }

  // «нэр@домэйн.өргөтгөл» хэлбэр (нэр, @ тэмдэг, домэйн нэр, цэг, дор хаяж 2 үсэгтэй өргөтгөл)
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str);
}

/**
 * 3. validatePassword(value)
 * Дүрэм: Дор хаяж 8 тэмдэгт; хоосон зайгүй; үсэг (кирилл эсвэл латин) ба тоо агуулна.
 * @param {string} value
 * @returns {boolean}
 */
function validatePassword(value) {
  if (value === null || value === undefined) return false;
  var str = String(value);

  // Дор хаяж 8 тэмдэгт
  if (str.length < 8) {
    return false;
  }

  // Хоосон зайгүй
  if (/\s/.test(str)) {
    return false;
  }

  // Үсэг (кирилл эсвэл латин) агуулсан эсэх
  var hasLetter = /[a-zA-Zа-яА-ЯөӨүҮёЁ]/.test(str);

  // Тоо (0-9) агуулсан эсэх
  var hasDigit = /[0-9]/.test(str);

  return hasLetter && hasDigit;
}

/**
 * 4. validateMessage(value)
 * Дүрэм: Хоёр захын зайг хасна. 10–500 тэмдэгт.
 * @param {string} value
 * @returns {boolean}
 */
function validateMessage(value) {
  if (value === null || value === undefined) return false;
  var trimmed = String(value).trim();

  // 10–500 тэмдэгт
  return trimmed.length >= 10 && trimmed.length <= 500;
}

/**
 * Дэлгэрэнгүй алдааны мессеж буцаах туслах функц (Form UI-д харуулахад зориулагдсан)
 * @param {string} field - 'name' | 'email' | 'password' | 'message'
 * @param {string} value
 * @returns {string} Алдааны мессеж (хэрэв зөв бол хоосон мөр буцаана)
 */
function getValidationError(field, value) {
  var str = value === null || value === undefined ? '' : String(value);
  var trimmed = str.trim();

  switch (field) {
    case 'name':
      if (trimmed.length === 0) {
        return 'Нэрээ оруулна уу (хоосон байж болохгүй).';
      }
      if (/\d/.test(trimmed)) {
        return 'Нэрэнд тоо орж болохгүй.';
      }
      if (trimmed.length < 2) {
        return 'Нэр хамгийн багадаа 2 тэмдэгттэй байна.';
      }
      if (trimmed.length > 50) {
        return 'Нэр 50-аас илүүгүй тэмдэгттэй байна.';
      }
      return '';

    case 'email':
      if (str.length === 0) {
        return 'И-мэйл хаягаа оруулна уу.';
      }
      if (/\s/.test(str)) {
        return 'И-мэйл хаягт ямар ч хоосон зай байж болохгүй.';
      }
      if (!validateEmail(str)) {
        return 'Зөв и-мэйл хэлбэр оруулна уу («нэр@домэйн.өргөтгөл»).';
      }
      return '';

    case 'password':
      if (str.length === 0) {
        return 'Нууц үгээ оруулна уу.';
      }
      if (/\s/.test(str)) {
        return 'Нууц үгэнд хоосон зай байж болохгүй.';
      }
      if (str.length < 8) {
        return 'Нууц үг дор хаяж 8 тэмдэгтээс бүрдэнэ.';
      }
      var hasLetter = /[a-zA-Zа-яА-ЯөӨүҮёЁ]/.test(str);
      var hasDigit = /[0-9]/.test(str);
      if (!hasLetter && !hasDigit) {
        return 'Үсэг (кирилл/латин) болон тоо хоёуланг нь агуулах ёстой.';
      }
      if (!hasLetter) {
        return 'Нууц үгэнд ядаж нэг үсэг (кирилл эсвэл латин) орсон байх шаардлагатай.';
      }
      if (!hasDigit) {
        return 'Нууц үгэнд ядаж нэг тоо (0-9) орсон байх шаардлагатай.';
      }
      return '';

    case 'message':
      if (trimmed.length === 0) {
        return 'Санал хүсэлтийн зурвасаа бичнэ үү.';
      }
      if (trimmed.length < 10) {
        return 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой (одоо: ' + trimmed.length + ').';
      }
      if (trimmed.length > 500) {
        return 'Зурвас 500 тэмдэгтээс хэтрэхгүй байх ёстой (одоо: ' + trimmed.length + ').';
      }
      return '';

    default:
      return '';
  }
}

// Экспорт: Node.js болон хөтөч
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateName: validateName,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateMessage: validateMessage,
    getValidationError: getValidationError
  };
}

if (typeof window !== 'undefined') {
  window.validateName = validateName;
  window.validateEmail = validateEmail;
  window.validatePassword = validatePassword;
  window.validateMessage = validateMessage;
  window.getValidationError = getValidationError;
  window.Validators = {
    validateName: validateName,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateMessage: validateMessage,
    getValidationError: getValidationError
  };
}
