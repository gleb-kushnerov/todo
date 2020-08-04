import './style.scss';
import Todo from './Todo';
import Sort from './Sort';

const containerEl = document.getElementById('container');
const TodoObj = new Todo(containerEl);
const SortObj = new Sort(TodoObj);
