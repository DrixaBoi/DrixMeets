import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });

    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({ numberOfEvents: '32' });
        const eventCount = { target: { value: '13' }};
        NumberOfEventsWrapper.find(".numberOfEvents").simulate("change", eventCount);
        expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual('13');
    });
});