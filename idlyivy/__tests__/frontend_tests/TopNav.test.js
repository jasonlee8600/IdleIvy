import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import TopNav from '../../components/TopNav';


afterEach(() => {
    cleanup(); 
})

describe("TopNav testing", () => {
    test('renders correctly', () => {
        const tree = renderer.create(<TopNav />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('TopNav div rendering', () => {
        render(<TopNav />);
        const topnav = screen.getByTestId('topnav')
        expect(topnav).toBeInTheDocument()
    });
});