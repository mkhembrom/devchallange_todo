import React, { useState } from "react";
import styled from "styled-components"
import { TodoListItem } from "./components/todoListItem";

const Wrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 600px) {
       padding: 0 1.2rem;
    }
`;

const Title = styled.h1`

`;

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 1.5rem;
    border-bottom: 1px solid #b2b2b2;
`;

const Li = styled.button`
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 1.2px;
    text-align: center;
    max-width: 100%;
    padding: 0 1rem;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: none;
    
   
    padding-bottom: 0.75rem;
    
    &::before{
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: ${(props) => props.id == props.currenTab ? "#0075FF" : ""};
        width: 100%;
        height: 4px;

        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
`;


const Container = styled.div`
    width: 100%; 
`;

export const HomePage = () => {

    const [currenTab, setCurrentTab] = useState(1);

    const tabs = [
        {
            id: 1,
            title: "All",
            content: "All"
        },
        {
            id: 2,
            title: "Active",
            content: "Active"
        },
        {
            id: 3,
            title: "Completed",
            content: "Completed"
        }
    ];

    const handleTabs = (e) => {
        setCurrentTab(e.target.id)
    }


    return (
        <Wrapper>
            <Title>#todo</Title>
            <Ul>
                {
                    tabs.map((item, index) => (
                        <Li key={index} id={item.id} currenTab={currenTab} onClick={handleTabs}>{item.title}</Li>
                    ))
                }
            </Ul>

            <Container>
                <TodoListItem currenTab={currenTab} />
            </Container>
        </Wrapper>
    );
}