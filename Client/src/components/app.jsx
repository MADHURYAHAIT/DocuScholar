import React, { useState, useEffect } from 'react';
import { FaFilePdf } from "react-icons/fa";
import SignUp from './SignUp';
import { Analytics } from "@vercel/analytics/react"
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  Button,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';


import routes from '../../routes';

import axios from 'axios';

const logout=()=>{
  localStorage.clear();
  window.location.reload();
}

const MyApp = () => {
  // Login screen demo data
  
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));

 console.log(localStorage.getItem('isAuthenticated'));
  useEffect(() => {
  if (localStorage.getItem('isAuthenticated') == true ){
    setIsAuthenticated(true);
  }
}, []);
  

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    
    try {
      const response = await axios.post( 'https://docuscholar.onrender.com/login', {
        email,
        password,

      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const data = response.data;
        if (data.email === email && data.password === password)
        {
          localStorage.setItem('email',data.email);
          localStorage.setItem('phone',data.phone);
          localStorage.setItem('fnm',data.fnm);
          localStorage.setItem('lnm',data.lnm);
          localStorage.setItem('email',data.email);
          localStorage.setItem('created',data.createdAt);
          localStorage.setItem('BotAnswer',"Didn't get that can you repeat it again !")
          setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated',true);
        }

        console.log(data);

      } else {
        const errorData = response.data;
        console.log(errorData.error); 
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };
  
  // Framework7 Parameters
  const f7params = {
    name: 'DocuScholar', // App name
    id: 'com.doctalk.id',
    theme: 'auto',

      // App routes
      routes: routes,
  };
  // const alertLoginData = () => {
  //   f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
  //     f7.loginScreen.close();
  //   });
  // }
  f7ready(() => {


    // Call F7 APIs here
  });
  console.log(isAuthenticated);
  if ( isAuthenticated){
  return (
    <App { ...f7params }>
        


        <Panel left cover >
          <View>
            <Page>
              <Navbar title="Profile"/>
              <Block strong inset>
                <Block className='imgblk'>
                  <img src="/images/me.jpg" className='profimg' width="100"  />
             
                </Block>
                <p>name : {localStorage.getItem('fnm')} {localStorage.getItem('lnm')}</p>
                <p>email : {localStorage.getItem('email')}</p>
                <p>phone : {localStorage.getItem('phone')}</p>

              </Block>

            <Button className='signout'fill  onClick={()=>logout()}><h3>Sign out</h3></Button>
     
            </Page>
          </View>
        </Panel>
     

        {/* Right panel with reveal effect*/}
        <Panel right reveal>
          <View>
            <Page>
              <Navbar title="User Info"/>
              <Block>email:haitmadhurya@gmail.com</Block>
            
          
         
              <List strong inset dividersIos>

                <ListItem
                    title="Description"
                    link="/description/"
                    />
                  <ListItem
                    title="Our Team"
                    link="/team/"
                    />
                  <ListItem
                    title="Contact Us"
                    link="/contact/"
                    />
                  <ListItem
                    title="Terms & Conditions"
                    link="/tnc/"
                    />
                </List>
            </Page>
          </View>
        </Panel>


        {/* Views/Tabs container */}
        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          {/* <Toolbar tabbar  top>
            <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
            <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
            <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
          </Toolbar> */}

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-home" main tab tabActive url="/" />

        
          <View id="view-catalog" name="catalog" tab url="/catalog/" />


          <View id="view-settings" name="message" tab url="/message/" />

        </Views>

      {/* Popup */}
      <Popup push className="demo-popup-push">
        <View>
          <Page>
            <Navbar  transparent>
              <NavRight>

                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
          <Block className='ppup'>


            <List strong inset dividersIos>

                <ListItem
                    title="Description"
                    link="/description/"
                    />
                  <ListItem
                    title="Credits"
                    link="/credit/"
                    />
                  <ListItem
                    title="Contact Us"
                    link="/contact/"
                    />
                  <ListItem
                    title="Terms & Conditions"
                    link="/tnc/"
                    />
                </List>
              </Block>
              <BlockFooter className='popupfooter' >
                <p>made with ♥️ by Madhurya Hait</p>
              </BlockFooter>
          </Page>
         
        </View>
      </Popup>
    </App>
  )}
  else{
    return(
      <>  
      <App { ...f7params }>
      
        
      <div className='login'>   

        <Page loginScreen>
          <LoginScreenTitle style={{fontSize:'36px', paddingBottom:'15px'}}><FaFilePdf className='ninja'/> DocuScholar</LoginScreenTitle>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
            <List>
              <ListInput
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              ></ListInput>

              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <div className='buttonBox' >
                <Button  fill style={{ width:'240px',fontSize:'10px'}}type="submit"><h2>Login</h2></Button>
            </div>
          </form>
        

          <div className='buttonBox'>
            <Button style={{margin:'8px',width:'240px'}} popupOpen=".demo-popup-push"><p style={{fontSize:'16px', fontWeight:'700'}}>Create a New Account</p></Button>
          </div>
        <List>
              <BlockFooter>
              <p>Join DocuScholar to chat with Ai to get your<br/> desired answers just at a call. </p>
              </BlockFooter>
            </List>
   

    <Popup push className="demo-popup-push">
        <View>
          <Page>
            <Navbar  transparent>
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
           
            <SignUp/>
          
          </Page>
        </View>
      </Popup>
      </Page>
      </div>
   
    
    </App>
    <Analytics/>
    </>
      
    )
  }
}
export default MyApp;