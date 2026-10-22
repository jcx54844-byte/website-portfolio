const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
menu.setAttribute('aria-label', 'Open menu');
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
 navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
  menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open menu'); navigation.classList.remove('is-open'); menu.focus();
 }
});
window.matchMedia('(min-width:681px)').addEventListener('change', () => {
 menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open menu'); navigation.classList.remove('is-open');
});
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
 filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
 let visible = 0;
 document.querySelectorAll('[data-category]').forEach(card => {
  card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  if (!card.hidden) visible++;
 });
 document.querySelector('#filter-status').textContent = `Showing ${visible} ${visible === 1 ? 'study' : 'studies'}`;
}));
const projects = {
 courtyard:{title:'Courtyard House',category:'01 / RESIDENTIAL STUDY',description:'A home organised around a pocket of open sky. Recessed seating, warm surfaces and a continuous floor imagine an easy relationship between indoors and outdoors.',materials:'Travertine, oak, linen and tactile plaster.',intention:'Let changing daylight define the atmosphere while keeping the everyday living space open and grounded.',alt:'AI-generated courtyard house with sunken seating, an olive tree and travertine flooring.'},
 gallery:{title:'Form Gallery',category:'02 / COMMERCIAL STUDY',description:'A quiet backdrop for ceramics and collected objects. Sculptural plinths and a single arch create a slow journey through the room.',materials:'Warm plaster, microcement, walnut and hand-built ceramics.',intention:'Give each object breathing room and guide visitors with proportion rather than visual noise.',alt:'AI-generated ceramics gallery with cream plinths, an arch and a walnut bench.'},
 office:{title:'Quiet Studio',category:'03 / COMMERCIAL STUDY',description:'A compact workplace centred on a shared oak table. Soft texture and natural light balance focused tasks with moments of conversation.',materials:'Oak, olive textile, brushed metal and light plaster.',intention:'Create a calm place to gather, work and exchange ideas without feeling like a conventional office.',alt:'AI-generated workspace with an oak worktable, an olive curtain and tall windows.'}
};
const dialog = document.querySelector('#project-dialog');
let opener;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
 const project = projects[button.dataset.project]; opener = button;
 for (const field of ['title','category','description','materials','intention']) document.querySelector(`#dialog-${field}`).textContent = project[field];
 const image = document.querySelector('#dialog-image'); image.src = `assets/${button.dataset.project}.webp`; image.alt = project.alt;
 dialog.showModal();
}));
if (dialog) {
 document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('keydown', event => {
  if(event.key !== 'Tab') return;
  const first = dialog.querySelector('.dialog-close');
  const last = dialog.querySelector('a');
  if(event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
  else if(!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
 });
 dialog.addEventListener('close', () => { if(opener) opener.focus({preventScroll:true}); });
}
const form = document.querySelector('#enquiry-form');
if (form) {
 const result = document.querySelector('#enquiry-result');
 const brief = form.elements.brief;
 const error = document.querySelector('#brief-error');
 form.addEventListener('input', () => {result.hidden = true;brief.setCustomValidity('');error.hidden = true;});
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!brief.value.trim()) {brief.setCustomValidity('Please describe your idea in a few words.');error.hidden=false;brief.reportValidity();return;}
  if (!form.reportValidity()) return;
  const title = document.createElement('strong');title.textContent='Enquiry preview — nothing was sent or saved.';
  const choices = document.createElement('p');choices.textContent=`${form.elements.type.value} · ${form.elements.timing.value}`;
  const description = document.createElement('p');description.textContent=brief.value.trim();
  result.replaceChildren(title,choices,description);result.hidden=false;result.focus({preventScroll:true});
 });
}
