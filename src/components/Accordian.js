// To make this component more re-usable I would like to make an accordian itemm based on array size and passed in props. Prop names should be Header, Body
// Figure out how to convert the weekly rotator icons to svgs and fill them with a different color
import React from "react"
import './Accordian.scss';
import Accordion from 'react-bootstrap/Accordion';
import WeeklyRotators from "./WeeklyRotators";
const HomeAccordian = () =>{
    return(
      <Accordion alwaysOpen className="p-4">
        <Accordion.Item eventKey="0" className="accordian-item text-white">
          <Accordion.Header>
            <div className="accordian-container">
            <div className="accordian-letters">
                Weekly Rotators
              </div>
              <div className="accordian-icons">
                <img id='raid-icon' src="https://www.bungie.net/common/destiny2_content/icons/6c9052b8fcaea41c2c858c39cf504687.png"/>
                <img id='dungeon-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png"/>
                <img id='exotic-quest-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_fbba06b79fd1752af47e133cce7a3f45.png"/>
                <img id='nightfall-icon' src="https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_a72e5ce5c66e21f34a420271a30d7ec3.png"/>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <WeeklyRotators/>
          </Accordion.Body>
        </Accordion.Item>
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <div className="accordian-container">
            <div className="accordian-letters">
            Lost Sector
            </div>
          </div>
          </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Season Report</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Eververse Items</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    );
}

export default HomeAccordian;