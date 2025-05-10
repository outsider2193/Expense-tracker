// ReportPDFDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10 },
    title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    tableHeader: { flexDirection: "row", borderBottom: "1pt solid black", marginBottom: 5 },
    tableRow: { flexDirection: "row", marginBottom: 2 },
    cell: { flex: 1, paddingRight: 5 },
});

const ReportPDFDocument = ({ reports }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return "Invalid Date";
        }
    };

    const getStartDate = (report) => report.startDate || report.date || report.createdAt || "N/A";
    const getEndDate = (report) => report.endDate || report.date || report.createdAt || "N/A";
    const getAmount = (report) => {
        if (report.totalAmount !== undefined) return report.totalAmount;
        switch (report.reportType) {
            case "Income":
            case "Expense":
            case "Budget":
            case "Transaction Summary":
                return report.amount || 0;
            case "Financial Goal":
                return report.targetAmount || 0;
            default:
                return 0;
        }
    };
    const getDetails = (report) => report.details || report.description || report.name || report.category || "-";

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Reports Dashboard</Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.cell}>Report Type</Text>
                    <Text style={styles.cell}>Start Date</Text>
                    <Text style={styles.cell}>End Date</Text>
                    <Text style={styles.cell}>Amount</Text>
                    <Text style={styles.cell}>Details</Text>
                </View>

                {reports.map((report, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.cell}>{report.reportType}</Text>
                        <Text style={styles.cell}>{formatDate(getStartDate(report))}</Text>
                        <Text style={styles.cell}>{formatDate(getEndDate(report))}</Text>
                        <Text style={styles.cell}>{getAmount(report).toFixed(2)}</Text>
                        <Text style={styles.cell}>{getDetails(report)}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default ReportPDFDocument;
