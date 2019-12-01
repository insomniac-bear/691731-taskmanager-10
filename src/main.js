import {createBoardTemplate} from './components/board.js';
import {createBoardTasksTemplate} from './components/board-tasks.js';
import {createLoadMoreButtonTemplate} from './components/load-more-buttom.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteFilterTemplate} from './components/filter.js';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

const filters = generateFilters();
render(siteMainElement, createSiteFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);

render(siteBoardElement, createBoardTasksTemplate(), `beforeend`);

const taskListElement = siteBoardElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(siteBoardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
