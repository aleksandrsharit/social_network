import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';
import { Provider } from 'react-redux';
import store from '../../../redux/redux-store';

describe('ProfileStatus component', () => {
    test('status from props should be in the state ', () => {
        const component = create(
            <Provider store={store}>
                <ProfileStatus status='Sanka' />
            </Provider>
        );
        const instance = component.root;
        expect(instance.findByType(ProfileStatus).props.status).toBe('Sanka');
    });

    test('after creating <span> should be displayed', () => {
        const component = create(
            <Provider store={store}>
                <ProfileStatus status='Sanka' />
            </Provider>
        );
        const instance = component.root;
        let span = instance.findByType('span');
        expect(span).not.toBeNull(); 
    });

    // test('after creating <span> contains correct status', () => {
    //     const component = create(
    //         <Provider store={store}>
    //             <ProfileStatus status='Sanka' />
    //         </Provider>
    //     );
    //     const instance = component.root;
    //     let span = instance.findByType('span');
    //     expect(span.textContent).toBe('Sanka');
    // });
}
)
