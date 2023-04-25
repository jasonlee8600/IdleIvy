import React from 'react';
import SideNav from '../../components/SideNav'
import {render, screen, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer';

afterEach(() => {
    cleanup(); 
})

describe("SideNav testing", () => {
    test('renders correctly', () => {
        const tree = renderer.create(<SideNav />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    test('Check title is IdleIvy', () => {
        render(<SideNav/>)
        const title = screen.getByTestId('title')
        expect(title.innerHTML).toEqual('IdleIvy')
    });
    
    test('Check balance text', () => {
        render(<SideNav />)
        const text = screen.getByTestId('balance')
        expect(text.innerHTML).toEqual('Balance:')
    });
    
    test('Check rate text', () => {
        render(<SideNav />)
        const text = screen.getByTestId('rate')
        expect(text.innerHTML).toEqual('Rate:')
    });
    
    test('Check leaderboard text', () => {
        render(<SideNav />)
        const text = screen.getByTestId('leaderboard')
        expect(text.innerHTML).toEqual('Leaderboard')
    });
    
    test('Check home text', () => {
        render(<SideNav />)
        const text = screen.getByTestId('home')
        expect(text.innerHTML).toEqual('Home')
    });
});
