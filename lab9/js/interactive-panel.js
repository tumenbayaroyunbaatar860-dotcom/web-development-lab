/**
 * Лаб 9 - Интерактив самбарын логик:
 * Хэрэглэгч болон багш вэб хуудас дээрээс 8 алгоритм болон төрөл хөрвүүлэлтийн
 * туршилтуудыг шууд интерактив байдлаар шалгах боломж олгоно.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 1. sumTo
    initAlgoTester('btn-sumTo', 'input-sumTo', 'res-sumTo', function (val) {
      return 'Үр дүн: sumTo(' + val + ') = ' + window.sumTo(val);
    });

    // 2. factorial
    initAlgoTester('btn-factorial', 'input-factorial', 'res-factorial', function (val) {
      return 'Үр дүн: ' + val + '! = ' + window.factorial(val);
    });

    // 3. isPrime
    initAlgoTester('btn-isPrime', 'input-isPrime', 'res-isPrime', function (val) {
      var ok = window.isPrime(val);
      return 'Үр дүн: ' + val + (ok ? ' нь АНХНЫ ТОО МӨН (true)' : ' нь анхны тоо БИШ (false)');
    });

    // 4. fizzBuzz
    initAlgoTester('btn-fizzBuzz', 'input-fizzBuzz', 'res-fizzBuzz', function (val) {
      var arr = window.fizzBuzz(val);
      return 'Үр дүн [' + arr.slice(0, 15).join(', ') + (arr.length > 15 ? '... нийт ' + arr.length + ' ширхэг' : '') + ']';
    });

    // 5. countVowels
    initAlgoTester('btn-countVowels', 'input-countVowels', 'res-countVowels', function (val) {
      var count = window.countVowels(val);
      return 'Эгшгийн тоо: ' + count;
    });

    // 6. isPalindrome
    initAlgoTester('btn-isPalindrome', 'input-isPalindrome', 'res-isPalindrome', function (val) {
      var ok = window.isPalindrome(val);
      return ok ? 'Палиндром МӨН (true)' : 'Палиндром БИШ (false)';
    });

    // 7. maxOf
    initAlgoTester('btn-maxOf', 'input-maxOf', 'res-maxOf', function (val) {
      var parts = val.split(/[\s,]+/).filter(Boolean).map(Number);
      var max = window.maxOf(parts);
      return 'Хамгийн их: ' + max;
    });

    // 8. digitSum
    initAlgoTester('btn-digitSum', 'input-digitSum', 'res-digitSum', function (val) {
      return 'Цифрүүдийн нийлбэр: ' + window.digitSum(val);
    });

    // Төрөл хөрвүүлэлтийн туршилтыг дэлгэцэнд харуулах товч
    var toggleExpBtn = document.getElementById('btn-toggle-experiments');
    var expContainer = document.getElementById('experiments-display');

    if (toggleExpBtn && expContainer) {
      toggleExpBtn.addEventListener('click', function () {
        var isHidden = expContainer.classList.contains('d-none');
        if (isHidden) {
          renderExperimentsTable();
          expContainer.classList.remove('d-none');
          toggleExpBtn.textContent = 'Туршилтын хүснэгтийг хураах';
        } else {
          expContainer.classList.add('d-none');
          toggleExpBtn.textContent = 'Туршилтын үр дүнг хуудсан дээр харах';
        }
      });
    }

    function renderExperimentsTable() {
      if (!window.LAB9_EXPERIMENTS || expContainer.children.length > 0) return;

      var exp = window.LAB9_EXPERIMENTS;
      var html = '<div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">';

      // Table 1: typeof
      html += '<div><h4 style="color: var(--gold); margin-bottom: 0.5rem;">1. typeof шалгалтын хүснэгт</h4><div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:0.88rem; background:var(--bg);">';
      html += '<tr style="border-bottom:2px solid var(--line); text-align:left;"><th style="padding:8px;">Хувьсагч</th><th style="padding:8px;">Утга</th><th style="padding:8px;">typeof төрөл</th><th style="padding:8px;">Тайлбар</th></tr>';
      exp.types.forEach(function (t) {
        html += '<tr style="border-bottom:1px solid var(--line);"><td style="padding:6px 8px; font-family:monospace;">' + escapeHtml(t.Хувьсагч) + '</td><td style="padding:6px 8px; font-family:monospace;">' + escapeHtml(t.Утга) + '</td><td style="padding:6px 8px; color:var(--gold); font-weight:bold;">' + escapeHtml(t['typeof төрөл']) + '</td><td style="padding:6px 8px; color:var(--muted);">' + escapeHtml(t.Тайлбар) + '</td></tr>';
      });
      html += '</table></div></div>';

      // Table 2: Conversions
      html += '<div><h4 style="color: var(--gold); margin-bottom: 0.5rem;">2. Төрөл хөрвүүлэлтийн хүснэгт</h4><div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:0.88rem; background:var(--bg);">';
      html += '<tr style="border-bottom:2px solid var(--line); text-align:left;"><th style="padding:8px;">Илэрхийлэл</th><th style="padding:8px;">Үр дүн</th><th style="padding:8px;">Үр дүнгийн төрөл</th><th style="padding:8px;">Төрөл хөрвүүлэлт</th><th style="padding:8px;">Тайлбар</th></tr>';
      exp.conversions.forEach(function (c) {
        html += '<tr style="border-bottom:1px solid var(--line);"><td style="padding:6px 8px; font-family:monospace;">' + escapeHtml(c.Илэрхийлэл) + '</td><td style="padding:6px 8px; font-weight:bold; font-family:monospace;">' + escapeHtml(String(c.Үр_дүн)) + '</td><td style="padding:6px 8px; color:var(--gold);">' + escapeHtml(c.Үр_дүнгийн_төрөл) + '</td><td style="padding:6px 8px;">' + escapeHtml(c.Төрөл_хөрвүүлэлт) + '</td><td style="padding:6px 8px; color:var(--muted);">' + escapeHtml(c.Тайлбар) + '</td></tr>';
      });
      html += '</table></div></div>';

      // Table 3: 0.1 + 0.2
      html += '<div><h4 style="color: var(--gold); margin-bottom: 0.5rem;">3. 0.1 + 0.2 Нарийвчлалын алдааны хүснэгт</h4><div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:0.88rem; background:var(--bg);">';
      html += '<tr style="border-bottom:2px solid var(--line); text-align:left;"><th style="padding:8px;">Үйлдэл</th><th style="padding:8px;">Үр дүн</th><th style="padding:8px;">Төрөл</th><th style="padding:8px;">Тайлбар</th></tr>';
      exp.floatTests.forEach(function (f) {
        html += '<tr style="border-bottom:1px solid var(--line);"><td style="padding:6px 8px; font-family:monospace;">' + escapeHtml(f.Үйлдэл) + '</td><td style="padding:6px 8px; font-weight:bold; font-family:monospace; color:' + (f.Үр_дүн === false ? '#ef4444' : '#10b981') + ';">' + escapeHtml(String(f.Үр_дүн)) + '</td><td style="padding:6px 8px;">' + escapeHtml(f.Төрөл) + '</td><td style="padding:6px 8px; color:var(--muted);">' + escapeHtml(f.Тайлбар) + '</td></tr>';
      });
      html += '</table></div></div>';

      html += '</div>';
      expContainer.innerHTML = html;
    }

    function initAlgoTester(btnId, inputId, resId, callback) {
      var btn = document.getElementById(btnId);
      var input = document.getElementById(inputId);
      var res = document.getElementById(resId);
      if (!btn || !input || !res) return;

      btn.addEventListener('click', function () {
        try {
          var val = input.value;
          var output = callback(val);
          res.textContent = output;
        } catch (err) {
          res.textContent = 'Алдаа: ' + err.message;
        }
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          btn.click();
        }
      });
    }

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
