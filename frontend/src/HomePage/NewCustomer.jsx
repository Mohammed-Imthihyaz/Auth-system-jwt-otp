import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from 'react';
import { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const fieldConfig = [
    { label: "First Name", name: "firstName", defaultValue: "", required: true },
    { label: "Last Name", name: "lastName", defaultValue: "", required: true },
    { label: "Email", name: "email", defaultValue: "", required: false  },
    { label: "Phone", name: "phone", defaultValue: "", required: false, },
    { label: "Address", name: "address", defaultValue: "", required: false },
    { label: "City", name: "city", defaultValue: "", required: false },
    { label: "Country", name: "country", defaultValue: "", required: false },
    { label: "Zip Code", name: "zipCode", defaultValue: "", required: false },
  ];
  
const NewCustomer = () => {
    const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(
    fieldConfig.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = () => {
    let newErrors = {};
    // Check for phone number field
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers.";
    }
    // Check for required fields
    fieldConfig.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        ADD NEW CUSTOMER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "90%",  
                height:"100%",
                maxHeight:"90%"
              },
            },
          }}
      >
        <DialogTitle id="alert-dialog-title">{"ADD NEW CUSTOMER"}</DialogTitle>
        <Divider sx={{ bgcolor: "black.light" }} />
        <DialogContent sx={{ paddingTop:2}}>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
          {fieldConfig.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required={field.required}
              />
            </Grid>
          ))}
        </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewCustomer;