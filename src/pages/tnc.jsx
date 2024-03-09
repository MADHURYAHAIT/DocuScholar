import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';
import { FaFilePdf } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div>
      <Page>
        <Navbar title="Terms and Conditions" backLink="Back" />
        <Block style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        

       

          <h2>Overview</h2>

          DocuScholar is an innovative and user-friendly application designed for collaborative document editing. Before using our services, please read and agree to the following terms and conditions.

          <h3>Acceptance of Terms</h3>

          By accessing or using DocuScholar, you agree to be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our services.

          <h3>Service Features</h3>

          1. <b>Account Registration:</b>
          - To use certain features of DocuScholar, you may be required to register for an account.

          <br />2. <b>Authorized Use:</b>
          - Users are authorized to use the service for collaborative document editing purposes.

          <br />3. <b>Prohibited Actions:</b>
          - Users are prohibited from engaging in any activities that violate the law or infringe on the rights of others.

          <h3>Privacy and Security</h3>

          Your privacy is important to us. DocuScholar employs security measures to protect your data. Please review our Privacy Policy for more information.

          <h3>Termination of Service</h3>

          DocuScholar reserves the right to terminate or suspend your account if you violate these terms and conditions.

          <h3>Contact Information</h3>

          If you have any questions or concerns regarding these terms, please contact us at haitmadhurya@gmail.com.

          <h3>Changes to Terms</h3>

          DocuScholar may update these terms and conditions from time to time. Please review the terms periodically for any changes.

          <h3>Effective Date</h3>

          These terms and conditions are effective as of 10 March 2024.

          <h3>Thank you for choosing DocuScholar!</h3>
        </Block>
      </Page>
    </div>
  );
};

export default TermsAndConditions;
