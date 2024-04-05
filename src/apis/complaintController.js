import React, { useContext } from "react";
import axios from "axios";

//get all categories
const base_url_get_all_complaints ="http://localhost:8000/api/v1/complaint";
//new category
const base_url_add_new_complaint ="http://localhost:8000/api/v1/complaint";

  const fetchAllComplaints = async () => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
    await axios
      .get(base_url_get_all_complaints , {
        headers: { }
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data.data;
        } else {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode
        }
      })
      .catch((err) => {
       
        if (err.response.status == 400) {
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else if(err.response.status == 401){
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else{
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        } 
      });
  
    return serverResponse;
  };


  //add complaint
  const addNewComplaint= async (formData,selectedAnswers,total) => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
  
    let data =JSON.stringify({
        
      additionalDetails: formData.additionalDetails,
      category: formData.category,
      consent: formData.consent,
      locationName: "ACE3 LTD",
      firstName: formData.contact.name.split(" ")[0],
      lastName: formData.contact.name.split(" ")[1],
      email: formData.contact.email,
      date:formData.date,
      time:formData.time,
      description:formData.description,
      location:formData.location,
      answers:selectedAnswers,
      total:total
      
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_add_new_complaint,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }
    console.log("request data:",data)
    await axios
      .request(config)
      .then((response) => {
        if (response.data.responseCode === 201) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data.data;
        } else {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode
        }
      })
      .catch((err) => {
       
        if (err.response.status == 400) {
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else if(err.response.status == 401){
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else{
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        } 
      });
  
    return serverResponse;
  };
  const getComplaint = async (id) => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };

      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: base_url_add_new_complaint+`/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        }
    }
    await axios
      .request(config)
      .then((response) => {
        if (response.data.responseCode === 200) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data.data;
        } else {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode
        }
      })
      .catch((err) => {
       
        if (err.response.status == 400) {
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else if(err.response.status == 401){
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else{
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        } 
      });
  
    return serverResponse;
  };
  
  export {
    fetchAllComplaints,
    addNewComplaint
  }