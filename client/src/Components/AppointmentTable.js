import React from 'react';

const AppointmentTable = (props) => {
    return (
        <div>
          {props.selectedDate.map((x)=>{
           return (
           <div>
               {x.selectedDate}
            </div>
               )
          })}
            {console.log(props.selectedDate)}
        </div>
    );
};

export default AppointmentTable;