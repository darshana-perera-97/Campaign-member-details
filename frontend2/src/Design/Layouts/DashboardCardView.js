import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "../css/animate.css";
import "../css/fontawesome-free-5.8.2-web/css/all.css";

const DashboardCardView = () => {
  const closeNotification = () => {
    document.querySelector(".notification-section").classList.add("hide");
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img
                  src="images/top-menu/company-logo-white.png"
                  alt="Company Logo"
                />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="top-menu__menu-right">
                  <a href="#">
                    <i className="fa fa-home fa-lg"></i>
                  </a>
                </li>
                <li className="dropdown top-menu__main-menu top-menu__menu-right">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="images/top-menu/menu.png" alt="Menu" />
                  </a>
                  <ul className="dropdown-menu">
                    <div className="dropdown-header">
                      <h5>Modules</h5>
                    </div>
                    <div className="dropdown-body">
                      <li className="main-menu__menu-item">
                        <a href="#" className="main-menu__menu-item-link">
                          <img
                            src="images/top-menu/API-apps-1.0.png"
                            alt="API Apps"
                          />
                          <span className="main-menu__menu-item-name">
                            API Apps
                          </span>
                        </a>
                      </li>
                      <li className="main-menu__menu-item">
                        <a href="#" className="main-menu__menu-item-link">
                          <img
                            src="images/top-menu/reporting-1.0.png"
                            alt="Reporting"
                          />
                          <span className="main-menu__menu-item-name">
                            Reporting
                          </span>
                        </a>
                      </li>
                      <li className="main-menu__menu-item">
                        <a href="#" className="main-menu__menu-item-link">
                          <img
                            src="images/top-menu/tap-admin-1.0.png"
                            alt="Tap Admin"
                          />
                          <span className="main-menu__menu-item-name">
                            Tap Admin
                          </span>
                        </a>
                      </li>
                      <li className="main-menu__menu-item">
                        <a href="#" className="main-menu__menu-item-link">
                          <img
                            src="images/top-menu/user-management-1.0.png"
                            alt="User Management"
                          />
                          <span className="main-menu__menu-item-name">
                            User Management
                          </span>
                        </a>
                      </li>
                    </div>
                  </ul>
                </li>
                <li className="dropdown top-menu__notification top-menu__menu-right">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <div className="dropdown-header">
                      <h5>Notifications</h5>
                    </div>
                    <div className="dropdown-body">
                      <li>
                        <a href="#">Action</a>
                      </li>
                      <li>
                        <a href="#">Another action</a>
                      </li>
                      <li>
                        <a href="#">Something else here</a>
                      </li>
                    </div>
                  </ul>
                </li>
                <li className="dropdown top-menu__account-name top-menu__menu-right">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="images/top-menu/default-profile-icon.png"
                      alt="Profile"
                      className="user-profile-pic"
                    />
                    <span className="user-profile-name">
                      johndoe
                      <span className="caret"></span>
                    </span>
                  </a>
                  <ul className="dropdown-menu top-menu__account-name-dropdown">
                    <div className="dropdown-header">
                      <img
                        src="images/top-menu/default-profile-icon.png"
                        alt="Profile"
                        className="user-profile-pic"
                      />
                      <div className="user-profile-details">
                        <h5>
                          <strong>John Joe</strong>
                        </h5>
                        <p>
                          <i className="fa fa-envelope"></i> johndoe@test123.com
                        </p>
                        <p>
                          <i className="fa fa-mobile fa-lg"></i> 0710000000
                        </p>
                      </div>
                    </div>
                    <div className="dropdown-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <a href="profile-settings.html">
                            <i className="fa fa-cog"></i> Settings
                          </a>
                        </div>
                        <div className="col-sm-6">
                          <a href="login.html">
                            <i className="fa fa-sign-out-alt"></i> Log Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="notification-section success hide">
        <div className="notification-section__header">
          <div
            className="notification-section__close"
            onClick={closeNotification}
          >
            <i className="fa fa-times fa-lg"></i>
          </div>
          <div className="notification-section__header-icon">
            <i className="fa fa-check-circle"></i>
          </div>
        </div>
        <div className="notification-section__body">
          <h6>You have successfully created your account!</h6>
        </div>
      </div>

      <div className="wrapper">
        <div className="dashboard__banner-area">
          <img src="images/company-dashboard-logo.png" alt="Dashboard Logo" />
        </div>
        <div className="common-access-block">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="common-message-area common-message-area__warning input-group">
                  <span className="input-group-addon">
                    <img src="images/exclamation-mark.png" alt="Warning" />
                  </span>
                  <div className="row">
                    <div className="col-sm-9">
                      <h4 className="main-topic">Complete Your Profile</h4>
                      <p className="sub-text">
                        Complete your contact and bank details before submitting
                        the applications
                      </p>
                    </div>
                    <div className="col-sm-3">
                      <a
                        href="sign-up-step-1.html"
                        className="btn primary-btn full-width margin-top-20"
                      >
                        Complete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="dashboard-card-section">
              <li className="dashboard-card-section__item">
                <a href="grid-view.html">
                  <div className="common-modules">
                    <img
                      src="images/top-menu/API-apps-1.0.png"
                      alt="Provisioning"
                    />
                    <div className="common-modules__title">Provisioning</div>
                  </div>
                </a>
              </li>
              <li className="dashboard-card-section__item">
                <a href="#">
                  <div className="common-modules">
                    <img src="images/top-menu/wizard-1.0.png" alt="Soltura" />
                    <div className="common-modules__title">Soltura</div>
                  </div>
                </a>
              </li>
              <li className="dashboard-card-section__item">
                <a href="#">
                  <div className="common-modules">
                    <img src="images/top-menu/app-store-1.0.png" alt="VDO" />
                    <div className="common-modules__title">VDO</div>
                  </div>
                </a>
              </li>
              <li className="dashboard-card-section__item">
                <a href="./reporting/reporting/reporting.html">
                  <div className="common-modules">
                    <img
                      src="images/top-menu/reporting-1.0.png"
                      alt="Reporting"
                    />
                    <div className="common-modules__title">Reporting</div>
                  </div>
                </a>
              </li>
              <li className="dashboard-card-section__item">
                <a href="user-management-list-view.html">
                  <div className="common-modules">
                    <img
                      src="images/top-menu/user-management-1.0.png"
                      alt="User Management"
                    />
                    <div className="common-modules__title">User Management</div>
                  </div>
                </a>
              </li>
              <li className="dashboard-card-section__item">
                <a href="#">
                  <div className="common-modules">
                    <img
                      src="images/top-menu/tap-admin-1.0.png"
                      alt="Tap Admin"
                    />
                    <div className="common-modules__title">Tap Admin</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>
          Copyrights &copy; {new Date().getFullYear()}.{" "}
          <a href="https://www.hsenidmobile.com//">hSenid Mobile Solutions</a>.
          All Rights Reserved.{" "}
          <a href="terms-and-conditions.html">Terms and Conditions.</a>
        </span>
      </footer>
    </>
  );
};

export default DashboardCardView;
