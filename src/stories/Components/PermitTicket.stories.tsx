import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import PermitTicket from "../../PermitTicket";

export default {
    title: "Components/PermitTicket",
    component: PermitTicket
} as Meta;

export const Default: StoryFn = (args) => {
    return (
        <PermitTicket
            logo={"TEST123"}
            paymentData={{
                recipient: {
                    name: "DENISE HOLLANO",
                    email: "(OSPACE304@AOL.COM)",
                    address: "1140 MURRAY HILL AVENUE",
                    cityStateZip: "Pittsburgh, Pennsylvania, 15217"
                },
                transaction: {
                    number: "0190914YY",
                    date: "2024-05-16",
                    type: "Check",
                    cardAmount: "4875",
                    amount: "20.00"
                },
                invoices: [
                    {
                        date: "2024-05-16",
                        number: "#258332YY",
                        description: "Annual RPP - (05/16/2024 - 05/31/2025) - Z HONDA FRPAND(APA)",
                        price: 20.0,
                        total: 20.0
                    }
                ],
                convenienceFee: 0.0,
                totalAmount: 20.0
            }}
            {...args}
        />
    );
};
