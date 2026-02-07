document.getElementById('add-task').addEventListener('click', function() {
  const taskTitle = document.getElementById('new-task').value;
  const taskDescription = document.getElementById('new-description').value;

  // Check if the task title is not empty
  if (taskTitle.trim() !== '') {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    // Create task item with title and description
    taskItem.innerHTML = `
      <span class="task-title">
        ${taskTitle}
        <small style="font-size: 0.85rem; color: #888; margin-left: 10px;">${taskDescription}</small>
      </span>
      <div class="task-actions">
        <button class="btn-action btn-delete" title="Delete Task">&#x2716;</button>
      </div>
    `;

    // Add delete functionality to the delete button
    taskItem.querySelector('.btn-delete').addEventListener('click', function() {
      taskItem.remove();
    });

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear input fields
    document.getElementById('new-task').value = '';
    document.getElementById('new-description').value = '';
  }
});