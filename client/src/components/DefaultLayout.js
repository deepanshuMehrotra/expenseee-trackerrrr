import React from 'react';
import { Button, Dropdown, Menu, Space } from 'antd';
import "../resources/default-layout.css";
import { useNavigate } from 'react-router-dom';
function DefaultLayout (props) {
 const user = JSON.parse(localStorage.getItem("ExpenseTracker"))
 const navigate=useNavigate();
 const menu = (
  <Menu
    items={[
      {
        label:(
          <li onClick={()=>{
            localStorage.removeItem('ExpenseTracker')
            navigate("/login")
          }}>logout</li>
        )
      }
      ]}
  />
);
    return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>
        <div>
        <Dropdown overlay={menu} placement="bottomLeft">
        <button className='primary'>{user.name}</button>
      </Dropdown>
          
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}
export default DefaultLayout; 