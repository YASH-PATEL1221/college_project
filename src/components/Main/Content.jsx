import React from 'react';

import ContentStyle from "../../css/main/content.module.css";
import Table from "react-bootstrap/Table";

import SportAchievement from '../Master/SportAchievement';
import TeacherList from "../Master/TeacherList.jsx";
import NewStudentList from "../Master/NewStudentList.jsx"

import Card from "../card/Cards.js";
import AreaChart from "../charts/Area";
import LineChart from "../charts/Line";


function Content() {
  return (
    <div className={`${ContentStyle.body}`}>
      <div className={`${ContentStyle.box}`}>
        <div className={`${ContentStyle.Section1} ${ContentStyle.Section_margin}`}>
          <Card height="150px" width="24%" className={`${ContentStyle.each_section1_Card}`}>
            <img src="https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/banner/img1.png" alt="" />
            <p>New Student
              <br />  
              <span>800</span>
            </p>
          </Card>
          <Card height="150px" width="24%" className={`${ContentStyle.each_section1_Card}`}>
            <img src="https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/banner/img2.png" alt="" />
            <p>Total courses
              <br />  
              <span>200</span>
            </p>
          </Card>
          <Card height="150px" width="24%" className={`${ContentStyle.each_section1_Card}`}>
            <img src="https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/banner/img3.png" alt="" />
            <p>Total teacher
              <br/>  
              <span>100</span>
            </p>
          </Card>
          <Card height="150px" width="24%" className={`${ContentStyle.each_section1_Card}`}>
          <img src="https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/banner/img4.png" alt="" />
          <p>Fees collection
              <br/>  
              <span>$50,000</span>
            </p>
          </Card>
        </div>

        <div className={`${ContentStyle.Section2} ${ContentStyle.Section_margin}`}>
          <Card height="500px" width="49%" className={`${ContentStyle.each_section2_Card}`}>
              <p>Student Survay</p>
              <AreaChart width="100%" height="420px" series1="new student" series2="old student" />
          </Card>
          <Card width="49%" height="500px" className={`${ContentStyle.each_section2_Card}`}>
            <p>Student performance</p>
            <LineChart width="100%" height="420px" Categories={['jan','feb','mar','apr','may','june','july','aug','sept','oct','nov','dec']} Data={["10%","15%","17%","20%","30%","27%","26%","22%","10%","22%","17%"]}/>
          </Card>
        </div>

        {/* <div className={`${ContentStyle.Section3} ${ContentStyle.Section_margin}`}>
          <Card height="400px" width="49%"/>
          <Card height="400px" width="49%"/>
        </div> */}

        <div className={`${ContentStyle.Section3} ${ContentStyle.Section_margin}`}>
          <Card height="450px" width="70%" className={`${ContentStyle.each_section3_Card}`}>
            <p>Sport Achievements</p>
            <div className={`${ContentStyle.table}`}>
             <Table className={`${ContentStyle.table}`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Assigned Coach</th>
                    <th>Date</th>
                    <th>Sport Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SportAchievement name="gattu" coach={"jenil"} date={"20/12/2022"} sportName="rugby"/>
                  <SportAchievement name="gattu" coach={"jenil"} date={"20/12/2022"} sportName="rugby"/>
                  <SportAchievement name="gattu" coach={"jenil"} date={"20/12/2022"} sportName="rugby"/>
                  <SportAchievement name="gattu" coach={"jenil"} date={"20/12/2022"} sportName="rugby"/>
                  <SportAchievement name="gattu" coach={"jenil"} date={"20/12/2022"} sportName="rugby"/>
                </tbody>
             </Table>
            </div>
          </Card>
          <Card height="450px" width="28%" className={`${ContentStyle.each_section3_Card}`}>
            <p>Teachers List</p>
            <div className={`${ContentStyle.table}`}>
              <Table className={`${ContentStyle.table}`}>
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                      <TeacherList name={"haha"} status={'Available'}/>
                      <TeacherList name={"haha"} status={'Absent'}/>
                      <TeacherList name={"haha"} status={'Available'}/>
                      <TeacherList name={"haha"} status={'Absent'}/>
                      <TeacherList name={"haha"} status={'Absent'}/>
                  </tbody>
              </Table>
            </div>
          </Card>
        </div>

        <div className={`${ContentStyle.Section4} `}>
          <Card height="600px" width="100%" className={`${ContentStyle.each_section4_Card}`}>
            <p>New student list</p>
            <div className={`${ContentStyle.table}`}>
              <Table className={`${ContentStyle.table}`}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Date Of Admition</th>
                      <th>Fees Receipt</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                      <NewStudentList studentname={"jenil"} phone={"8888888888"} address={"surat"} dateofaddmissioin={"20/12/2021"}/>
                  </tbody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Content
