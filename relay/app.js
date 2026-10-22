const tasks = [
  {title: 'Write the launch story', label: 'CONTENT', owner: 'Copy & messaging', state: 0},
  {title: 'Polish the landing page', label: 'DESIGN', owner: 'Design & layout', state: 0},
  {title: 'Review the final checklist', label: 'LAUNCH', owner: 'Project review', state: 0}
];
function renderBoard(focusIndex) {
  document.querySelectorAll('[data-lane]').forEach(lane => lane.replaceChildren());
  tasks.forEach((task, index) => {
    const card = document.createElement('article');
    card.className = 'task';
    card.innerHTML = `<span class="task-tag">${task.label}</span><h4>${task.title}</h4><p class="task-meta">${task.owner}</p>`;
    if (task.state < 2) {
      const action = document.createElement('button');
      action.type = 'button';
      action.dataset.task = index;
      action.textContent = task.state === 0 ? 'Send to review →' : 'Mark complete ✓';
      action.setAttribute('aria-label', `${action.textContent}: ${task.title}`);
      action.addEventListener('click', () => {
        task.state += 1;
        document.querySelector('#board-status').textContent = `${task.title} moved to ${task.state === 1 ? 'In review' : 'Done'}.`;
        renderBoard(index);
      });
      card.append(action);
    } else {
      const complete = document.createElement('span');
      complete.className = 'task-complete';
      complete.textContent = '✓ Complete';
      card.append(complete);
    }
    document.querySelector(`[data-lane="${task.state}"]`).append(card);
  });
  document.querySelectorAll('[data-count]').forEach(count => {
    count.textContent = tasks.filter(task => task.state === Number(count.dataset.count)).length;
  });
  const done = tasks.filter(task => task.state === 2).length;
  document.querySelector('#progress-label').textContent = `${done} of 3 tasks complete`;
  document.querySelector('#progress-fill').style.width = `${done / 3 * 100}%`;
  if (focusIndex !== undefined) (document.querySelector(`[data-task="${focusIndex}"]`) || document.querySelector('#reset')).focus({preventScroll:true});
}
document.querySelector('#reset').addEventListener('click', () => {
  tasks.forEach(task => { task.state = 0; });
  renderBoard();
  document.querySelector('#board-status').textContent = 'Demo reset. Three tasks are ready to move.';
});
document.querySelectorAll('[name="billing"]').forEach(input => input.addEventListener('change', () => {
  const yearly = input.value === 'yearly';
  document.querySelector('#team-price').innerHTML = yearly ? '$10<span> / month</span>' : '$12<span> / month</span>';
  document.querySelector('#billing-note').textContent = yearly ? '$120 billed yearly. Example price only.' : '$12 billed monthly. Example price only.';
}));
renderBoard();
