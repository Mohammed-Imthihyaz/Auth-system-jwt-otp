import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import * as React from "react";
import { useState } from "react";
import NewCustomer from "./NewCustomer";

export default function BookingForm() {
  const [data, seetData] = useState(["Ten", "Twenty", "Thirty"]);
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "red" }}>
        NEW BOOKING
      </Typography>
      <Divider sx={{ bgcolor: "black.light" }} />
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} sx={{ border: 1 }}>
            <FormControl fullWidth>
              <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                required
              >
                Customer
              </InputLabel>
              <NativeSelect>
                {data.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={2} sx={{ border: 1 }}>
            <NewCustomer />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}



