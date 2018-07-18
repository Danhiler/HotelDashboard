import React, { Component } from "react";
import styles from './EmployeeContest.scss';
import EmployeeRow from "./EmployeeRow";

export default function EmployeeContest(props) {

            return (<div className="employee-contest-div" classname={styles}>
                <span className="component-subtitle">Employee stats </span>
                <div className="employees-container">
                {printEmployees()}
                </div>
                </div>)
    function printEmployees() {
        return props.employees.map((employee,index)=>{
            return <EmployeeRow employeeData={employee} key={index}/>
        })

    }
        }



