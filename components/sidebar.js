// components/sidebar.js
// Renderização e controle da barra lateral de tópicos

function renderSidebar(filter = '') {
  const list   = document.getElementById('sidebar-list');
  const topics = Object.keys(DA);
  list.innerHTML = '';

  topics
    .filter(t => t.toLowerCase().includes(filter.toLowerCase()))
    .forEach(t => {
      const d    = DA[t];
      const done = studyProgress[t] >= 3;

      const el = document.createElement('div');
      el.className =
        'topic-item' +
        (t === currentTopic ? ' active' : '') +
        (done ? ' done' : '');

      el.innerHTML = `
        <span class="t-icon">${d.icon}</span>
        <span class="t-name">${t}</span>
        <span class="t-check">✓</span>`;

      el.onclick = () => selectTopic(t);
      list.appendChild(el);
    });
}

function filterTopics() {
  renderSidebar(document.getElementById('search-input').value);
}

function updateSidebarProgress() {
  const topics = Object.keys(DA);
  const done   = topics.filter(t => studyProgress[t] >= 3).length;
  const pct    = Math.round((done / topics.length) * 100);

  document.getElementById('prog-pct').textContent         = pct + '%';
  document.getElementById('sidebar-prog-fill').style.width = pct + '%';
  document.getElementById('top-prog').textContent         = done + ' / ' + topics.length + ' tópicos';
}

function selectTopic(t) {
  currentTopic = t;
  renderSidebar(document.getElementById('search-input').value);
  renderCurrentView();

  if (!studyProgress[t]) studyProgress[t] = 1;
  updateSidebarProgress();
}
