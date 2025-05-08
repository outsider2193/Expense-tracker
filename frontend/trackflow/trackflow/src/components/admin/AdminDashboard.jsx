import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TableSortLabel, Typography, Grid, Card, CardContent,
  AppBar, Toolbar, IconButton, Box, List, ListItem, ListItemText, ListItemIcon, Drawer
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState(null);
  const [goals, setGoals] = useState([]);
  const [orderBy, setOrderBy] = useState("email");
  const [order, setOrder] = useState("asc");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    fetchUsers();
  }, [orderBy, order]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      let sortedData = res.data.data || [];
      sortedData.sort((a, b) => (order === "asc" ? (a[orderBy] > b[orderBy] ? 1 : -1) : (a[orderBy] < b[orderBy] ? 1 : -1)));
      setUsers(sortedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/transactions");
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const sidebarItems = [
    { id: "dashboard", text: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", text: "Users", icon: <PeopleIcon /> },
    { id: "transactions", text: "Transactions", icon: <ReceiptIcon /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <Card elevation={3} style={{ padding: "20px", height: "calc(100vh - 120px)" }}>
            <Typography variant="h6" gutterBottom>User Management</Typography>
            <TableContainer component={Paper} sx={{ height: "calc(100% - 50px)" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "email"}
                        direction={order}
                        onClick={() => handleSort("email")}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        );
      case "transactions":
        return (
          <Card elevation={3} style={{ padding: "20px", height: "calc(100vh - 120px)" }}>
            <Typography variant="h6" gutterBottom>Transaction Details</Typography>
            <TableContainer component={Paper} sx={{ height: "calc(100% - 50px)" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx._id}>
                      <TableCell>{tx?._id}</TableCell>
                      <TableCell>{tx.user?.email || "N/A"}</TableCell>
                      <TableCell>{tx?.type}</TableCell>
                      <TableCell>${tx?.amount}</TableCell>
                      <TableCell>{new Date(tx?.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        );
      default:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card elevation={3} style={{ padding: "20px", height: "100%" }}>
                  <Typography variant="h6" gutterBottom>User Summary</Typography>
                  <Typography variant="h4" style={{ marginTop: "20px" }}>{users.length}</Typography>
                  <Typography variant="body1">Total Users</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={3} style={{ padding: "20px", height: "100%" }}>
                  <Typography variant="h6" gutterBottom>Transaction Summary</Typography>
                  <Typography variant="h4" style={{ marginTop: "20px" }}>{transactions.length}</Typography>
                  <Typography variant="body1">Total Transactions</Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              <Grid item xs={12}>
                <Card elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6" gutterBottom>Recent Users</Typography>
                  <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Email</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Role</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.slice(0, 5).map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                            <TableCell>{user.role}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              <Grid item xs={12}>
                <Card elevation={3} style={{ padding: "20px" }}>
                  <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                  <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.slice(0, 5).map((tx) => (
                          <TableRow key={tx._id}>
                            <TableCell>{tx.user?.email || "N/A"}</TableCell>
                            <TableCell>{tx?.type}</TableCell>
                            <TableCell>${tx?.amount}</TableCell>
                            <TableCell>{new Date(tx?.date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} - Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: 'white',
            borderRight: 'none',
            overflowX:"hidden"
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden', mt: 2 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem 
                button 
                key={item.id} 
                onClick={() => setActiveSection(item.id)}
                sx={{ 
                  backgroundColor: activeSection === item.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  py: 1,
                  my: 0.5,
                  mx: 1,
                  borderRadius: 1
                }}
              >
                <ListItemIcon sx={{ color: activeSection === item.id ? '#4f9ef5' : 'white', minWidth: '40px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: activeSection === item.id ? 'bold' : 'normal',
                      color: activeSection === item.id ? '#4f9ef5' : 'white'
                    } 
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mt: 8,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};