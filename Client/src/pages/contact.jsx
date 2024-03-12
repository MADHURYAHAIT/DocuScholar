import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';
import { IoCall } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";

const ReachUs = () => {
  return (
    <div>
      <Page>
        <Navbar title="Reach Us" backLink="Back" />
        <Block style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <h1>
            <IoCall/> Contact 
          </h1>

          <h2>We'd Love to Hear From You!</h2>

          <h3>Customer Support</h3>

          For any questions, feedback, or assistance, our customer support team is ready to help.

         <br/> - <MdOutlineEmail /> Email: haitmadhurya@gmail.com
          <br/>- <IoCall/> Phone: (+91) 993-1111-589

          <h3>Business Inquiries</h3>

          If you have business-related inquiries or partnership opportunities, please contact our business development team.

          <br/>- <MdOutlineEmail/> Email: business@docuscholar.com
          <br/>- <IoCall/> Phone: (987) 654-3210

          <h3>Visit Us</h3>

          Feel free to visit our office during business hours.
           <TiLocation />  <br/>

          Sikkim Manipal Institute of Technology<br/>
          Majitar, Rangpo, East Sikkim<br/>
          Sikkim, 737136<br/>
          India<br/>

          <h3>Connect With Us</h3>

          Stay connected with us on social media for the latest updates and announcements.

         <br/> - <FaSquareXTwitter/> Twitter: @MadhuryaCodes
          <br/> - <FaGithubSquare/> Github: MADHURYAHAIT
          <br/> - <FaLinkedin/> LinkedIn: MadhuryaHait

          <h3>Feedback</h3>

          Your feedback is important to us. Let us know how we can improve and serve you better.

          <br/> - Email: haitmadhurya@gmail.com

          <h3>We Appreciate Your Support!</h3>

          Thank you for choosing DocuScholar. We value your input and look forward to assisting you.

        </Block>
      </Page>
    </div>
  );
};

export default ReachUs;
