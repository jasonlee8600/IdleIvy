import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'
import Leaderboard from '../../components/Leaderboard';


afterEach(() => {
    cleanup(); 
})

describe("Leaderboard testing", () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Leaderboard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});