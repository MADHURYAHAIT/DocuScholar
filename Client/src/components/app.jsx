import React, { useState, useEffect } from 'react';
import { FaFilePdf } from "react-icons/fa";
import SignUp from './Signup';
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


import routes from '../js/routes';
import store from '../js/store';


const MyApp = () => {
  // Login screen demo data
  const[isAuthenticated,setIsAuthenticated]=useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
  // Framework7 Parameters
  const f7params = {
    name: 'DocTalk', // App name
    id: 'com.doctalk.id',
    theme: 'auto',



      // App store
      store: store,
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
  if (isAuthenticated){
  return (
    <App { ...f7params }>
        


        <Panel left cover dark>
          <View>
            <Page>
              <Navbar title="Left Panel"/>
              <Block>Left panel content goes here</Block>

            <Button fill popupOpen=".demo-popup-push">Edit Profile</Button>
            <List strong inset dividersIos>

          <ListItem
              title="Description"
              link="/form/"
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
     

        {/* Right panel with reveal effect*/}
        <Panel right reveal>
          <View>
            <Page>
              <Navbar title="Right Panel"/>
              <Block>Right panel content goes here</Block>
            
              <a href="/form/">form</a><br/>
         
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
      <App { ...f7params }>
      <>  
        
      <div className='login'>   

        <Page loginScreen>
          <LoginScreenTitle style={{fontSize:'36px', paddingBottom:'15px'}}><FaFilePdf className='ninja'/> DocuScholar</LoginScreenTitle>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
            <List form>
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
                <Button  fill style={{ width:'240px'}}type="submit"><h2>Login</h2></Button>
            </div>
          </form>
        

          <div className='buttonBox'>
            <Button style={{margin:'8px',width:'240px'}} popupOpen=".demo-popup-push"><p style={{fontSize:'16px', fontWeight:'700'}}>Create a New Account</p></Button>
          </div>
        <List>
              <BlockFooter>
              <p style={{}}>Join DocuScholar to chat with Ai to get your desired <br/>answers just at a call. </p>
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
    </>
    </App>
      
    )
  }
}
export default MyApp;