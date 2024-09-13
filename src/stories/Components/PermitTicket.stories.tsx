import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import PermitTicket from "../../PermitTicket";
import { AddressUnitDesignator, FeeDisplayLayout, PaymentStatus, PayWith } from "../../PermitTicket/types";

export default {
    title: "Components/PermitTicket",
    component: PermitTicket
} as Meta;

export const Default: StoryFn = (args) => {
    return (
        <PermitTicket
            t={(string: string) => `test-${string}`}
            {...{
                paymentData: {
                    billing: {
                        startDate: "2024-09-01T10:00:00Z",
                        step: {
                            endDate: "2024-09-01T12:00:00Z",
                            duration: 120,
                            amount: 1000,
                            amountPlusVat: 1200,
                            amountWithoutBonification: 1000,
                            realAmount: 1000,
                            bonification: 0,
                            vat: 200,
                            fee: 50,
                            feePlusVat: 60,
                            total: 1260,
                            time: 120,
                            timeBalanceUsed: 0
                        },
                        payWith: PayWith.PaymentGateway,
                        spaceCount: 1
                    },
                    operation: {
                        id: "123456789",
                        billedOn: "2024-09-01T10:00:00Z",
                        startDate: "2024-09-01T10:00:00Z",
                        step: {
                            endDate: "2024-09-01T12:00:00Z",
                            duration: 120,
                            amount: 1000,
                            amountPlusVat: 1200,
                            amountWithoutBonification: 1000,
                            realAmount: 1000,
                            bonification: 0,
                            vat: 200,
                            fee: 50,
                            feePlusVat: 60,
                            total: 1260,
                            time: 120,
                            timeBalanceUsed: 0
                        },
                        balance: 500,
                        timeBalance: 60,
                        creditCardPan: "1234-5678-9012-3456",
                        layout: FeeDisplayLayout.DetailFee
                    },
                    status: PaymentStatus.ReadyToPay,
                    paymentError: null,
                    deferred: false
                },
                zone: "DD",
                vehicle: {
                    id: "abc123",
                    plate: "XYZ 1234",
                    data: {
                        nickname: "My Car",
                        color: "Red",
                        model: "Model S",
                        type: "Sedan",
                        province: "CA"
                    },
                    customData: [
                        {
                            key: "owner",
                            value: "John Doe"
                        }
                    ]
                },
                address: {
                    postalCode: "12345",
                    state: "CA",
                    city: "Los Angeles",
                    street: "Main St",
                    streetNumber: "123",
                    unit: {
                        designator: AddressUnitDesignator.Apartment,
                        unit: "5B"
                    }
                },
                user: {
                    givenName: "John",
                    familyName: "Doe",
                    email: "john.doe@example.com"
                },
                permitType: "Monthly",
                logo: null
            }}
            {...args}
        />
    );
};
