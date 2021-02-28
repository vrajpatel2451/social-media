import React,{useEffect,useState} from 'react'
import './App.css'
import Footer from './components/HomePage/Footer'
import Header from './components/Header'
import Hero from './components/HomePage/Hero'
import JoinCommunity from './components/HomePage/JoinCommunity'
import HomePage from './components/HomePage/HomePage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'
import Services from './components/Services/Services'
import Individual from './components/Individul/Individual'
import Appointment from './components/Appointment/Appointment'
import Verify from './components/Deatils/Verify'
import Success from './components/Deatils/Success'
import Otp from './components/Otp/Otp'
// import Payment from './components/Payment/Payment'
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from './redux/store'
import { loadUser } from './redux/action/authAction'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from './components/Modal'



const alertOptions = {
    timeout: 3000,
    position: 'top center',
  };




function App() {

    useEffect(()=>{
        store.dispatch(loadUser());
    },[])

    const [nulls,setNulls] = useState(false);
    return (
        <>
            <AnimatePresence exitBeforeEnter onExitComplete={() => setNulls(false)}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
            <Header nulls={nulls} setNulls={setNulls}></Header>
            <Modal nulls={nulls} setNulls={setNulls} ></Modal>
            <Switch>

            <Route path = "/" exact component={HomePage} />
            <Route path = "/registration"  component={Registration} />
            <Route path = "/login"  component={Login} />
            <Route path = "/services"  exact component={Services} />
            <Route path = "/services/:id" exact component={Individual} />
            <Route path = "/services/:id/appointment" exact component={Appointment} />
            <Route path = "/verify" exact component={Verify} />
            <Route path = "/success" exact component={Success} />
            <Route path = "/otp-verification" exact component={Otp} />
            {/* <Route path = "/payment" exact component={Payment} /> */}
            {/* <HomePage></HomePage> */}

            </Switch>
            </Router>
            </AlertProvider>
            </AnimatePresence>
        </>
        
    )
}

export default App
