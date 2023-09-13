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
})