/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <p className="copyright text-right">
            © {new Date().getFullYear()}{" "}
            <a href="https://cic.ubc.ca/" target={"_blank"}>UBC CIC</a>
          </p>

          <nav>
            <ul className="footer-menu">

              <li>
                <a target={"_blank"} href="https://github.com/UBC-CIC/UBCO-StudentEngagementApp/blob/frontend/LICENSE.md" >
                  MIT License
                </a>
              </li>
              <li>
                <a target={"_blank"} href="https://github.com/UBC-CIC/UBCO-StudentEngagementApp/blob/frontend/ATTRIBUTIONS.md">
                  Attributions
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
