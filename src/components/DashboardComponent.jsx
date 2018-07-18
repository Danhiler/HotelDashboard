import React, { Component } from "react";
import './DashboardComponent.scss';

export default function DashboardComponent(props) {
        return (
            <div className="dashboard-component" >
                <span className="component-value" >{props.value}</span>
                <span className="component-description">{props.description}</span>
            </div>
        );

}
