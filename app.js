let passwordInput = document.getElementById('password');
// Remove readonly so user can edit/delete
passwordInput.removeAttribute('readonly');
let lengthSlider = document.getElementById('length');
let lengthNum = document.getElementById('length-num');
let uppercase = document.getElementById('uppercase');
let lowercase = document.getElementById('lowercase');
let numbers = document.getElementById('numbers');
let symbols = document.getElementById('symbols');
let all = document.getElementById('all');
let easySay = document.getElementById('easy_say');
let easyRead = document.getElementById('easy_read');
let copyBtn = document.getElementById('copy_btn');
let refreshBtn = document.getElementById('refresh_btn');
let copyPasswordBtn = document.getElementById('copy_password');

let UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let LOWER = "abcdefghijklmnopqrstuvwxyz";
let NUM = "0123456789";
let SYM = "!@#$%^&*()_+[]{}|;:,.<>?/~";
let EASY_READ = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
let EASY_SAY = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";

function getPasswordStrength(pwd) {
  let score = 0;
  if (!pwd) return 0;
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  return Math.min((score / 6) * 100, 100);
}

function updateStrengthBar() {
  let fill = document.getElementById('strength-fill');
  if (!fill) return;
  let strength = getPasswordStrength(passwordInput.value);
  fill.style.width = strength + '%';
  if (strength < 30) {
    fill.style.background = '#ff5252'; // red
  } else if (strength < 60) {
    fill.style.background = '#ffeb3b'; // yellow
  } else if (strength < 100) {
    fill.style.background = '#4caf50'; // green
  } else {
    fill.style.background = '#087f23'; // dark green
  }
}

function generatePassword() {
  let chars = "";
  if (all.checked) {
    if (uppercase.checked) chars += UPPER;
    if (lowercase.checked) chars += LOWER;
    if (numbers.checked) chars += NUM;
    if (symbols.checked) chars += SYM;
  } else if (easyRead.checked) {
    chars = EASY_READ;
  } else if (easySay.checked) {
    chars = EASY_SAY;
  }
  if (!chars) chars = UPPER + LOWER + NUM + SYM;
  let pwd = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = pwd;
  updateStrengthBar();
}

function syncLengthInputs(e) {
  lengthSlider.value = lengthNum.value = e.target.value;
  generatePassword();
}

lengthSlider.addEventListener('input', syncLengthInputs);
lengthNum.addEventListener('input', syncLengthInputs);

[uppercase, lowercase, numbers, symbols, all, easyRead, easySay].forEach(el => {
  el.addEventListener('change', generatePassword);
});

refreshBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
});

copyPasswordBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
});

window.onload = function() {
  generatePassword();
  updateStrengthBar();
};
