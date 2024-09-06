import React from "react";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { PermitTicketProps, InvoiceData } from "./types";
import { Page, Text, View, Document, StyleSheet, usePDF, DocumentProps } from "@react-pdf/renderer";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Logo from "./logo";

dayjs.extend(utc);

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

const PermitTicket: React.FC<PermitTicketProps> = ({ paymentData, logo }) => {
    const [{ loading, error, ...instance }] = usePDF({
        document: <PDFDocument data={paymentData} logo={logo} />
    });

    console.log({
        paymentData,
        loading,
        error
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
                <PDFDocument data={paymentData} logo={logo}></PDFDocument>
            </Stack>
        </Stack>
    );
};

interface PDFDocumentProps extends DocumentProps {
    data: any;
    logo: any;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ data }: { data: InvoiceData }) => {
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
                        <View style={styles.columnBlock}>
                            <Logo />
                        </View>
                    </View>
                    <View style={styles.rowBlock}>
                        <View style={styles.columnBlock}>
                            <Text>{data.recipient.name}</Text>
                            <Text>{data.recipient.email}</Text>
                            <Text>{data.recipient.address}</Text>
                            <Text>{data.recipient.cityStateZip}</Text>
                        </View>

                        <View style={{ ...styles.rowBlock, gap: 8 }}>
                            <View style={styles.columnBlock}>
                                <Text style={{ textAlign: "right" }}>Transaction #:</Text>
                                <Text style={{ textAlign: "right" }}>DATE:</Text>
                                <Text style={{ textAlign: "right" }}>Card/Cheque Amount#:</Text>
                                <Text style={{ textAlign: "right" }}>Type:</Text>
                                <Text style={{ textAlign: "right" }}>Ammount:</Text>
                            </View>
                            <View style={styles.columnBlock}>
                                <Text style={{ color: "red" }}>{data.transaction.number}</Text>
                                <Text>{dayjs(data.transaction.date).format("MM/DD/YYYY")}</Text>
                                <Text>{data.transaction.cardAmount}</Text>
                                <Text>{data.transaction.type}</Text>
                                <Text>{data.transaction.amount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>Invoices</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={{ ...styles.tableRow, backgroundColor: "#f0f0f0" }}>
                            <View style={{ ...styles.tableCol, ...styles.withBorderLeft, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Date</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Invoice#</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop, flexBasis: "42.856%" }}>
                                <Text style={styles.tableCell}>Description</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Price</Text>
                            </View>
                            <View style={{ ...styles.tableCol, ...styles.withBorderTop }}>
                                <Text style={styles.tableCell}>Total</Text>
                            </View>
                        </View>
                        {data.invoices.map((invoice, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={{ ...styles.tableCol, ...styles.withBorderLeft }}>
                                    <Text style={styles.tableCell}>{dayjs(invoice.date).format("MM/DD/YYYY")}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{invoice.number}</Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.tableCol,
                                        flexBasis: "42.856%"
                                    }}
                                >
                                    <Text style={styles.tableCell}>{invoice.description}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>${invoice.price.toFixed(2)}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>${invoice.total.toFixed(2)}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={styles.tableRow}>
                            <View style={{ ...styles.tableCol, borderBottomWidth: 0 }}></View>
                            <View style={{ ...styles.tableCol }}>
                                <Text style={styles.tableCell}>Convenience Fee:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>${data.convenienceFee.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ ...styles.tableCol, borderBottomWidth: 0 }}></View>
                            <View style={{ ...styles.tableCol }}>
                                <Text style={styles.tableCell}>Total:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>${data.totalAmount.toFixed(2)}</Text>
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
