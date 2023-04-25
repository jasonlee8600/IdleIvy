import React from 'react';
import Home from '../../pages/index'
import {render, screen, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

afterEach(() => {
    cleanup(); 
})

describe("index.js testing", () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('index.js rendering', () => {
        render(<Home />);
        const index = screen.getByTestId('index')
        expect(index).toBeInTheDocument()
    });

    test('Check title is IdleIvy', () => {
        render(<Home />)
        const title = screen.getByTestId('title')
        expect(title.innerHTML).toEqual('IdleIvy')
    });
});