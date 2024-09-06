export interface PermitTicketProps {
    paymentData: InvoiceData;
    logo: any;
}

interface Recipient {
    name: string;
    email: string;
    address: string;
    cityStateZip: string;
}

interface Transaction {
    number: string;
    date: string;
    type: string;
    cardAmount: string;
    amount: string;
}

interface Invoice {
    date: string;
    number: string;
    description: string;
    price: number;
    total: number;
}

export interface InvoiceData {
    recipient: Recipient;
    transaction: Transaction;
    invoices: Invoice[];
    convenienceFee: number;
    totalAmount: number;
}

export enum PaymentStatus {
    NoPayment = 0,
    ReadyToPay = 1,
    ToVerify = 2,
    Paid = 3,
    Rejected = 4
}

export interface IntegraParkingOperation {
    /** @format int64 */
    id: string;
    /** @format date-time */
    startDate: string;
    step: ParkingOperationStep;
    /** @format int32 */
    balance: number;
    /** @format int32 */
    timeBalance: number;
    creditCardPan?: string | null;
    /**
     *
     *
     * 0 = NoFee
     *
     * 1 = DetailFee
     *
     * 2 = SummaryFee
     *
     * 3 = BonificationLayout
     */
    layout?: FeeDisplayLayout;
}

export enum FeeDisplayLayout {
    NoFee = 0,
    DetailFee = 1,
    SummaryFee = 2,
    BonificationLayout = 3
}

export interface PaymentResult {
    billing: BillingResult;
    operation?: IntegraParkingOperation;
    /**
     *
     *
     * 0 = NoPayment
     *
     * 1 = ReadyToPay
     *
     * 2 = ToVerify
     *
     * 3 = Paid
     *
     * 4 = Rejected
     */
    status: PaymentStatus;
    paymentError?: string | null;
    deferred: boolean;
}

export interface BillingResult {
    /** @format date-time */
    startDate: string;
    step: ParkingOperationStep;
    /**
     *
     *
     * 0 = PaymentGateway
     *
     * 10 = BankTransfer
     *
     * 11 = PayrollDiscount
     */
    payWith?: PayWith;
    /** @format int32 */
    spaceCount?: number | null;
}

export enum PayWith {
    PaymentGateway = 0,
    BankTransfer = 10,
    PayrollDiscount = 11
}

export interface ParkingOperationStep {
    /** @format date-time */
    endDate: string;
    /** @format int32 */
    duration: number;
    /** @format int32 */
    amount: number;
    /** @format int32 */
    amountPlusVat: number;
    /** @format int32 */
    amountWithoutBonification: number;
    /** @format int32 */
    realAmount: number;
    /** @format int32 */
    bonification: number;
    /** @format int32 */
    vat: number;
    /** @format int32 */
    fee: number;
    /** @format int32 */
    feePlusVat: number;
    /** @format int32 */
    total: number;
    /** @format int32 */
    time: number;
    /** @format int32 */
    timeBalanceUsed: number;
}
