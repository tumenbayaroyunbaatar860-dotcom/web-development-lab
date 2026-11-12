/**
 * Лаб 9 - Даалгавар 4:
 * validation функцийг form-той холбох логик.
 * - validateName, validateEmail, validatePassword, validateMessage функцуудыг ашиглана.
 * - Бодит цагийн (input, blur) болон илгээх үеийн (submit) validation.
 * - Хэрэглэгчид ойлгомжтой алдааны мессеж, амжилтын төлөв, хандах боломж (accessibility: aria-invalid, aria-describedby).
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('feedback-form');
    if (!form) return;

    var nameInput = document.getElementById('feedback-name');
    var emailInput = document.getElementById('feedback-email');
    var passwordInput = document.getElementById('feedback-password');
    var messageInput = document.getElementById('feedback-message');
    var togglePassBtn = document.getElementById('toggle-password-visibility');
    var charCount = document.getElementById('char-count');
    var successAlert = document.getElementById('feedback-success');

    var fields = [
      {
        id: 'name',
        input: nameInput,
        errorEl: document.getElementById('name-error'),
        validator: window.validateName,
        detailedMsg: function (val) { return window.getValidationError('name', val); }
      },
      {
        id: 'email',
        input: emailInput,
        errorEl: document.getElementById('email-error'),
        validator: window.validateEmail,
        detailedMsg: function (val) { return window.getValidationError('email', val); }
      },
      {
        id: 'password',
        input: passwordInput,
        errorEl: document.getElementById('password-error'),
        validator: window.validatePassword,
        detailedMsg: function (val) { return window.getValidationError('password', val); }
      },
      {
        id: 'message',
        input: messageInput,
        errorEl: document.getElementById('message-error'),
        validator: window.validateMessage,
        detailedMsg: function (val) { return window.getValidationError('message', val); }
      }
    ];

    /**
     * Нэг талбарыг шалгаж алдааны төлөвийг UI дээр шинэчлэх
     * @param {Object} field
     * @param {boolean} showSuccessState
     * @returns {boolean}
     */
    function validateSingleField(field, showSuccessState) {
      if (!field.input) return true;
      var val = field.input.value;
      var isValid = field.validator(val);
      var group = field.input.closest('.form-group') || field.input.parentElement;

      if (!isValid) {
        var errorMsg = field.detailedMsg(val);
        field.input.classList.add('is-invalid');
        field.input.classList.remove('is-valid');
        field.input.setAttribute('aria-invalid', 'true');
        if (field.errorEl) {
          field.errorEl.textContent = errorMsg;
          field.errorEl.classList.remove('is-hidden');
        }
        if (group) {
          group.classList.add('has-error');
          group.classList.remove('has-success');
        }
        return false;
      } else {
        field.input.classList.remove('is-invalid');
        if (showSuccessState) {
          field.input.classList.add('is-valid');
        }
        field.input.setAttribute('aria-invalid', 'false');
        if (field.errorEl) {
          field.errorEl.textContent = '';
          field.errorEl.classList.add('is-hidden');
        }
        if (group) {
          group.classList.remove('has-error');
          if (showSuccessState) {
            group.classList.add('has-success');
          }
        }
        return true;
      }
    }

    // Талбар бүрт input болон blur эвент холбох
    fields.forEach(function (f) {
      if (!f.input) return;

      // Хэрэглэгч бичих үед бодит цагт шалгах (хэрэв алдаатай байсан бол арилгах)
      f.input.addEventListener('input', function () {
        if (f.input.classList.contains('is-invalid') || f.input.value.trim().length > 0) {
          validateSingleField(f, true);
        }
        if (f.id === 'message' && charCount) {
          updateCharCount();
        }
      });

      // Хэрэглэгч талбараас гарах үед (blur) заавал шалгах
      f.input.addEventListener('blur', function () {
        if (f.input.value.trim().length > 0 || f.input.hasAttribute('required')) {
          validateSingleField(f, true);
        }
      });
    });

    // Зурвасын тэмдэгтийн тоолуурыг шинэчлэх
    function updateCharCount() {
      if (!messageInput || !charCount) return;
      var trimmed = messageInput.value.trim();
      var len = trimmed.length;
      charCount.textContent = len + ' / 500 тэмдэгт';
      if (len < 10) {
        charCount.style.color = '#ef4444';
      } else if (len > 500) {
        charCount.style.color = '#ef4444';
      } else {
        charCount.style.color = '#10b981';
      }
    }

    // Нууц үг харах / нуух товч
    if (togglePassBtn && passwordInput) {
      togglePassBtn.addEventListener('click', function () {
        var isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePassBtn.setAttribute('aria-label', isPassword ? 'Нууц үгийг нуух' : 'Нууц үгийг харах');
        togglePassBtn.textContent = isPassword ? 'Нуух' : 'Харах';
      });
    }

    // Form Reset
    form.addEventListener('reset', function () {
      setTimeout(function () {
        fields.forEach(function (f) {
          if (!f.input) return;
          f.input.classList.remove('is-invalid', 'is-valid');
          f.input.removeAttribute('aria-invalid');
          if (f.errorEl) {
            f.errorEl.textContent = '';
            f.errorEl.classList.add('is-hidden');
          }
          var group = f.input.closest('.form-group') || f.input.parentElement;
          if (group) {
            group.classList.remove('has-error', 'has-success');
          }
        });
        if (charCount) {
          charCount.textContent = '0 / 500 тэмдэгт';
          charCount.style.color = '';
        }
        if (successAlert) {
          successAlert.classList.add('is-hidden');
          successAlert.innerHTML = '';
        }
      }, 10);
    });

    // Form Submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var allValid = true;
      var firstInvalidInput = null;

      // 4 талбарыг бүгдийг нь нэгэн зэрэг шалгах
      fields.forEach(function (f) {
        var valid = validateSingleField(f, true);
        if (!valid) {
          allValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = f.input;
          }
        }
      });

      if (!allValid) {
        // Эхний алдаатай талбарт фокуслах
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        if (successAlert) {
          successAlert.classList.add('is-hidden');
        }
        return false;
      }

      // Бүх талбар амжилттай баталгаажсан үед
      var submittedData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        passwordLength: passwordInput.value.length,
        message: messageInput.value.trim(),
        submittedAt: new Date().toLocaleString()
      };

      console.log('%c[Санал хүсэлт амжилттай баталгаажлаа!]', 'color: #10b981; font-weight: bold; font-size: 14px;');
      console.table(submittedData);

      if (successAlert) {
        successAlert.innerHTML =
          '<strong>Амжилттай илгээгдлээ!</strong><br>' +
          'Баярлалаа, <em>' + escapeHtml(submittedData.name) + '</em>. ' +
          'Таны санал хүсэлтийг хүлээн авлаа. (' + escapeHtml(submittedData.email) + ' хаягаар хариу өгнө).';
        successAlert.classList.remove('is-hidden');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Маягтыг амжилттай илгээсний дараа цэвэрлэх
      form.reset();
    });

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  });
})();
