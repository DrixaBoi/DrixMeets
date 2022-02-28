import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppWrapper;
        given('the user has main page open', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
        });

        when('events are available', () => {

        });

        then('details will be hidden.', () => {
            expect(AppWrapper.find('.details-view')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppWrapper;
        given('the user had selected that event', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicked on the event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('#details-btn')).toHaveLength(2);
            AppWrapper.find('#details-btn').at(0).simulate('click');
        });

        then('details will be expanded.', () => {
            expect(AppWrapper.find('.details-view')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        let AppWrapper;
        given('the user is done with the event', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('#details-btn').at(0).simulate('click');
        });

        when('the user clicked to collapse event', () => {
            AppWrapper.find('#details-btn').at(0).simulate('click');
            expect(AppWrapper.find('.details-view')).toHaveLength(0);
        });

        then('details were once again hidden.', () => {
            expect(AppWrapper.find('.details-view')).toHaveLength(0);
        });
    });
});