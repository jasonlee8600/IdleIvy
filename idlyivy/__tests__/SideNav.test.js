import SideNav from '../components/SideNav'
import {render, screen, fireEvent} from '@testing-library/react'

test('Should return to homepage when clicking IdleIvy', () => {
    render(<SideNav />)
    const IdleIvy_btn = screen.getByTestId('return-home')
    fireEvent.click(IdleIvy_btn)
    expect(window.location.href).toEqual('http://localhost/')
});

test('Check title is IdleIvy', () => {
    render(<SideNav />)
    expect(screen.getByTestId('IdleIvy').innerHTML).toEqual('IdleIvy')
});