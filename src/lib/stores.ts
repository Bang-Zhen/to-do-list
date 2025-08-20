import { atom } from 'nanostores';

/*
	const todoData = {
		title: document.getElementById('todoTitle').value,
		dueDate: document.getElementById('todoDueDate').value,
		notes: document.getElementById('todoNotes').value,
		assignee: document.getElementById('todoAssignee').value,
		completed: false,
		workspaceId: currentWorkspace,
		createdBy: currentUser.uid,
		createdAt: serverTimestamp(),
	};
*/

export const $todos = atom<Todo[]>([])
export const setTodos = (todos: Todo[]) => {
    $todos.set(todos);
}

type Todo = {
    title: string;
    dueDate: string;
    notes: string;
    assignee: string;
    completed: boolean;
    workspaceId: string;
    createdBy: string;
    createdAt: Date;
};