import axios from 'axios'
import React, { useState } from 'react'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
// const currentDate = (i)=>{
    
//     const date = new Date().getDate()+i;
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const f_date = {
//         date,
//         currentMonth,
//         currentYear
//     }
//     return f_date  
// }
// const currentOnlyDate = (i)=>new Date().getDate()+i;
// const currentFinalDate = (i) => {
//     const f_date = currentDate(i)
//     const  final_date = `${f_date.date}-${f_date.currentMonth}-${f_date.currentYear}`
//     return final_date
// };



    // const currentMonth = getMonth( new Date().getUTCMonth());
    // const currentDay =  new Date().getDay();
    // const currentDay =  moment().add(10,'days').format('DD-MM-YYYY');
    function DateIndi({expertId,expertName}) {
        const HiStory =useHistory();
        const [dates,setDates] =useState(null);
        const [date1,setDate1] =useState(false);
        const [date2,setDate2] =useState(false);
        const [date3,setDate3] =useState(false);
        const [date4,setDate4] =useState(false);
        const [date5,setDate5] =useState(false);
        const [date6,setDate6] =useState(false);
        const [date7,setDate7] =useState(false);
        const [d,setD] =useState("");
        const [t,setT] =useState("");
        const [selectedOption,setSelectedOption] =useState("");
        
        const handleChange = (slotId,startTime) =>{
            setSelectedOption(slotId);
            setT(startTime);
            console.log(selectedOption);

        }
        
        const submitHandle = (e) =>{
            e.preventDefault();
            console.log("final",selectedOption);
            localStorage.setItem('slotId',selectedOption);
            localStorage.setItem('name',expertName);
            localStorage.setItem('date',d);
            localStorage.setItem('time',t);
            HiStory.push('/verify');

        }
                   

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
        setD(date);

        // setIdColor("");
        // const form_data = new FormData();
        // const date = Date();
        const datas = {
            date:date,
            expertId:expertId
        }
        // const formattedDttm =  format(date, "dd.MM.yyyy H:mm:ss", { timeZone: "Asia/Kolkata" });
        // console.log(formattedDttm);
        console.log("clicked");
        console.log(datas);
        console.log("final",d);
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
                            <span className="week">{moment().format('ddd')}</span>
                            <span className="day">{moment().format('MMM Do')}</span>
                            
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date0"  onClick = {()=>{handleClick({value:1,date : moment().format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date1" className ={`${date2?"primary":"secondary"}`}>
                            <span className="week">{moment().add(1,'days').format('ddd')}</span>
                            <span className="day">{moment().add(1,'days').format(' MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date1"  onClick = {()=>{handleClick({value:2,date : moment().add(1,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date2" className ={`${date3?"primary":"secondary"}`}>
                            <span className="week">{moment().add(2,'days').format('ddd')}</span>
                            <span className="day">{moment().add(2,'days').format('MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date2"  onClick = {()=>{handleClick({value:3,date : moment().add(2,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date3" className ={`${date4?"primary":"secondary"}`}>
                            <span className="week">{moment().add(3,'days').format('ddd')}</span>
                            <span className="day">{moment().add(3,'days').format('MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date3"  onClick = {()=>{handleClick({value:4,date :moment().add(3,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div >
                    <div className="form-login">
                        <label htmlFor="date4" className ={`${date5?"primary":"secondary"}`}>
                            <span className="week">{moment().add(4,'days').format('ddd')}</span>
                            <span className="day">{moment().add(4,'days').format('MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date4"  onClick = {()=>{handleClick({value:5,date : moment().add(4,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date5" className ={`${date6?"primary":"secondary"}`}>
                            <span className="week">{moment().add(5,'days').format('ddd')}</span>
                            <span className="day">{moment().add(5,'days').format('MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date5"  onClick = {()=>{handleClick({value:6,date : moment().add(5,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                    <div className="form-login">
                        <label htmlFor="date6" className ={`${date7?"primary":"secondary"}`}>
                            <span className="week">{moment().add(6,'days').format('ddd')}</span>
                            <span className="day">{moment().add(6,'days').format('MMM Do')}</span>
                        </label>
                        <input className="FieldClassLogin1" type = "radio" name = "date" id = "date6"  onClick = {()=>{handleClick({value:7,date : moment().add(6,'days').format('DD-MM-YYYY'),id:expertId.expertId})}} />
                    </div>
                </form>
            </div>
            <div className="time-list">
                <form onSubmit={submitHandle}>
                    {   (dates === [] || dates === undefined || dates === null)?<div className="li">loading...</div>:
                        (dates === "not done")?<div className="li">Oops no date available</div>:
                        dates.map((date)=>{
                            return (
                                <div key={date.slotId} className="li">
                                <label htmlFor={date.slotId} >
                                <input type="radio"  id={date.slotId} value={date.slotId} name="slot"  onChange={()=>{handleChange(date.slotId,date.startTime)}}/>
                                    {moment(date.startTime,'hh:mm:ss').format('h:mm a')}
                                    </label>
                                </div>
                                
                                )
                            })
                        }
                <button type="submit" className="btn-appointment">Book Appointment</button>

                </form>
            </div>
        </div>
    )
}

export default DateIndi
