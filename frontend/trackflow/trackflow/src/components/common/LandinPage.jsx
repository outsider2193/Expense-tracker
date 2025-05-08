import React from "react";

const LandingPage = () => {
  return (
    <div
      className="hold-transition layout-top-nav"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="wrapper">
        {/* Simple Navbar - Full Width */}
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#F5F7FA" }}>
          <div className="container-fluid">
            {/* Brand */}
            <a href="/" className="navbar-brand">
              <span style={{ color: "#6C63FF", fontWeight: "bold" }}>ExpensePal</span>
            </a>

            {/* Collapsible Menu (for responsiveness) */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Links */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav align-items-center gap-2">
                <li className="nav-item">
                  <a href="#features" className="nav-link text-dark">Features</a>
                </li>
                <li className="nav-item">
                  <a href="#users" className="nav-link text-dark">Users</a>
                </li>
                <li className="nav-item">
                  <a href="#testimonials" className="nav-link text-dark">Testimonials</a>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link text-dark">Login</a>
                </li>
                <li className="nav-item">
                  <a href="/signup" className="btn btn-sm px-3" style={{ backgroundColor: "#6C63FF", color: "#fff" }}>Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        {/* Content Wrapper */}
        <div className="content-wrapper" style={{ backgroundColor: "#F5F7FA" }}>
          {/* Hero Section */}
          <div className="content-header py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h1 className="display-4 font-weight-bold text-dark">Smart Money</h1>
                  <h1 className="display-4 font-weight-bold text-dark">Management Made Simple</h1>
                  <p className="lead text-secondary mt-3">
                    Take control of your finances with our all-in-one personal budgeting solution
                  </p>
                  <div className="mt-4">
                    <a href="/signup" className="btn btn-lg btn-outline-dark">
                      Get Started Free
                    </a>
                  </div>
                </div>
                <div className="col-md-6">{/* Empty space for potential image */}</div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="content py-4">
            <div className="container-fluid">
              <div className="row">
                {[
                  { color: "#6C63FF", label: "Happy Users", value: "10,000+" },
                  { color: "#FF6584", label: "Money Saved", value: "$2.5M+" },
                  { color: "#F9A826", label: "Goals Achieved", value: "25,000+" },
                ].map((stat, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card-body d-flex align-items-center">
                      <div
                        className="p-3"
                        style={{ backgroundColor: stat.color, width: "64px", height: "64px", borderRadius: "8px" }}
                      ></div>
                      <div className="ms-4"> {/* Add spacing between color block and text */}
                        <h5 className="mb-0 text-dark">{stat.label}</h5>
                        <h3 className="mb-0 text-dark">{stat.value}</h3>
                      </div>
                    </div>
                  </div>

                ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="content py-5">
          <div className="container-fluid">
            <div className="text-center mb-5">
              <h2 style={{ color: "#6C63FF" }}>Powerful Features</h2>
              <p className="lead text-secondary">
                Everything you need to manage your finances in one place
              </p>
            </div>
            <div className="row">
              {[
                {
                  title: "Expense Tracking",
                  desc: "Automatically categorize and track all your expenses in real-time.",
                  icon: "fas fa-receipt",
                },
                {
                  title: "Smart Budgeting",
                  desc: "Create custom budgets with intelligent recommendations based on your spending patterns.",
                  icon: "fas fa-calculator",
                },
                {
                  title: "Financial Goals",
                  desc: "Set and track progress towards your savings and investment goals.",
                  icon: "fas fa-bullseye",
                },
                {
                  title: "Detailed Analytics",
                  desc: "Visualize your financial data with interactive charts and reports.",
                  icon: "fas fa-chart-pie",
                },
              ].map((feature, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card shadow-sm h-100 border-0">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <i className={`${feature.icon} fa-2x`} style={{ color: "#6C63FF" }}></i>
                      </div>
                      <h5 className="card-title text-center text-dark">{feature.title}</h5>
                      <p className="card-text text-secondary">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Types Section */}
        <section id="users" className="content py-5" style={{ backgroundColor: "#ffffff" }}>
          <div className="container-fluid">
            <div className="text-center mb-5">
              <h2 style={{ color: "#6C63FF" }}>Who Can Benefit</h2>
              <p className="lead text-secondary">ExpensePal is designed for everyone</p>
            </div>
            <div className="row">
              {[
                {
                  title: "Individuals",
                  desc: "Take control of your personal finances, track expenses, and achieve your financial goals.",
                  icon: "fas fa-user",
                },
                {
                  title: "Families",
                  desc: "Manage household budgets together and plan for your family's financial future.",
                  icon: "fas fa-home",
                },
                {
                  title: "Financial Advisors",
                  desc: "Provide better guidance to clients with comprehensive financial insights and reports.",
                  icon: "fas fa-briefcase",
                },
              ].map((user, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <div className="mb-3">
                        <i className={`${user.icon} fa-2x`} style={{ color: "#6C63FF" }}></i>
                      </div>
                      <h5 className="card-title text-dark">{user.title}</h5>
                      <p className="text-secondary">{user.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="content py-5">
          <div className="container-fluid">
            <div className="text-center mb-5">
              <h2 style={{ color: "#6C63FF" }}>What Our Users Say</h2>
              <p className="lead text-secondary">Success stories from people like you</p>
            </div>
            <div className="row">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Small Business Owner",
                  text: "Trackflow helped me separate my business and personal finances. I've saved over $5,000 in the last year alone!",
                },
                {
                  name: "Mark Thompson",
                  role: "Freelance Developer",
                  text: "As someone with irregular income, Trackflow has been a game-changer for planning my finances and saving for taxes.",
                },
                {
                  name: "Jessica Lee",
                  role: "Family Financial Planner",
                  text: "I recommend Trackflow to all my clients. The intuitive interface makes financial planning accessible to everyone.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <p className="card-text text-dark">{testimonial.text}</p>
                      <div className="d-flex align-items-center mt-3">
                        <div className="mr-3">
                          <img src={`/api/placeholder/50/50`} className="rounded-circle" alt="User" />
                        </div>
                        <div>
                          <h6 className="mb-0 text-dark">{testimonial.name}</h6>
                          <small className="text-secondary">{testimonial.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="content-header text-white py-5 text-center" style={{ backgroundColor: "#6C63FF" }}>
          <div className="container-fluid">
            <h2 className="mb-3">Ready to take control of your finances?</h2>
            <p className="lead mb-4">Join thousands of users who have improved their financial health with ExpensePal</p>
            <div>
              <a href="/signup" className="btn btn-lg btn-light">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="main-footer bg-light pt-5 pb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 mb-4">
                <h5 className="text-dark">About ExpensePal</h5>
                <p className="text-muted">
                  ExpensePal is your trusted partner in managing personal and business finances. Budget smarter, save more.
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <h5 className="text-dark">Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#features" className="text-muted">Features</a></li>
                  <li><a href="#users" className="text-muted">Users</a></li>
                  <li><a href="#testimonials" className="text-muted">Testimonials</a></li>
                  <li><a href="/login" className="text-muted">Login</a></li>
                  <li><a href="/signup" className="text-muted">Sign Up</a></li>
                </ul>
              </div>
              <div className="col-md-4 mb-4">
                <h5 className="text-dark">Contact</h5>
                <p className="text-muted">
                  Email: support@expensepal.com<br />
                  Phone: +1 (234) 567-8901
                </p>
                <div className="d-flex gap-2">
                  <a href="#" className="text-dark"><i className="fab fa-facebook fa-lg"></i></a>
                  <a href="#" className="text-dark"><i className="fab fa-twitter fa-lg"></i></a>
                  <a href="#" className="text-dark"><i className="fab fa-instagram fa-lg"></i></a>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <small className="text-muted">&copy; 2025 ExpensePal. All rights reserved.</small>
            </div>
          </div>
        </footer>

      </div >
    </div >
    </div >
  );
};

export default LandingPage;