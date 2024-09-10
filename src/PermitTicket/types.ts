export interface PermitTicketProps {
    paymentData: PaymentResult;
    vehicle: VehicleResult;
    address: Address;
    user: UserInfo;
    permitType: string;
    logo: any;
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
    billedOn: string;
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

export interface VehicleResult {
    id: string;
    plate: string;
    data: VehicleData;
    customData: CustomDataEntry[];
}

export interface VehicleData {
    nickname?: string | null;
    color?: string | null;
    model?: string | null;
    type?: string | null;
    province?: string | null;
}

export interface CustomDataEntry {
    key: string;
    value: string;
}

export interface UserInfo {
    givenName?: string | null;
    familyName?: string | null;
    email: string;
}

export interface Address {
    postalCode?: string | null;
    state?: string | null;
    city?: string | null;
    street?: string | null;
    streetNumber?: string | null;
    unit?: AddressUnit;
}

export interface AddressUnit {
    designator?: AddressUnitDesignator;
    unit: string;
}

export enum AddressUnitDesignator {
    None = 0,
    Apartment = 1,
    Basement = 2,
    Building = 3,
    Department = 4,
    Floor = 5,
    Front = 6,
    Hanger = 7,
    Key = 8,
    Lobby = 9,
    Lot = 10,
    Lower = 11,
    Office = 12,
    Penthouse = 13,
    Pier = 14,
    Rear = 15,
    Room = 16,
    Side = 17,
    Slip = 18,
    Space = 19,
    Stop = 20,
    Suite = 21,
    Trailer = 22,
    Unit = 23,
    Upper = 24
}
