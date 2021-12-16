import React from 'react';
import styled from 'styled-components';

const UserDiv = styled.div`
    margin: 5% 1% 1% 1%;
    width: 25%;
    border: 1px solid black;
    display: inline-block;
`
const UserH2 = styled.h2`
    font-size: 2rem;
    color: grey;
    font: 'Times New Roman';
    margin-top: 1;
    margin-bottom: 0;
`

const UserP = styled.p`
    color: black;
`

function User({ details }) {
    if (!details) {
        return <h3> Give me a moment! They're around here somewhere... </h3>
    }
    return (
        <UserDiv className='user container'>
            <UserH2>{details.first_name}</UserH2>
            <UserP>Email: {details.email}</UserP>
            <UserP>Password: {details.password}</UserP>
        </UserDiv> 
    )
}

export default User