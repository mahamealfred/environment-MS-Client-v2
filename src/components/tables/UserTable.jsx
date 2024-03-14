import  React, { useEffect, useState } from "react";
import AreaTableAction from "./TableAction";
import "./Table.scss";

import Buttons from "../Home/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { fetchAllUsers } from "../../apis/userController";
import Navbar from "../../components/Navbar";



const TABLE_HEADS = [
  "Fist Name",
  "Last Name",
  "Email",
  "Role",
  "Action",
];


const CategoryTable = () => {
  const [categoryData, setCategoryData] = useState([])
  const [name,setName]=useState("")
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState(null)

  const [openSuccess,setOpenSuccess]=useState(false)
  const [vertical,setVertical]=useState("top")
  const [horizontal,setHorizontal]=useState("right")
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseSnack=()=>{
    setSuccessMessage("")
    setOpenSuccess(false)
  }

  const handleClose = () => {
    setName("")
    setOpen(false);
  };

  //add new Category
  const handleNewCategory=async()=>{
if(!name){
  setSuccessMessage("Category Name is Required")
  setOpenSuccess(true)
}else{
  try {

    // const response=await addNewCategory(name)
    // if(response.responseCode===201){
    // //  setOpen(false)
    //   setSuccessMessage(response.responseDescription)
    //   fetchCategory()
    //   setName("")
    //  setOpenSuccess(true)
      
    // }else{
    //   setSuccessMessage(response.responseDescription)
    // }
    
  } catch (error) {
    console.log("error:",error)
    setSuccessMessage(error)
  }
}

  }

  //Fecth Category
  const fetchCategory = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.responseCode === 200) {
        setCategoryData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (categoryData.length < 1) {
      await fetchCategory()
        }
  }, []);
  return (
    <React.Fragment>
    
    <Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={openSuccess}
  autoHideDuration={5000}
  onClose={handleCloseSnack}
  message={successMessage?successMessage:"Please Try Again with corrte data"}
/>
      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="name"
            name="name"
            label="Category Name"
            type="text"
            size="small"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Cancel</Button>
          <Button onClick={handleNewCategory} type="submit">Add</Button>
        </DialogActions>
      </Dialog>
 <div className="metrics">
      <Navbar />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">Users List</h4>
        </div>
        <div className="data-table-info">
        <Buttons onClick={handleClickOpen} blue text="New User"/>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryData?.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.firstName}</td>
                    <td>{dataItem.lastName}</td>
                    <td>{dataItem?.email}</td>
                    <td>{dataItem.role}</td>
                    {/* <td>{dataItem.customer}</td> */}
                    {/* <td>
                      <div className="dt-status">
                        <span
                          className={`dt-status-dot dot-${dataItem.status}`}
                        ></span>
                        <span className="dt-status-text">{dataItem.status}</span>
                      </div>
                    </td> */}
                    {/* <td>${dataItem.amount.toFixed(2)}</td> */}
                    <td className="dt-cell-action">
                      <AreaTableAction  
                      id={dataItem.id} 
                      setOpenSuccess={setOpenSuccess}
                      setSuccessMessage={setSuccessMessage}
                      fetchCategory={fetchCategory}
                       />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
    </React.Fragment>
   

  );
};

export default CategoryTable;