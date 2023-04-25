import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTodo, todoMarkAsComplete, todoMarkAsIncomplete } from "../../../features/todo/todoSlice";
import { RxTrash } from 'react-icons/rx';

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const Item = styled.div`
    display: flex;
    
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
`;


const Input = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;


const Paragraph = styled.p`
    font-size: 0.85rem !important;
    font-weight: 200 !important;
    text-decoration: ${(props) => props.isComplete ? `line-through` : 'none'};
`;

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;


export const TodoItem = ({ id, checked, message, currenTab }) => {

    const dispatch = useDispatch();

    const handleChange = (e, ids) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            dispatch(todoMarkAsComplete(ids))

        } else {
            dispatch(todoMarkAsIncomplete(ids))
        }
    }

    return (
        <Flex>
            <Item>
                <Input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleChange(e, id)}
                />
                <Paragraph isComplete={checked}>{message}</Paragraph>
            </Item>
            {
                currenTab == 3 && (
                    <Button onClick={() => dispatch(deleteTodo(id))}>
                        <RxTrash size={20} color="#b2b2b2" />
                    </Button>
                )
            }
        </Flex>
    );
}