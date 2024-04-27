import React, { useState } from 'react';
import { FaFilePdf } from "react-icons/fa";

import {
  f7,
  Page,
  Button,
  LoginScreen,
  View,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  
} from 'framework7-react';
import axios from 'axios';


const SignUp = () => {

  const [msg,setMsg] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fnm, setFnm] = useState('');
  const [lnm, setLnm] = useState('');

  const alertLoginData = () => {
    f7.dialog.alert('Data Submitted ! Go ahead and login.', () => {
    f7.loginScreen.close();
    });
  };
  const alertLoginData1 = () => {
    f7.dialog.alert('Data Submission Error ! Please try again.', () => {
    f7.loginScreen.close();
    });
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(email, phone, password);
  
  try {
    const response = await axios.post('https://docuscholar.onrender.com/signup', {
      email,
      phone,
      password,
      fnm,
      lnm,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('user',JSON.stringify(data)); 
      setMsg(data.msg); 
      console.log(data);
      alertLoginData();
      setEmail('');
      setPhone('');
      setPassword('');
      setFnm('');
      setLnm('');
    } else {
      const errorData = response.data;
      setMsg(errorData.error);
      alertLoginData1();
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
  }
  
};



  return (
    <>
      <div className='login'>
            <Page loginScreen>
              <LoginScreenTitle style={{fontSize:"35px"}}><FaFilePdf className='ninja'/> DocuScholar</LoginScreenTitle>
             
              <form onSubmit={handleSubmit}>
                <List >
                    <ListInput
                        type="text"
                        name="fnm"
                        placeholder="Enter first name"
                        value={fnm}
                        onInput={(e) => setFnm(e.target.value)}
                    ></ListInput>

                    <ListInput
                        type="text"
                        name="lnm"
                        placeholder="Enter last name"
                        value={lnm}
                        onInput={(e) => setLnm(e.target.value)}
                    ></ListInput>

                    <ListInput
                        type="number"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onInput={(e) => setPhone(e.target.value)}
                    ></ListInput>

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
                    <Button type="submit" fill style={{  width:'240px'}} ><h3>Sign Up</h3></Button>
                </div>

              </form>
 
                <List>
                  <BlockFooter>
                    <p>After you create your account, you can go ahead and Login</p>
                  </BlockFooter>
                </List>
             
            </Page>
        </div>


    </>
  );
};

export default SignUp;
