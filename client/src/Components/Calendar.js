import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

const Calendar = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [selectedDate, handleDateChange] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
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
  console.log(userData);

  console.log(selectedDate);

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
   
    const makeApt = Axios.post("http://localhost:4000/schedules/book", {
      selectedDate,
    }).then((res) => {
        console.log('sending')
      console.log(res);
    });
  };

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
          <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={()=>{
               
                console.log(`sending ${selectedDate}`)
                const makeApt = Axios.post("http://localhost:4000/schedules/book", {
                  selectedDate,
                }).then((res) => {
                    console.log('sending')
                  console.log(res);
                });
               }}
             >
             Add Apt
             </Button>
     </MuiPickersUtilsProvider>
           
  );
};

export default Calendar;
