import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import BookingForm from "./BookingForm";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%",flexGrow: 1 }}>
      <Grid container sx={{}} >
        <Grid item xs={2} sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' , color:'#fffff'}}>
        <img
          src="../../images/logo.jpg"
          style={{ height:50 }}
        />
        </Grid>
        <Grid item xs={10} sx={{  }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ bgcolor: 'rgba(236, 236, 236,0.7)' }}
>
            <Tab label="New Booking" {...a11yProps(0)} />
            <Tab label="Operations" {...a11yProps(1)} />
            <Tab label="Paymet Gateway" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomTabPanel value={value} index={0}>
         <BookingForm/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
