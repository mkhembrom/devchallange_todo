import styled from "styled-components";
import { TodoItem } from "../todoItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteAllCompletedTodo, saveTodosInTheLocalStorage } from "../../../features/todo/todoSlice";
import { RxTrash } from "react-icons/rx";

const Container = styled.div`
    width: 100% !important;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px 14px;
    border-radius: 8px;
    outline: none;
    border: 1px solid #e2e2e2;
`;

const Button = styled.button`
    border-radius:10px;
    background-color: #0075FF;
    color: #fff;
    width: 100px;
    padding: 14px 14px;
    cursor: pointer;
    border: none;

`;

const DeleteAlltodo = styled.button`
    padding: 10px 14px;
    background-color: #EA5657;
    color: #fff;
    border-radius: 6px;
    border: none;
    margin-left: auto !important;
    cursor: pointer;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    margin-top: 0.5rem;
`;

export const TodoListItem = ({ currenTab }) => {

    const dispatch = useDispatch();
    const todosIds = useSelector((state) => state.todos.todoIds);
    const todo = useSelector((state) => state.todos.todoList);

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo(message))
        setMessage('')
    }

    const [ids, setIds] = useState();


    useEffect(() => {
        let completedIds = todosIds
            .filter((id) => {
                if (currenTab === 1) {
                    return true
                }
                else if (currenTab === 2) {
                    return !todo[id].complete
                }
                else {
                    return todo[id].complete
                }
            })

        setIds(completedIds);
    }, [currenTab]);

    useEffect(() => {
        dispatch(saveTodosInTheLocalStorage());
    }, [todo, todosIds]);

    return (
        <Container>

            {
                currenTab != 3 && <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="add details"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit">Add</Button>
                </Form>
            }

            {
                todosIds.map((id) => todo[id]).filter((todo) => {
                    if (currenTab == 1) {
                        return true;
                    } else if (currenTab == 2) {
                        return !todo.complete;
                    } else if (currenTab == 3) {
                        return todo.complete;
                    }
                }).map((item, index) => {
                    return <TodoItem key={index} id={item.id} checked={item.complete} message={item.message} currenTab={currenTab} />
                })
            }

            {
                currenTab == 3 && (
                    <DeleteAlltodo onClick={() => dispatch(deleteAllCompletedTodo(ids))}>
                        <RxTrash size={14} color="#fff" />
                        delete all
                    </DeleteAlltodo>
                )
            }
        </Container>
    );
}