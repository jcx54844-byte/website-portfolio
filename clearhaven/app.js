const form = document.querySelector('#enquiry-form');
const result = document.querySelector('#result');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    form.elements.service.value = link.dataset.service;
    result.hidden = true;
  });
});
form.addEventListener('input', () => { result.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const heading = document.createElement('strong');
  heading.textContent = 'Demo complete — nothing was sent or booked.';
  const summary = document.createElement('p');
  summary.textContent = `${form.elements.service.value} · ${form.elements.size.value}`;
  const note = document.createElement('p');
  note.textContent = form.elements.priority.value.trim() || 'No additional priority entered.';
  result.replaceChildren(heading, summary, note);
  result.hidden = false;
  result.focus({preventScroll: true});
});
