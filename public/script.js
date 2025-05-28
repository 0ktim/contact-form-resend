document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (res.ok) {
    alert('Изпратено успешно!');
    this.reset();
  } else {
    alert('Грешка при изпращане.');
  }
});
