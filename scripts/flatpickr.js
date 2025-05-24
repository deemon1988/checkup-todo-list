import { format, intervalToDuration, formatDuration } from 'date-fns';
import { createTask } from './crud.js';
import { formatDate } from '../public/scripts/utils.js';

const selectedDate = new Date();
const fp = flatpickr('#custom-date', {
  minDate: 'today',
  enableTime: true,
  altInput: true,
  altFormat: 'F j, Y H:i',
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  placeholder: 'Время выполнения',
  locale: 'ru',
  allowInput: true,

  onChange: function (selectedDates, dateStr, instance) {
    if (selectedDates.length > 0) {
      const date = selectedDates[0]; // объект Date
      const formattedDate = format(date, 'EEE MMM dd yyyy HH:mm');
      taskForm.dataset.date = formattedDate;

      const duration = intervalToDuration({ start: new Date(), end: date });
      const readable = formatDuration(duration, {
        format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes'],
        zero: false,
        delimiter: ', ',
      });

      console.log(`Осталось ${readable}`);
    }
  },
});

document.querySelector('[data-clear]').addEventListener('click', () => {
  fp.clear(); // Очистка даты
});

let newTask = {};
const labelsArray = {};
const taskForm = document.querySelector('#create-task-form');
addEventListener('DOMContentLoaded', () => {
  document.querySelector('#create-task-form').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('input[name="create-task"]')) {
      taskForm.dataset.name = document.querySelector(
        ".second__row input[name='task-name']",
      ).value;
      newTask = {
        name: taskForm.dataset.name,
        important: taskForm.dataset.important,
        labels: taskForm.dataset.labels.split(','),
        date:
          taskForm.dataset.date !== undefined ? taskForm.dataset.date : null,
        created: formatDate(),
        isDone: false,
        overdue: false,
      };
      createTask(newTask);
    }

    if (e.target.closest('.important')) {
      if (
        taskForm.dataset.important === undefined ||
        taskForm.dataset.important === 'false'
      ) {
        e.target.src = '../public/images/task-done.png';
        taskForm.dataset.important = 'true';
      } else {
        e.target.src = '../public/images/task-not-done.png';
        taskForm.dataset.important = 'false';
      }
    }

    if (e.target.closest('span')) {
      switch (e.target.textContent) {
        case 'Work':
          if (!labelsArray.work || labelsArray.work === 'false') {
            labelsArray.work = true;
            e.target.style.background = '#5783AB';
          } else {
            labelsArray.work = false;
            e.target.style.background = '#F2F3F4';
          }
          break;
        case 'Personal':
          if (!labelsArray.personal || labelsArray.personal === 'false') {
            labelsArray.personal = true;
            e.target.style.background = '#5783AB';
          } else {
            labelsArray.personal = false;
            e.target.style.background = '#F2F3F4';
          }
          break;
        case 'Hobby':
          if (!labelsArray.hobby || labelsArray.hobby === 'false') {
            labelsArray.hobby = true;
            e.target.style.background = '#5783AB';
          } else {
            labelsArray.hobby = false;
            e.target.style.background = '#F2F3F4';
          }
          break;
        case 'Home':
          if (!labelsArray.home || labelsArray.home === 'false') {
            labelsArray.home = true;
            e.target.style.background = '#5783AB';
          } else {
            labelsArray.home = false;
            e.target.style.background = '#F2F3F4';
          }
          break;
      }
      taskForm.dataset.labels = Object.keys(labelsArray).filter(
        (key) => labelsArray[key] === true,
      );
    }
  });
});
