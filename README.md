# DocuScholar

A MERN Stack Chat Web Application which is a chatbot which gives answers to your questions based on
the input pdf provided which also harnesses the Google Gemini LLM & it helps in text summarisation, better understanding research papers etc. 
It uses MERN technologies and along with that uses the brand new Fast Api technology to make use of LangServe.

Here a picture of the interface.

<img width="100%" alt="docuscholar" src="https://github.com/MADHURYAHAIT/DocuScholar/assets/101663118/2b5f14e1-ccb5-4488-9fe1-d23025473fd0">


Move to the client directory & hit the following command 

      npm intall


      npm run dev

    
Then move to Server directory then hit

    npm install

    npm start

Now go to the Model_Server directory and use commands

    pip install -r requirements.txt

    uvicorn app:app --reload

Make sure you configure the api url as per the server api's.
