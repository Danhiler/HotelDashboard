import React, { Component } from "react";
import styles from './App.module.scss';
import DashboardComponent from './DashboardComponent'
import EmployeeContest from "./EmployeeContest";
import * as ClientApi from "../ClientApi";



export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
            hotelData:{availableRooms:0,
                reservedRooms:0,
                checkedIn:0,
                weekAvailabilityPercent:0,
            },
            employees:[]
        }

    }
    render() {
        const {availableRooms,reservedRooms,checkedIn}=this.state.hotelData
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <div className="booking-dashboard">
                        <DashboardComponent description="Rooms available" value={availableRooms} />
                        <DashboardComponent description="Reserved rooms" value={reservedRooms} />
                        <DashboardComponent description="Checked in" value={checkedIn} />
                    </div>
                    <hr className="separation-line"/>
                    <EmployeeContest employees={this.state.employees}/>
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.fetchDataFromServer()
    }
    fetchDataFromServer=()=> {
        Promise.all([ClientApi.fetchDashboardData(),ClientApi.fetchBookingData()]).then((data)=>{
            this.setState({hotelData:data[0].data,employees:this.caculateSales(data[1].data)})
        })
    }

    caculateSales(bookingsData) {
        const employeesHash ={};
        bookingsData.map((bookingData)=>{
            const employee = bookingData.employee;
            if(employee) {
                const bookingDays = this.checkDatesDiffrance(bookingData.checkOutDate, bookingData.checkInDate)

                if (!employeesHash[employee.id]) {//first sale of the employew
                    employee.hoursSold = bookingDays * 24
                    employeesHash[employee.id] = employee
                } else {
                    employeesHash[employee.id].hoursSold += bookingDays * 24
                }
            }
        })
        const employeesArray=[] //converting into an array
        for(const employeeID in employeesHash) employeesArray.push(employeesHash[employeeID]);

        //sorting the array
        return employeesArray.sort((employeeA,employeeB)=>employeeB.hoursSold-employeeA.hoursSold)
            .slice(0,3)
    }

    checkDatesDiffrance(checkOutDate, checkInDate) {
        const checkOutArr=checkOutDate.split("-")
        const checkInArr=checkInDate.split("-")

        return (((checkOutArr[2]-checkInArr[2])*365)+
            ((checkOutArr[1]-checkInArr[1])*30)+
                 (checkOutArr[0]-checkInArr[0]))
    }
}
