document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tasks').addEventListener('click', (e) => {
    const target = e.target;
    if (target) {
      if (target.closest('.task-status')) {
        const imgDiv = target.closest('.task-status');
        const listItem = target.closest('.list-item');
        if (listItem.dataset.isCompleted === 'false') {
          imgDiv.innerHTML =
            '<img src="../public/images/task-done.png" width="28px;">';
          listItem.dataset.isCompleted = true;
        } else {
          imgDiv.innerHTML =
            '<img src="../public/images/task-not-done.png" width="28px;">';
          listItem.dataset.isCompleted = false;
        }
      }
    }
  });
});
