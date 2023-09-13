import React from "react";
import { render,screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardIndex from "../../../pages/dashboard";

describe('dashboard page',()=>{
    it('Should render properly',()=>{
        render(<DashboardIndex/>);

        const header = screen.getByRole('heading')
        const headerText = 'hello'

        expect(header).toHaveTextContent(headerText)
    })

    it('Should have a disabled button',()=>{
        render(<DashboardIndex/>);

        const buttonElement = screen.getByRole('button')

        expect(buttonElement).toBeDisabled();
    })

    it('Should have a p tag with className of blue',()=>{
        render(<DashboardIndex/>);

        const pElement = screen.getByTestId('paragraph-blue');

        expect(pElement).toHaveClass('blue')
        expect(pElement).toHaveTextContent('This is our paragraph')
    })
})