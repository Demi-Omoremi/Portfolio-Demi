const root = document.documentElement;
const themeButton = document.querySelector('#theme');
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function updateTheme() {
  const dark = root.classList.contains('dark');
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('aria-pressed', String(dark));
  themeColor.setAttribute('content', dark ? '#121517' : '#ffffff');
}

themeButton.addEventListener('click', () => {
  root.classList.toggle('dark');
  try { localStorage.setItem('demi-theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch {}
  updateTheme();
});
systemTheme.addEventListener('change', event => {
  try { if (localStorage.getItem('demi-theme')) return; } catch {}
  root.classList.toggle('dark', event.matches);
  updateTheme();
});
updateTheme();

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (message.length < 10) {
    form.elements.message.setCustomValidity('Please write at least 10 characters.');
    form.elements.message.reportValidity();
    return;
  }
  const subject = encodeURIComponent('Portfolio inquiry');
  const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
  const emailLink = document.createElement('a');
  emailLink.href = `mailto:demiomoremi@gmail.com?subject=${subject}&body=${body}`;
  emailLink.click();
  document.querySelector('#form-status').textContent = 'Your message is ready in your email app. If it did not open, email demiomoremi@gmail.com directly.';
});
document.querySelector('#message').addEventListener('input', event => event.currentTarget.setCustomValidity(''));
