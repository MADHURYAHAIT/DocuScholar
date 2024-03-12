
import React from 'react'
import {Page,Navbar,Block,BlockTitle} from 'framework7-react'
import { FaFilePdf } from "react-icons/fa";

const description = () => {
  return (
    <div> 
        <Page>
        <Navbar title="Description" backLink="Back" />
        <Block style={{paddingLeft:'30px',paddingRight:'30px'}} >

        <div className="grid-container">
            <div className="grid-item"> <h1><FaFilePdf className='ninja'/> DocuScholar</h1> </div>
            <div className="grid-item2">
                 <img
                    src="/images/profile.jpg"  // Replace with the actual path to your image
                    alt="App Credits"
                    style={{ width: '100%', maxWidth: '180px', margin: '20px auto',borderRadius:'50%', }}
                    />
                </div>
        </div>
               

               <div className="grid-item3">
                <h2>Welcome to DocuScholar!</h2>
               
                 <h3> Overview</h3>

                DocuScholar is an innovative and user-friendly application designed to enhance your document collaboration experience. With a focus on simplicity and efficiency, this application allows users to seamlessly communicate and collaborate on PDF documents in real-time.
                </div>
            <h3> Key Features</h3>

            1. <b>Real-time Collaboration:</b>
                - Engage in live discussions and collaborate with your team or clients directly within the PDF document.

                <br/>2. <b>Document Sharing:</b>
                - Easily share PDFs with others, promoting efficient teamwork and eliminating the need for separate communication channels.

                <br/>3. <b>Annotation Tools:</b>
                - Annotate PDFs with comments, highlights, and drawings to convey ideas and feedback visually.

                <br/>4. <b>Version Control:</b>
                - Keep track of document changes with version control features, ensuring everyone is on the same page.

                <br/>5. <b>Secure Communication:</b>
                - Prioritize security with end-to-end encryption, protecting your sensitive information during conversations.

                <br/>6. <b>User-Friendly Interface:</b>
                - Enjoy a clean and intuitive interface that makes collaboration straightforward and enjoyable.

                <br/><h3>How It Works</h3> 

               1. <b>Upload PDF:</b>
                - Begin by uploading your PDF document to the platform.

                <br/>2. <b>Invite Collaborators:</b>
                - Invite team members or clients to join the conversation by sharing a unique link or sending email invitations.

                <br/>3. <b>Real-Time Editing:</b>
                - Collaborate in real-time, discussing and editing the PDF document simultaneously.

                <br/>4. <b>Save and Share:</b>
                - Save the updated document and share it effortlessly with all collaborators.

                <br/><h3>Why Choose PDF Chatting?</h3>

                - <b>Efficiency:</b>
                <br/>- Boost productivity by eliminating the need for external communication tools and keeping all discussions within the application.

                <br/>- <b>Accessibility:</b>
                <br/>- Access your PDF documents and conversations from anywhere, whether you're in the office or on the go.

                <br/>- <b>Feedback Integration:</b>
                <br/>- Seamlessly integrate feedback into the document, reducing the back-and-forth communication often associated with traditional collaboration methods.


            <h3>Get Started Today!</h3>

            Join the growing community of professionals who have embraced a new era of collaborative document editing. Enhance your workflow with PDF Chatting and experience a more streamlined approach to working together.

            <br/>Ready to get started? Sign up now and revolutionize the way you collaborate on PDF documents!
            </Block>
        </Page>
    </div>
  )
}

export default description