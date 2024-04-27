import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoMdCloudUpload } from 'react-icons/io';
import { IoIosCloudDone } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import axios from 'axios';
// import CalTile from '../pages/CalorieTile';
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
  Button,
} from 'framework7-react';

const FileUploadComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [MyData, setMyData] = useState([]);
  const [length, setLength] = useState([]);

  const fastApi = useCallback(async (txt) => {
    try {
 
      //console.log(txt);
      const response = await axios.post(`https://fastapi-app-ufg5.onrender.com/compile`, { Pdf_data: txt });
      if (response.status === 200) {
        const responseData = response.data;
        console.log("Index updated successfully!",responseData);
        //console.log(data);
        setIsSubmitted(true);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error('Error updating index:', error.message);
    } finally {

    }
    
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].type !== 'application/pdf') {
      f7.dialog.alert('Please upload a PDF file.');
      return;
    }
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      console.log("Here's your image", formData.get('file'));
      setIsLoading(true);  
      const response = await axios.post('https://docuscholar.onrender.com/pdfToText', formData);
      if (response.status === 200) {
        const data = response.data;
        console.log("Pdf conversion done!");
        localStorage.setItem("PDFData", data);
        fastApi(JSON.stringify(data)); // Convert data to JSON before sending
        setMyData(data);
        setIsSubmitted(true);
        f7.dialog.alert("Submitted Successfully!");
      } else {
        console.log(response.data.error); // Log any error response
      }
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);






  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,accept: 'application/pdf'  });

  return (
    <Popup push className="Upload-popup-push">
       <View>
          <Page>
            <Navbar  transparent>
              <NavRight>

                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
          <Block className='ppup'>

      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <FaFileImage  size={220} style={{paddingTop:'18px'}}/>
            <h2 className='innerbox' style={{fontSize:'28px'}}>Drop PDF File Here</h2>
          </>
        ) : (
          <p>
            {isSubmitted  && !isLoading  ? (
              <div className='ib'>
                <IoIosCloudDone size={220}/>
                <h2 style={{fontSize:'24px'}}>File Analyzed !</h2>
                <p>Drag & drop your PDF files here / click to select files</p>
              </div>
            ) : (
              <div className='ib'>
                <IoMdCloudUpload size={220} />
                <h2 style={{fontSize:'24px'}}>File Uploader</h2>
                <p>Drag & drop your PDF files here / click to select files</p>
              </div>
            )}
          </p>
        )}
      </div>
      
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Analyzing Files...</p>
          <p>
            <span className="progressbar-infinite color-multi"></span>
          </p>
        </div>
      )}

      </Block>
    
       </Page>
    </View>
  </Popup>
  );
};

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUploadComponent;
