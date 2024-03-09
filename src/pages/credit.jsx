import React from 'react';
import { Page, Navbar, Block, BlockTitle , Card, CardHeader, CardContent, CardFooter,Link, Button} from 'framework7-react';
import { FaFilePdf } from 'react-icons/fa';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
const Credits = () => {
  return (
    <div>
      <Page>
        <Navbar title="Credits" backLink="Back" />
        <Block style={{ paddingLeft: '30px', paddingRight: '30px' }}>
 
         
          <h2> Development</h2>



        <Card className="demo-card-header-pic">
      <CardHeader
        valign="bottom"
        style={{
            backgroundImage:'url(/images/profile.jpeg)',
            backgroundSize: 'cover',
            height: '200px',
        }}
      >
        <p style={{color:'white'}}>Madhurya Hait</p>
      </CardHeader>
      <CardContent>
        <p className="date">A Web Developer - 21 years.</p>
        <p>
        "When I mad this website I had one thing in mind that is to make a platform which can help students. A guide, a tutor whom you can chat with and get your doubts cleared whenever you want."
        </p>
      </CardContent>

      <CardFooter style={{padding:'20px 40px'}} >
           
            <Link href="/x/" target="_blank">
                <FaSquareXTwitter size={27} />
            </Link>
            <Link href="/github/" target="_blank">
                    <FaGithub size={27} />
            </Link>
            <Link href="/ig/" target="_blank">
                    <FaInstagram size={27} />
            </Link>
            <Link href="/li/" target="_blank">
                    <FaLinkedin size={27} />
            </Link>
      </CardFooter>
    </Card>



          {/* <Card expandable>
            <CardContent padding={false}>
            <div
                style={{
                background: 'url(/images/profile.jpeg) no-repeat center top',
                backgroundSize: 'cover',
                height: '300px',
                }}>

                <CardHeader textColor="white" className="display-block">Madhurya Hait
                <br/>
                <small style={{ opacity: 0.7 }}>Web Developer</small>
                </CardHeader>
                <Link
                cardClose
                color="white"
                className="card-opened-fade-in"
                style={{ position: 'absolute', right: '15px', top: '15px' }}
                iconF7="xmark_circle_fill"
                />
            </div>
            <div className="card-content-padding">
            <p>
                Hi I am Madhurya Hait, A Web Developer of 21 years. I made the website. I'm a Student of sikkim Manipal Institute of Technology.
                </p>
                <p>Follow us:</p>
                <div className='social-links'>
                    <Link href="https://www.instagram.com/madhuryahait/" target="_blank">
                    <FaInstagram size={24} />
                    </Link>
                    <Link href="https://github.com/MADHURYAHAIT" target="_blank">
                    <FaGithub size={24} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/madhurya-hait-b8128017a/" target="_blank">
                    <FaLinkedin size={24} />
                    </Link>
                    </div>
                <p>
                <Button fill round large cardClose>
                    Close
                </Button>
                </p>
            </div>
            </CardContent>
          </Card> */}

         

          <h3>UI/UX Designer</h3>
          Madhurya Hait

          <h3>Backend Developer</h3>
          Madhurya Hait

          <h2>Special Thanks</h2>
          To Google for it's insane Google Gemini model which helped us to create this application flawlesslly.

          <h3>Open Source Contributors</h3>
          We extend our gratitude to the following open-source projects that have contributed to the success of DocuScholar:

          <br/>- Framework7
          <br/>- React
          <br/>- React Icons
          <br/>- Google Gemini 
          <br/>- Font Awesome

          <h3>Icon Credits</h3>
          - File PDF Icon by Font Awesome (https://fontawesome.com/)

          <h3>Image Credits</h3>
          - Background images sourced from Unsplash (https://unsplash.com/)

          <h3>Acknowledgments</h3>
          We would like to express our thanks to everyone who supported us during the development of DocuScholar.

          <h3>Thank you for using DocuScholar!</h3>
        </Block>
      </Page>
    </div>
  );
};

export default Credits;
