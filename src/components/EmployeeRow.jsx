import React, { Component } from "react";
import './EmployeeRow.scss';

export default function EmployeeRow (props) {
        const employee=props.employeeData
        return (
            <div className="employee-row" >
                <img src={employee.profileImageUrl} className="employee-avatar" />
                <span className="employee-name">{employee.firstName+" "+employee.lastName.charAt(0)+"."}</span>
                <span className="employee-hoursSold">{employee.hoursSold} Hours</span>
            </div>
        );
}
