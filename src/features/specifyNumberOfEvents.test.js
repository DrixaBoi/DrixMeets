import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature( feature, test => {

    test('When a user hasn`t specified a number thirty-two will be the default number.', ({ given, when, then }) => {  
        let AppWrapper;
        given('the user hadn\'t stated a number of events', () => {
            AppWrapper = mount(<App />);
        });

        when('they do not choose the amount of events', () => {
            AppWrapper.update();
        });

        then('the default will set to thirty-two.', () => {
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        let AppWrapper;
        given('user wants to see a different amount of events', () => {
            AppWrapper = mount(<App />);
        });

        when('they change the amount they would like to view', () => {
            AppWrapper.update();
            AppWrapper.find('.numberOfEvents').simulate('change', { target: { value: 1 } });
        });

        then('they are shown the amount they prefer.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(1);
        });
    });

});