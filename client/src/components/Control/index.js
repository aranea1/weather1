import React, { useState } from 'react';
import { Button } from 'antd';
import { UserInfo } from './UserInfo';
import { AllUsers } from './AllUsers';

const rightTopButton = {
   position: "absolute",
   right: "1.5rem",
   top: "1.5rem"
}

const Control = ({ setShowControl }) => {

   const [selectedUser, setSelectedUser] = useState('');

   if (selectedUser) {
      return (
         <UserInfo
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
         />
      );
   } else {
      return (
         <>
            <AllUsers
               setSelectedUser={setSelectedUser}
            />
            <Button
               style={rightTopButton}
               onClick={() => setShowControl(false)}
            >
               Close control
            </Button>
         </>
      );
   }

};

export default Control;
