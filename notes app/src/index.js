import './style/style.css'; // Anggap Anda memiliki file CSS di dalam folder style

// Misalnya, Anda mungkin perlu mengimpor komponen-komponen Web yang telah Anda buat
import './script/component/note-form.js';
import './script/component/note-item.js';
import './script/component/header-bar.js';
import './script/Data/Local/notes-data.js'; // Pastikan pathnya benar

document.addEventListener('DOMContentLoaded', () => {
  console.log('Application loaded');
});