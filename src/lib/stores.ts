import { atom } from 'nanostores';
import type { User } from 'firebase/auth';

export const $todos = atom<Todo[]>([])
export const setTodos = (todos: Todo[]) => {
    $todos.set(todos);
}

export const $currentUser = atom<User | null>(null);
export const setCurrentUser = (user: User | null) => {
    $currentUser.set(user);
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