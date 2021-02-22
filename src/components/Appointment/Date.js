import axios from 'axios'
import React, { useState } from 'react'

const currentDate = (i)=>{
    
    const date = new Date().getDate()+i;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const f_date = {
        date,
        currentMonth,
        currentYear
    }
    return f_date  
}
const currentOnlyDate = (i)=>new Date().getDate()+i;
const currentFinalDate = (i) => {
    const f_date = currentDate(i)
    const  final_date = `${f_date.date}-${f_date.currentMonth}-${f_date.currentYear}`
    return final_date
};

const getMonth = (month)=>{
    switch (month) {
        case 1:
        return "Jan"
         break;
        case 2:
        return "Feb"
        break;
        case 3:
        return "Mar"
        break;
        case 4:
        return "Apr"
        break;
        case 5:
        return "May"
        break;
        case 6:
        return "Jun"
        break;
        case 7:
        return "Jul"
        break;
        case 8:
        return "Aug"
        break;
        case 9:
        return "Sep"
        break;
        case 10:
        return "Oct"
        break;
        case 11:
        return "Nov"
        break;
        case 12:
        return "Dec"
        break;                    
        default:
        break;
        }
    }

    const currentMonth = getMonth( new Date().getUTCMonth());
    const currentDay =  new Date().getDay();
    function DateIndi(expertId) {
        const [dates,setDates] =useState(null);
        const [date1,setDate1] =useState(false);
        const [date2,setDate2] =useState(false);
        const [date3,setDate3] =useState(false);
        const [date4,setDate4] =useState(false);
        const [date5,setDate5] =useState(false);
        const [date6,setDate6] =useState(false);
        const [date7,setDate7] =useState(false);
                    // const [data,setData] =useState({});
    // const [idColor,setIdColor] =useState("");
    
    console.log(currentOnlyDate);
    console.log(currentMonth);
    console.log("day",currentDay);
    console.log(currentFinalDate(0));
    console.log(expertId.expertId);


    const handleClick = ({value,date,id}) =>{
        switch (value) {
            case 1:
                setDate1(true);
                setDate2(false);
                setDate3(false);
                setDate4(false);
                setDate5(false);
                setDate6(false);
                setDate7(false);                
                break;
            case 2:
                setDate1(false);
                setDate2(true);
                setDate3(false);
                setDate4(false);
                setDate5(false);
                setDate6(false);
                setDate7(false);                
                break;
            case 3:
                setDate1(false);
                setDate2(false);
                setDate3(true);
                setDate4(false);
                setDate5(false);
                setDate6(false);
                setDate7(false);                
                break;
            case 4:
                setDate1(false);
                setDate2(false);
                setDate3(false);
                setDate4(true);
                setDate5(false);
                setDate6(false);
                setDate7(false);                
                break;
            case 5:
                setDate1(false);
                setDate2(false);
                setDate3(false);
                setDate4(false);
                setDate5(true);
                setDate6(false);
                setDate7(false);                
                break;
            case 6:
                setDate1(false);
                setDate2(false);
                setDate3(false);
                setDate4(false);
                setDate5(false);
                setDate6(true);
                setDate7(false);                
                break;
            case 7:
                setDate1(false);
                setDate2(false);
                setDate3(false);
                setDate4(false);
                setDate5(false);
                setDate6(false);
                setDate7(true);                
                break;
        
            default:
                break;
        }
        getData({date,id});

    }





    const getData = ({date,id}) =>{
        // setData({
            
        //     date: date,
        //     expertId: id
        // });
        setDates([]);

        // setIdColor("");
        // const form_data = new FormData();
        // const date = Date();
        const datas = {
            date:date,
            expertId:id
        }
        // const formattedDttm =  format(date, "dd.MM.yyyy H:mm:ss", { timeZone: "Asia/Kolkata" });
        // console.log(formattedDttm);
        console.log("clicked");
        console.log(datas);
        // form_data.set("date","03-01-2021");
        // form_data.set("expertId","1");
        // formData.date = "3-1-2021";
        // formData.expertId = "1";
        // console.log(form_data);
        axios.post("http://107.23.113.233:8080/MentalcareCommunity/slotavailable/slotavailability",datas)
        .then((response)=>{
            console.log(response.data);
            setDates(response.data.data);
            console.log(dates);
            // setIdColor(JSON.stringify(date));
            // console.log(idColor);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="date">
            <div className="date-list">
                <form>
                    <div className="form-login">
                        <label  htmlFor="date0" className ={`${date1?"primary":"secondary"}`}>
                            <span className="week">Mon</span>
                            <span className="day">{currentMonth} {currentOnlyDate(0)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date0"  onClick = {()=>{handleClick({value:1,date : currentFinalDate(0),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date1" className ={`${date2?"primary":"secondary"}`}>
                            <span className="week">Tue</span>
                            <span className="day">{currentMonth} {currentOnlyDate(1)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date1"  onClick = {()=>{handleClick({value:2,date : currentFinalDate(1),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date2" className ={`${date3?"primary":"secondary"}`}>
                            <span className="week">Wed</span>
                            <span className="day">{currentMonth} {currentOnlyDate(2)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date2"  onClick = {()=>{handleClick({value:3,date : currentFinalDate(2),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date3" className ={`${date4?"primary":"secondary"}`}>
                            <span className="week">Thu</span>
                            <span className="day">{currentMonth} {currentOnlyDate(3)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date3"  onClick = {()=>{handleClick({value:4,date :currentFinalDate(3),id:expertId.expertId})}} />
                    </div >
                    <div className="form-login">
                        <label htmlFor="date4" className ={`${date5?"primary":"secondary"}`}>
                            <span className="week">Fri</span>
                            <span className="day">{currentMonth} {currentOnlyDate(4)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date4"  onClick = {()=>{handleClick({value:5,date : currentFinalDate(4),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date5" className ={`${date6?"primary":"secondary"}`}>
                            <span className="week">Sat</span>
                            <span className="day">{currentMonth} {currentOnlyDate(5)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date5"  onClick = {()=>{handleClick({value:6,date : currentFinalDate(5),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date6" className ={`${date7?"primary":"secondary"}`}>
                            <span className="week">Sun</span>
                            <span className="day">{currentMonth} {currentOnlyDate(6)}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date6"  onClick = {()=>{handleClick({value:7,date : currentFinalDate(6),id:expertId.expertId})}} />
                    </div>
                </form>
            </div>
            <div className="time-list">
                <ul>
                    {   (dates === [] || dates === undefined || dates === null)?<li>loading...</li>:
                        (dates === "not done")?<li>Oops no date available</li>:
                        dates.map((date)=>{
                            return (
                                
                                <li key={date.slotId}>{date.startTime}</li>
                                )
                            })
                        }

                </ul>
            </div>
        </div>
    )
}

export default DateIndi
