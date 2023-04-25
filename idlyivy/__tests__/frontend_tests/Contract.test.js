import React from 'react';
import Contract from '../../pages/contract'
import Item from '../../components/Item'
import {render, screen, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'


afterEach(() => {
    cleanup(); 
})

describe("contract.js testing", () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Contract />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
