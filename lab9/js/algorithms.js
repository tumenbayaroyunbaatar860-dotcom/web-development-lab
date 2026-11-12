/**
 * Лаб 9 - Даалгавар 2:
 * js/algorithms.js - Дараах 8 функц (бэлэн функц хэрэглэхгүйгээр бичнэ):
 * 1. sumTo(n)
 * 2. factorial(n)
 * 3. isPrime(n)
 * 4. fizzBuzz(n)
 * 5. countVowels(str)
 * 6. isPalindrome(str)
 * 7. maxOf(arr)
 * 8. digitSum(n)
 */

/**
 * 1. sumTo(n)
 * 1-ээс n хүртэлх бүх бүхэл тооны нийлбэрийг олно (1 + 2 + ... + n).
 * Бэлэн томьёо эсвэл бэлэн функц ашиглалгүйгээр for давталтаар бодно.
 * @param {number} n
 * @returns {number}
 */
function sumTo(n) {
  n = Number(n);
  if (isNaN(n) || n < 1) return 0;
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * 2. factorial(n)
 * n тооны факториал буюу n! = 1 * 2 * ... * n-ийг тооцоолно (0! = 1).
 * Бэлэн сан ашиглахгүйгээр for давталтаар бодно.
 * @param {number} n
 * @returns {number|null} Сөрөг тоо өгвөл null буцаана.
 */
function factorial(n) {
  n = Number(n);
  if (isNaN(n) || n < 0) return null;
  if (n === 0 || n === 1) return 1;
  var result = 1;
  for (var i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * 3. isPrime(n)
 * n тоо анхны тоо мөн эсэхийг шалгана (true / false).
 * Анхны тоо нь зөвхөн 1 ба өөртөө хуваагддаг 1-ээс их бүхэл тоо юм.
 * Бэлэн Math.sqrt ашиглахгүйгээр i * i <= n нөхцөлтэй давталтаар шалгана.
 * @param {number} n
 * @returns {boolean}
 */
function isPrime(n) {
  n = Number(n);
  if (isNaN(n) || n <= 1 || n % 1 !== 0) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  // 6k ± 1 алхамаар шалгах
  for (var i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

/**
 * 4. fizzBuzz(n)
 * 1-ээс n хүртэлх тоонуудыг шалгаж:
 * - 3 ба 5-д хоёуланд хуваагдвал "FizzBuzz"
 * - 3-т хуваагдвал "Fizz"
 * - 5-д хуваагдвал "Buzz"
 * - Бусад үед тухайн тоог агуулсан массив үүсгэн буцаана.
 * @param {number} n
 * @returns {Array}
 */
function fizzBuzz(n) {
  n = Number(n);
  if (isNaN(n) || n < 1) return [];
  var result = [];
  for (var i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(i);
    }
  }
  return result;
}

// Нэг тоон дээр шууд утга авах туслах метод:
fizzBuzz.single = function (num) {
  num = Number(num);
  if (isNaN(num)) return '';
  if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
  if (num % 3 === 0) return 'Fizz';
  if (num % 5 === 0) return 'Buzz';
  return num;
};

/**
 * 5. countVowels(str)
 * Өгөгдсөн тэмдэгт мөрөн дэх эгшиг үсгүүдийн тоог тоолно.
 * Бэлэн regex.match ашиглахгүйгээр давхар давталтаар гараар тоолно.
 * Англи (a, e, i, o, u) болон монгол (а, э, и, о, у, ө, ү, я, е, ё, ю, ы) эгшгүүдийг дэмжинэ.
 * @param {string} str
 * @returns {number}
 */
function countVowels(str) {
  if (str === null || str === undefined) return 0;
  var s = String(str);
  var vowels = 'aeiouаэиоуөүяеёюы';
  var count = 0;
  for (var i = 0; i < s.length; i++) {
    var ch = s[i].toLowerCase();
    for (var j = 0; j < vowels.length; j++) {
      if (ch === vowels[j]) {
        count++;
        break;
      }
    }
  }
  return count;
}

/**
 * 6. isPalindrome(str)
 * Өгөгдсөн мөр урдаасаа болон ардаасаа ижил уншигддаг эсэхийг шалгана.
 * Бэлэн split('').reverse().join('') ашиглахгүйгээр хоёр захаас нь зэрэг шалгах (two pointers) давталтаар бодно.
 * Зай болон тусгай тэмдэгтийг тооцохгүй, том жижиг үсгийг ялгахгүй.
 * @param {string|number} str
 * @returns {boolean}
 */
function isPalindrome(str) {
  if (str === null || str === undefined) return false;
  var s = String(str);
  if (s.length === 0) return true;

  var left = 0;
  var right = s.length - 1;

  while (left < right) {
    var cL = s[left].toLowerCase();
    var cR = s[right].toLowerCase();

    // Зай, таб, цэг, таслал, зураасыг алгасах
    if (cL === ' ' || cL === '\t' || cL === '\n' || cL === '-' || cL === '_' || cL === ',' || cL === '.') {
      left++;
      continue;
    }
    if (cR === ' ' || cR === '\t' || cR === '\n' || cR === '-' || cR === '_' || cR === ',' || cR === '.') {
      right--;
      continue;
    }

    if (cL !== cR) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

/**
 * 7. maxOf(arr)
 * Массив эсвэл жагсаалтаар өгөгдсөн тоонуудаас хамгийн их утгыг олж буцаана.
 * Бэлэн Math.max(...) ашиглахгүйгээр давталтаар харьцуулж олно.
 * Жишээ: maxOf([3, 7, 2, 9, 1]) эсвэл maxOf(3, 7, 2, 9, 1) аль аль хэлбэрийг дэмжинэ.
 * @param {Array|...number} arr
 * @returns {number|null}
 */
function maxOf(arr) {
  var items;
  if (Array.isArray(arr)) {
    items = arr;
  } else if (arguments.length > 0) {
    items = arguments;
  } else {
    return null;
  }
  if (items.length === 0) return null;

  var max = Number(items[0]);
  for (var i = 1; i < items.length; i++) {
    var val = Number(items[i]);
    if (!isNaN(val) && val > max) {
      max = val;
    }
  }
  return isNaN(max) ? null : max;
}

/**
 * 8. digitSum(n)
 * Өгөгдсөн бүхэл тооны бүх цифрүүдийн нийлбэрийг олно (жишээ: 123 -> 1 + 2 + 3 = 6).
 * Бэлэн мөр хөрвүүлэлт, split/reduce ашиглахгүйгээр 10-т хуваах үлдэгдлээр (% 10) математик аргаар бодно.
 * @param {number} n
 * @returns {number}
 */
function digitSum(n) {
  var num = Math.abs(Number(n));
  if (isNaN(num)) return 0;
  num = Math.floor(num);
  var sum = 0;
  while (num > 0) {
    sum += (num % 10);
    num = Math.floor(num / 10);
  }
  return sum;
}

// Глобал болон модуль экспортыг хангах (хөтөч болон Node.js орчинд хоёуланд нь ажиллана)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sumTo: sumTo,
    factorial: factorial,
    isPrime: isPrime,
    fizzBuzz: fizzBuzz,
    countVowels: countVowels,
    isPalindrome: isPalindrome,
    maxOf: maxOf,
    digitSum: digitSum
  };
}

if (typeof window !== 'undefined') {
  window.sumTo = sumTo;
  window.factorial = factorial;
  window.isPrime = isPrime;
  window.fizzBuzz = fizzBuzz;
  window.countVowels = countVowels;
  window.isPalindrome = isPalindrome;
  window.maxOf = maxOf;
  window.digitSum = digitSum;
  window.Algorithms = {
    sumTo: sumTo,
    factorial: factorial,
    isPrime: isPrime,
    fizzBuzz: fizzBuzz,
    countVowels: countVowels,
    isPalindrome: isPalindrome,
    maxOf: maxOf,
    digitSum: digitSum
  };
}
