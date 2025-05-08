import { useState } from 'react';
import { UserNavbar } from './UserNavbar';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  
  const [openSections, setOpenSections] = useState({
    income: false,
    budget: false,
    transaction: false,
    expenses: false,
    financial: false,
    reports: false
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  
  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

  // Navigate when clicking on a menu item
  const navigateTo = (path) => {
    navigate(`/user/${path}`);
  };

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-dark shadow ${isSidebarOpen ? "open" : "d-none"}`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            <span className="brand-text fw-light">Expense tracker</span>
          </a>
        </div>

        <div className="sidebar-content">
          <nav className="mt-3">
            <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">

              {/* Income Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('income')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>INCOME</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.income ? 'down' : 'right'}`}></i>
                </div>
                {openSections.income && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/displayincome" ? "active" : ""}`}
                        onClick={() => navigateTo('displayincome')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Income
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/addincome" ? "active" : ""}`}
                        onClick={() => navigateTo('addincome')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Income
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Budget Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('budget')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>BUDGET</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.budget ? 'down' : 'right'}`}></i>
                </div>
                {openSections.budget && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/budgetdashboard" ? "active" : ""}`}
                        onClick={() => navigateTo('budgetdashboard')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Budget
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/addbudget" ? "active" : ""}`}
                        onClick={() => navigateTo('addbudget')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Budget
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transaction Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('transaction')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>TRANSACTION</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.transaction ? 'down' : 'right'}`}></i>
                </div>
                {openSections.transaction && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/transactiondashboard" ? "active" : ""}`}
                        onClick={() => navigateTo('transactiondashboard')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Transactions
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/addtransaction" ? "active" : ""}`}
                        onClick={() => navigateTo('addtransaction')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Transaction
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Expenses Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('expenses')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>EXPENSES</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.expenses ? 'down' : 'right'}`}></i>
                </div>
                {openSections.expenses && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/expensedashboard" ? "active" : ""}`}
                        onClick={() => navigateTo('expensedashboard')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Expenses
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/add-expense" ? "active" : ""}`}
                        onClick={() => navigateTo('add-expense')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Expense
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Financial Goals Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('financial')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>FINANCIAL</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.financial ? 'down' : 'right'}`}></i>
                </div>
                {openSections.financial && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/financialgoaldashboard" ? "active" : ""}`}
                        onClick={() => navigateTo('financialgoaldashboard')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Financial Goals
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/add-financial-goal" ? "active" : ""}`}
                        onClick={() => navigateTo('add-financial-goal')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Goal
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Reports Accordion */}
              <li className="nav-item my-2">
                <div
                  className="d-flex align-items-center px-3 py-2 text-primary fw-bold cursor-pointer"
                  onClick={() => toggleSection('reports')}
                  style={{ cursor: 'pointer' }}
                >
                  <span style={{ width: '100px' }}>REPORTS</span>
                  <i className={`ms-auto fas fa-chevron-${openSections.reports ? 'down' : 'right'}`}></i>
                </div>
                {openSections.reports && (
                  <ul className="nav flex-column ms-3 mt-1">
                    <li className="nav-item">
                      <div
                        className={`nav-link text-light py-1 ${location.pathname === "/user/reportdashboard" ? "active" : ""}`}
                        onClick={() => navigateTo('reportdashboard')}
                        style={{ cursor: 'pointer' }}
                      >
                        View Reports
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* User Dashboard as separate item */}
              <li className="nav-item mt-4">
                <Link to="userdashboard" className="nav-link px-3">
                  <span className="text-primary fw-bold">USER DASHBOARD</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};