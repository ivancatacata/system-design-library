import React from "react";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { PayWith, PermitTicketProps } from "./types";
import { Page, Text, View, Document, StyleSheet, usePDF } from "@react-pdf/renderer";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Logo from "./logo";

dayjs.extend(utc);

const formatCurrency = ({
    value,
    factor = 0.01,
    currency = "USD"
}: {
    value: number;
    factor?: number;
    currency?: string;
}): string => {
    if (value == null) {
        return "-";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2,
        notation: "compact"
    }).format(value * factor);
};

const styles = StyleSheet.create({
    page: {
        display: "flex",
        fontFamily: "Helvetica",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        padding: 30
    },
    columnBlock: {
        display: "flex",
        flexDirection: "column",
        fontSize: 11
    },
    rowBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 11
    },
    transactionBlock: {
        display: "flex"
    },
    table: {
        display: "flex",
        flexDirection: "column",
        width: "auto"
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        display: "flex",
        width: "100%",
        textAlign: "center",
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    tableCol: {
        flexBasis: "14.27%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        marginTop: 5,
        fontSize: 10,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: 5
    },
    withBorderTop: {
        borderTopWidth: 1
    },
    withBorderLeft: {
        borderLeftWidth: 1
    },
    disclaimer: {
        marginTop: 20
    }
});

const PermitTicket: React.FC<PermitTicketProps & { t: any }> = ({
    paymentData,
    logo,
    user,
    permitType,
    address,
    vehicle,
    zone,
    t
}) => {
    const [{ loading, error, ...instance }] = usePDF({
        document: (
            <PDFDocument
                paymentData={paymentData}
                logo={logo}
                user={user}
                permitType={permitType}
                address={address}
                zone={zone}
                vehicle={vehicle}
                t={t}
            />
        )
    });

    const downloadFile = () => {
        console.log(instance.blob);
        let documentObjectURL;
        if (instance.blob) {
            documentObjectURL = URL.createObjectURL(instance.blob);
        }

        if (documentObjectURL) {
            const a = document.createElement("a");
            a.href = documentObjectURL;
            a.download = "ticket.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <Stack spacing={2} position={"relative"} py={1} pt={3} px={1.5}>
            <IconButton
                onClick={downloadFile}
                sx={{
                    position: "absolute",
                    top: ".2rem",
                    left: ".6rem",
                    zIndex: 3
                }}
            >
                <DownloadIcon fontSize="small" />
            </IconButton>
            <Stack>
                <PDFDocument
                    paymentData={paymentData}
                    logo={logo}
                    user={user}
                    permitType={permitType}
                    address={address}
                    vehicle={vehicle}
                    zone={zone}
                    t={t}
                    isWeb
                ></PDFDocument>
            </Stack>
        </Stack>
    );
};

const PDFDocument: React.FC<PermitTicketProps & { isWeb?: boolean; t: any }> = ({
    paymentData,
    user,
    permitType,
    address,
    vehicle,
    logo,
    zone,
    isWeb,
    t
}) => {
    return (
        <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={{ flexGrow: 1 }}>
                    <View style={{ ...styles.rowBlock, marginBottom: 30 }}>
                        <View style={styles.columnBlock}>
                            <Text>Pittsburgh Parking Authority</Text>
                            <Text>232 Boulevard of the Allies</Text>
                            <Text>Pittsburgh, PA, 15222</Text>
                        </View>
                        <View style={styles.columnBlock}>{isWeb ? <img src={logo} alt="logo" /> : <Logo />}</View>
                    </View>
                    <View style={styles.rowBlock}>
                        <View style={{ ...styles.rowBlock, gap: 10 }}>
                            <Text>TO</Text>
                            <View style={styles.columnBlock}>
                                <Text>{`${user.givenName} ${user.familyName}`}</Text>
                                <Text>{user.email}</Text>
                                <Text>{`${address.streetNumber} ${address.street}${address.unit?.unit ? ", " + address.unit.unit : ""}`}</Text>
                                <Text>{`${address.city}, ${address.state}, ${address.postalCode}`}</Text>
                            </View>
                        </View>

                        <View style={{ ...styles.rowBlock, gap: 8 }}>
                            <View style={{ ...styles.columnBlock, alignItems: "flex-end", textAlign: "right" }}>
                                <Text>Transaction #:</Text>
                                <Text>DATE:</Text>
                                <Text>Type:</Text>
                                {/* <Text>Card/Cheque Amount#:</Text> */}
                                <Text>Ammount:</Text>
                            </View>
                            <View style={styles.columnBlock}>
                                <Text style={{ color: "red" }}>{paymentData.operation?.id || "-"}</Text>
                                <Text>
                                    {paymentData?.operation?.billedOn
                                        ? dayjs.utc(paymentData?.operation?.billedOn).format("MM/DD/YYYY")
                                        : "-"}
                                </Text>
                                <Text>
                                    {paymentData.billing.payWith !== null && paymentData.billing.payWith !== undefined
                                        ? t(PayWith[paymentData.billing.payWith]) || "-"
                                        : "-"}
                                </Text>
                                {/* <Text>4875</Text> */}
                                <Text>{formatCurrency({ value: paymentData.billing.step.total })}</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 30,
                            textAlign: "center",
                            width: "100%"
                        }}
                    >
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>Invoices</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={{ ...styles.tableRow, backgroundColor: "#f0f0f0" }}>
                            <View style={{ ...styles.tableCol, ...styles.withBorderLeft, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Date</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop, flexBasis: "20.57%" }}>
                                <Text style={styles.tableCell}>Invoice#</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop, flexBasis: "36.57%" }}>
                                <Text style={styles.tableCell}>Description</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Price</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Total</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ ...styles.tableCol, ...styles.withBorderLeft }}>
                                <Text style={styles.tableCell}>
                                    {paymentData?.operation?.billedOn
                                        ? dayjs.utc(paymentData?.operation?.billedOn).format("MM/DD/YYYY")
                                        : "-"}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCol,
                                    flexBasis: "20.57%"
                                }}
                            >
                                <Text
                                    style={styles.tableCell}
                                >{`${dayjs.utc(paymentData.billing.startDate).format("YYYYMM")}-${paymentData.operation?.id}`}</Text>
                            </View>
                            <View
                                style={{
                                    ...styles.tableCol,
                                    flexBasis: "36.57%"
                                }}
                            >
                                <View style={{ ...styles.tableCell, flexDirection: "column" }}>
                                    <Text>{`${permitType}`}</Text>
                                    <Text>
                                        {`(${dayjs.utc(paymentData.billing.startDate).format("MM/DD/YYYY")} - ${dayjs.utc(paymentData.billing.step.endDate).format("MM/DD/YYYY")})`}
                                    </Text>
                                    <Text>{`${vehicle.data.model} ${vehicle.plate}`}</Text>
                                    <Text>{zone}</Text>
                                </View>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {formatCurrency({ value: paymentData.billing.step.amount })}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {formatCurrency({ value: paymentData.billing.step.amount })}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ ...styles.tableCol, borderBottomWidth: 0 }}></View>
                            <View style={{ ...styles.tableCol, maxWidth: "14.27%" }}>
                                <Text style={styles.tableCell}>Convenience Fee:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {formatCurrency({ value: paymentData.billing.step.feePlusVat })}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ ...styles.tableCol, borderBottomWidth: 0 }}></View>
                            <View style={{ ...styles.tableCol }}>
                                <Text style={styles.tableCell}>Total:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {formatCurrency({ value: paymentData.billing.step.total })}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column", fontSize: 10 }}>
                    <Text>Disclaimer:</Text>
                    <Text style={styles.disclaimer}>
                        I am a resident of the city, and that i am the owner of the motor vehicle(s) herein described. I
                        make these representations with the knowledge that they will be relied upon by the Parking
                        District in issuing a permit. I agree that the city shall not be liable for any loss of, damage
                        to, or theft of the above-described motor vehicle(s) or its/their contents while the motor
                        vehicle (s) is/are parked in any permitted parking area within the Parking District. In
                        accepting a permit and submitting payment, I understand and acknowledge that all fees are
                        non-refundable.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PermitTicket;
