import React from 'react';
import profileReducer, { addPostAC, deletePost } from "./profile-reducer";


let state = {
    posts: [
        { id: 1, message: "Hello", like: '103' },
        { id: 2, message: "Bye", like: '133' },
    ],
};

test('length of posts should be incremented', () => {
    let action = addPostAC('Sanka');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
    let action = addPostAC('Sanka');
    let newState = profileReducer(state, action);
    expect(newState.posts[2].message).toBe('Sanka');
});


test('after deleting length of messages should be decrement', () => {
    let action = deletePost(3);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});

test('after deleting length shouldnt be decrement if id is incorrect', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});