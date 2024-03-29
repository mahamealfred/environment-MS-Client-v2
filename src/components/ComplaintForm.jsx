import React, { useEffect, useState } from 'react';
import './Form.scss';
import Navbar from "../components/Home/Navbar";
import { fetchAllCategories } from '../apis/categoriesController';
import { fetchAllQuestions } from '../apis/questionController';
import { addNewComplaint, fetchAllComplaints } from '../apis/complaintController';
import { Snackbar } from '@mui/material';

function App() {
  const [categoryData, setCategoryData] = useState([])
  const [questionData,setQuestionData]=useState([])
  const [complaintData,setComplaintData]=useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState(null)

  const [openSuccess,setOpenSuccess]=useState(false)
  const [vertical,setVertical]=useState("top")
  const [horizontal,setHorizontal]=useState("right")
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: {
      state: '',
      address: '',
      city: '',
     
      country: ''
    },
    description: '',
    category: '',
    additionalDetails: '',
    files: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    consent: false
  });
//add new Complaints

const handleNewCategory=async()=>{
  
    try {
  
      const response=await addNewComplaint(formData,selectedAnswers)
      if(response.responseCode===201){
      //  setOpen(false)
        setSuccessMessage(response.responseDescription)
        setFormData({
          date: '',
          time: '',
          location: {
            state: '',
            address: '',
            city: '',
           
            country: ''
          },
          description: '',
          category: '',
          additionalDetails: '',
          files: [],
          contact: {
            name: '',
            email: '',
            phone: ''
          },
          consent: false
        })
       setOpenSuccess(true)
        
      }else{
        setSuccessMessage(response.responseDescription)
      }
      
    } catch (error) {
      console.log("error:",error)
      setSuccessMessage(error)
    }
  
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleCloseSnack=()=>{
      setSuccessMessage("")
      setOpenSuccess(false)
    }
  
    const handleClose = () => {
    
      setOpen(false);
    };

  //Fecth Category
  const fetchCategory = async () => {
    try {
      const response = await fetchAllCategories();
      if (response.responseCode === 200) {
        setCategoryData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }


  //fecth Questions
  const fetchQuestions = async () => {
    try {
      const response = await fetchAllQuestions();
      if (response.responseCode === 200) {
        setQuestionData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (categoryData.length < 1) {
      await fetchCategory()
        }
    if (questionData.length < 1) {
          await fetchQuestions()
       }
     
  }, []);
  const handleSelectChange = (event, questionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: event.target.value
  });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   console.log("Ch",value)
  // };
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevData => ({
      ...prevData,
      files: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  handleNewCategory()// You can send this data to your backend or perform any other action
  };

  return (
    <React.Fragment>
      <Navbar/>

      <Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={openSuccess}
  autoHideDuration={5000}
  onClose={handleCloseSnack}
  message={successMessage?successMessage:"Please Try Again with corrte data"}
/>
 <div className="form_container">
      <form onSubmit={handleSubmit}>
        <label>Date and Time of Observation:</label>
        <div className="datetime-inputs">
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} />
        </div>

        <label>Location of Observation:</label>
        <input type="text" required  name="location.address" placeholder="Address or Description" value={formData.location.address} onChange={handleInputChange} />
        <input type="text" required  name="location.city" placeholder="City" value={formData.location.city} onChange={handleInputChange} />
        <input type="text" required  name="location.state" placeholder="State/Province" value={formData.location.state} onChange={handleInputChange} />
        <input type="text" required  name="location.country" placeholder="Country" value={formData.location.country} onChange={handleInputChange} />

        <label>Nature of Observation:</label>
        <textarea name="description" required  placeholder="Description of the Issue/Observation" value={formData.description} onChange={handleInputChange} />

        <label>Type of Environmental Issue:</label>
        <select name="category" value={formData.category} onChange={handleInputChange}>
        <option value="">Select Category</option>
        {categoryData?.map((dataItem) => {
          return(
          <option value={dataItem.id}>{dataItem.name}</option>
          )})  
          }
          </select>
          {questionData.map(question => (
        <div key={question.id}>
          <label>{question.name}</label>
          <select
          
            value={selectedAnswers[question.id] || ''}
            onChange={(event) => handleSelectChange(event, question.id)}
          >
            <option value="">Select...</option>
            {question.answers.map(answer => (
              <option  key={answer} value={answer}>{answer}</option>
            ))}
          </select>
        </div>
      ))}

          {/* {questionData.map(question => (
        <div key={question.id}>
          <label>{question.name}</label>
          <select name="severity" required   onChange={handleInputChange}>
            <option value="">Select...</option>
            {question.answers.map(answer => (
              <option key={answer} value={answer}>{answer}</option>
            ))}
          </select>
        </div>
      ))} */}

        <label>Additional Information:</label>
        <textarea required  name="additionalDetails" placeholder="Any Additional Details or Comments" value={formData.additionalDetails} onChange={handleInputChange} />

        <label>Upload Supporting Documents or Images:</label>
        <input type="file" multiple onChange={handleFileUpload} />

        <label>Contact Information (Optional):</label>
        <input type="text" name="contact.name" placeholder="Name" value={formData.contact.name} onChange={handleInputChange} />
        <input type="email" name="contact.email" required placeholder="Email Address" value={formData.contact.email} onChange={handleInputChange} />
        <input type="tel" name="contact.phone" placeholder="Phone Number" value={formData.contact.phone} onChange={handleInputChange} />

        <label>Consent for Follow-Up:</label>
        <label>
          <input type="checkbox"  name="consent" checked={formData.consent} onChange={handleInputChange} />
          Would you like to be contacted for further information or updates regarding this observation?
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
    </React.Fragment>
   
  );
}

export default App;
