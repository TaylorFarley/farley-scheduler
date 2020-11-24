import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

const Calendar = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [selectedDate, handleDateChange] = useState(
    new Date("2020-01-01T00:00:00.000Z")
  );

  const [service, setService] = useState(
    {service: undefined}
  );

 
  const handleFieldChange = (evt) => {
    setService({
      ...service,
      service: evt.target.value
    })
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, userData);

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  // prettier-ignore
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <DateTimePicker
        variant="inline"
        label="Select Date and Time"
        value={selectedDate}
        onChange={handleDateChange}
      />        
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label=" "
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
       
        format="yyyy/MM/dd HH:mm"
      />
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Service"
            label="Service"
            name="Service"
            autoComplete="Service"           
            onChange={handleFieldChange}
            value={service.email}
          />
          <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={()=>{
                
                let uid = userData.user.id
                console.log(`sending ${selectedDate}`)
                const makeApt = Axios.post("/schedules/book", {
                  selectedDate,
                  uid,
                  service
                }).then((res) => {
                    console.log('coming back now')
                  console.log(res.data);
                });
               }}
             >
             Add Apt
             </Button>
     </MuiPickersUtilsProvider>
           
  );
};

export default Calendar;
