import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todoList: [],
    todoIds: [],
}

const savedStateString = localStorage.getItem('savedState');

if (savedStateString) {
    const savedState = JSON.parse(savedStateString);
    initialState.todoIds = savedState.todoIds;
    initialState.todoList = savedState.todoList;
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todoIds.unshift(state.todoList.length)
            state.todoList.push({ id: state.todoList.length, message: action.payload, complete: false })
        },

        deleteTodo(state, action) {
            const index = state.todoIds.indexOf(action.payload)
            state.todoIds.splice(index, 1)
        },
        deleteAllCompletedTodo(state, action) {
            state.todoIds = state.todoIds.filter((id) => {
                return action.payload.indexOf(id) < 0;
            })
        },
        todoMarkAsComplete: (state, action) => {
            state.todoList[action.payload].complete = true
        },
        todoMarkAsIncomplete: (state, action) => {
            state.todoList[action.payload].complete = false
        },
        saveTodosInTheLocalStorage: (state) => {
            const [todoList, todoIds] = [state.todoList, state.todoIds];
            localStorage.setItem('savedState', JSON.stringify({ todoList, todoIds }));
        },
        inActiveTab(state, action) {
            state.activeTab = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, todoMarkAsComplete, todoMarkAsIncomplete, deleteAllCompletedTodo, saveTodosInTheLocalStorage, activeTab } = todoSlice.actions

export default todoSlice.reducer