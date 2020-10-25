import React from 'react';
import { Button, Descriptions, Table } from 'antd';
import Column from 'antd/lib/table/Column';

const rightTopButton = {
   position: "absolute",
   right: "1.5rem",
   top: "1.5rem"
}

export const UserInfo = ({ selectedUser, setSelectedUser }) => {

   const { username, id, role, createdAt } = selectedUser;

   return (
      <div
         style={{
            display: "flex",
            padding: "2rem"
         }}
      >
         <div
            style={{ marginRight: "2rem" }}
         >
            <Descriptions
               bordered
               layout="vertical"
            >
               <Descriptions.Item label="Username">{username}</Descriptions.Item>
               <Descriptions.Item label="id">{id}</Descriptions.Item>
               <Descriptions.Item label="role">{role}</Descriptions.Item>
               <Descriptions.Item label="Creation date">{createdAt}</Descriptions.Item>
            </Descriptions>
         </div>
         <div>
            <Table
               dataSource={selectedUser.cities}
               rowKey={record => record.cityId}
            >
               <Column title="Name" dataIndex="name" key="name" />
               <Column title="Country" dataIndex="country" key="Country" />
               <Column title="id" dataIndex="cityId" key="id" />
               <Column title="Request count" dataIndex="searchedTimes" key="searchedTimes" />
            </Table>
         </div>
         <Button
            style={rightTopButton}
            onClick={() => { setSelectedUser('') }}
         >
            Back
            </Button>
      </div>
   );
}
