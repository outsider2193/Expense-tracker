// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
// import { Bar, Pie, Line } from "react-chartjs-2";
// // import { useNavigate } from "react-router-dom";

// export const ReportDashboard = () => {
//   const [reports, setReports] = useState([]);
//   // const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       // Use the existing route as in your original code
//       const res = await axios.get(`http://localhost:3000/reports/user/${userId}`);
//       console.log(res.data.data);
//       setReports(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   const handleDelete = async (id, reportType) => {
//     try {
//       // Keep the original delete logic with endpoint mapping
//       const endpointMap = {
//         "Income": "incomes",
//         "Expense": "expenses",
//         "Budget": "budgets",
//         "Financial Goal": "financialgoals",
//         "Transaction Summary": "transactions"
//       };

//       const endpoint = endpointMap[reportType] || "reports";
//       await axios.delete(`http://localhost:3000/${endpoint}/${id}`);
//       fetchReports();
//     } catch (error) {
//       console.error("Error deleting report:", error);
//     }
//   };

//   const reportTypes = ["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"];
//   const filteredReports = (type) => reports.filter((report) => report.reportType === type);

//   // Updated to handle both original field names and new schema field names
//   const getAmount = (report) => {
//     // First check the new schema field
//     if (report.totalAmount !== undefined) {
//       return report.totalAmount;
//     }

//     // Fall back to original logic
//     switch (report.reportType) {
//       case "Income":
//         return report.amount || 0;
//       case "Expense":
//         return report.amount || 0;
//       case "Budget":
//         return report.amount || 0;
//       case "Financial Goal":
//         return report.targetAmount || 0;
//       case "Transaction Summary":
//         return report.amount || 0;
//       default:
//         return 0;
//     }
//   };

//   // Safe date formatting function - handles both date formats
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (e) {
//       console.log(e);
//       return "Invalid Date";
//     }
//   };

//   // Get the start date for a report
//   const getStartDate = (report) => {
//     return report.startDate || report.date || report.createdAt || "N/A";
//   };

//   // Get the end date for a report
//   const getEndDate = (report) => {
//     return report.endDate || report.date || report.createdAt || "N/A";
//   };

//   // Get the description/details for a report
//   const getDetails = (report) => {
//     return report.details || report.description || report.name || report.category || "-";
//   };

//   const combinedChartData = {
//     labels: reportTypes,
//     datasets: [
//       {
//         label: "Total Amount",
//         data: reportTypes.map((type) => {
//           const total = filteredReports(type).reduce((sum, report) => sum + getAmount(report), 0);
//           return total;
//         }),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <Typography variant="h4" align="center" gutterBottom>
//         Reports Dashboard
//       </Typography>

//       {reportTypes.map((type) => (
//         <div key={type} style={{ marginTop: "30px" }}>
//           <Typography variant="h5" align="center" gutterBottom>
//             {type} Reports
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Start Date</TableCell>
//                   <TableCell>End Date</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Details</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredReports(type).length > 0 ? (
//                   filteredReports(type).map((report) => (
//                     <TableRow key={report._id}>
//                       <TableCell>{formatDate(getStartDate(report))}</TableCell>
//                       <TableCell>{formatDate(getEndDate(report))}</TableCell>
//                       <TableCell>{getAmount(report).toFixed(2)} Rs</TableCell>
//                       <TableCell>{getDetails(report)}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           onClick={() => handleDelete(report._id, report.reportType)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No {type} reports found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       ))}
//       {reports.length > 0 && (
//         <>
//           <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
//             Combined Reports Overview
//           </Typography>
//           <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
//             <div style={{ width: "45%" }}>
//               <Bar data={combinedChartData} />
//             </div>
//             <div style={{ width: "30%" }}>
//               <Pie data={combinedChartData} />
//             </div>
//             <div style={{ width: "45%" }}>
//               <Line data={combinedChartData} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"

// export const ReportDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/reports/user/${userId}`);
//       setReports(res.data.data || []);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   const handleDelete = async (id, reportType) => {
//     try {
//       const endpointMap = {
//         "Income": "incomes",
//         "Expense": "expenses",
//         "Budget": "budgets",
//         "Financial Goal": "financialgoals",
//         "Transaction Summary": "transactions"
//       };

//       const endpoint = endpointMap[reportType] || "reports";
//       await axios.delete(`http://localhost:3000/${endpoint}/${id}`);
//       fetchReports();
//     } catch (error) {
//       console.error("Error deleting report:", error);
//     }
//   };

//   const reportTypes = ["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"];
//   const filteredReports = (type) => reports.filter((report) => report.reportType === type);

//   const getAmount = (report) => {
//     if (report.totalAmount !== undefined) {
//       return report.totalAmount;
//     }
//     switch (report.reportType) {
//       case "Income":
//       case "Expense":
//       case "Budget":
//       case "Transaction Summary":
//         return report.amount || 0;
//       case "Financial Goal":
//         return report.targetAmount || 0;
//       default:
//         return 0;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (e) {
//       console.log(e);
//       return "Invalid Date";
//     }
//   };

//   const getStartDate = (report) => {
//     return report.startDate || report.date || report.createdAt || "N/A";
//   };

//   const getEndDate = (report) => {
//     return report.endDate || report.date || report.createdAt || "N/A";
//   };

//   const getDetails = (report) => {
//     return report.details || report.description || report.name || report.category || "-";
//   };

//   const combinedChartData = {
//     labels: reportTypes,
//     datasets: [
//       {
//         label: "Total Amount",
//         data: reportTypes.map((type) => {
//           const total = filteredReports(type).reduce((sum, report) => sum + getAmount(report), 0);
//           return total;
//         }),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };

//   // CSV Export
//   const exportToCSV = () => {
//     const headers = ["Report Type", "Start Date", "End Date", "Amount", "Details"];
//     const rows = reports.map((report) => [
//       report.reportType,
//       formatDate(getStartDate(report)),
//       formatDate(getEndDate(report)),
//       getAmount(report).toFixed(2),
//       getDetails(report),
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "reports.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // PDF Export
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Reports Dashboard", 14, 22);

//     const tableColumn = ["Report Type", "Start Date", "End Date", "Amount", "Details"];
//     const tableRows = reports.map((report) => [
//       report.reportType,
//       formatDate(getStartDate(report)),
//       formatDate(getEndDate(report)),
//       getAmount(report).toFixed(2),
//       getDetails(report),
//     ]);

//     doc.autoTable({
//       startY: 30,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 10 },
//     });

//     doc.save("reports.pdf");
//   };

//   return (
//     <div>
//       <Typography variant="h4" align="center" gutterBottom>
//         Reports Dashboard
//       </Typography>

//       {reportTypes.map((type) => (
//         <div key={type} style={{ marginTop: "30px" }}>
//           <Typography variant="h5" align="center" gutterBottom>
//             {type} Reports
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Start Date</TableCell>
//                   <TableCell>End Date</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Details</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredReports(type).length > 0 ? (
//                   filteredReports(type).map((report) => (
//                     <TableRow key={report._id}>
//                       <TableCell>{formatDate(getStartDate(report))}</TableCell>
//                       <TableCell>{formatDate(getEndDate(report))}</TableCell>
//                       <TableCell>{getAmount(report).toFixed(2)} Rs</TableCell>
//                       <TableCell>{getDetails(report)}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           onClick={() => handleDelete(report._id, report.reportType)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No {type} reports found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       ))}

//       {reports.length > 0 && (
//         <>
//           <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "30px 0" }}>
//             <Button variant="contained" color="primary" onClick={exportToCSV}>
//               Export as CSV
//             </Button>
//             <Button variant="contained" color="secondary" onClick={exportToPDF}>
//               Export as PDF
//             </Button>
//           </div>

//           <Typography variant="h5" align="center" gutterBottom>
//             Combined Reports Overview
//           </Typography>

//           <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
//             <div style={{ width: "45%" }}>
//               <Bar data={combinedChartData} />
//             </div>
//             <div style={{ width: "30%" }}>
//               <Pie data={combinedChartData} />
//             </div>
//             <div style={{ width: "45%" }}>
//               <Line data={combinedChartData} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


export const ReportDashboard = () => {
  const [reports, setReports] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/reports/user/${userId}`);
      setReports(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleDelete = async (id, reportType) => {
    try {
      const endpointMap = {
        "Income": "incomes",
        "Expense": "expenses",
        "Budget": "budgets",
        "Financial Goal": "financialgoals",
        "Transaction Summary": "transactions"
      };

      const endpoint = endpointMap[reportType] || "reports";
      await axios.delete(`http://localhost:3000/${endpoint}/${id}`);
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const reportTypes = ["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"];
  const filteredReports = (type) => reports.filter((report) => report.reportType === type);

  const getAmount = (report) => {
    if (report.totalAmount !== undefined) {
      return report.totalAmount;
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      console.log(e);
      return "Invalid Date";
    }
  };

  const getStartDate = (report) => {
    return report.startDate || report.date || report.createdAt || "N/A";
  };

  const getEndDate = (report) => {
    return report.endDate || report.date || report.createdAt || "N/A";
  };

  const getDetails = (report) => {
    return report.details || report.description || report.name || report.category || "-";
  };

  const combinedChartData = {
    labels: reportTypes,
    datasets: [
      {
        label: "Total Amount",
        data: reportTypes.map((type) => {
          const total = filteredReports(type).reduce((sum, report) => sum + getAmount(report), 0);
          return total;
        }),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ["Report Type", "Start Date", "End Date", "Amount", "Details"];
    const rows = reports.map((report) => [
      report.reportType,
      formatDate(getStartDate(report)),
      formatDate(getEndDate(report)),
      getAmount(report).toFixed(2),
      getDetails(report),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reports Dashboard", 14, 22);

    const tableColumn = ["Report Type", "Start Date", "End Date", "Amount", "Details"];
    const tableRows = reports.map((report) => [
      report.reportType,
      formatDate(getStartDate(report)),
      formatDate(getEndDate(report)),
      getAmount(report).toFixed(2),
      getDetails(report),
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("reports.pdf");
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Reports Dashboard
      </Typography>

      {reportTypes.map((type) => (
        <div key={type} style={{ marginTop: "30px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            {type} Reports
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports(type).length > 0 ? (
                  filteredReports(type).map((report) => (
                    <TableRow key={report._id}>
                      <TableCell>{formatDate(getStartDate(report))}</TableCell>
                      <TableCell>{formatDate(getEndDate(report))}</TableCell>
                      <TableCell>{getAmount(report).toFixed(2)} Rs</TableCell>
                      <TableCell>{getDetails(report)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(report._id, report.reportType)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No {type} reports found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}

      {reports.length > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "30px 0" }}>
            <Button variant="contained" color="primary" onClick={exportToCSV}>
              Export as CSV
            </Button>
            <Button variant="contained" color="secondary" onClick={exportToPDF}>
              Export as PDF
            </Button>
          </div>

          <Typography variant="h5" align="center" gutterBottom>
            Combined Reports Overview
          </Typography>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ width: "45%" }}>
              <Bar data={combinedChartData} />
            </div>
            <div style={{ width: "30%" }}>
              <Pie data={combinedChartData} />
            </div>
            <div style={{ width: "45%" }}>
              <Line data={combinedChartData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};