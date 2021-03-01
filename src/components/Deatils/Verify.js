import React,{useState} from 'react'
import './Verify.css'
import {Redirect,useHistory} from 'react-router-dom'
import axios from 'axios';
import  moment  from "moment";
import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { toast } from "react-toastify";

const loaderCSS = css`
  position:fixed;
  top:50%;
  left:50%;
  width:100px;
  height:100px;
  transform:translate(-50%,-50%);
  overflow:visible;
`
toast.configure();

const initialValues = {
    category:"",
    phoneNumber:"",
    emailId: "",
    
};

const initialFValues = {
    category:"",
    phoneNumber:"",
    emailId: "",
    slotId:""
};
const initialValue = {
    orderId:"",
    paymentId:""
};


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost';

function Verify( props ) {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialValues);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const [finalData, setFinalData] = useState({});
  // const history = useHistory();
  // const SlotId = localStorage.getItem('slotId'); 
  const notify = (msg) => {
    // debugger;
    toast.error(msg, { position: toast.POSITION.TOP_CENTER });
  }
  
  async function displayRazorpay(token) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
		if (!res) {
      notify('Razorpay SDK failed to load. Are you online?')
      setLoad(false);
      // alert("Oops! something went wrong");
			return
		}
    
		await axios.post('http://107.23.113.233:8080/MentalcareCommunity/secure/slotavailable/slotbooking',initialFValues)
    .then((response) =>{
                 console.log("out",response.data.status);
                 if (response.data.status == "invalid slotId") {
                   setLoad(false);
                   notify("invalid slot id");
                   console.log("in",response.data.status);
                   // break;
                   
                  }
                  else{
                    const data01 = response.data.data;
                    
                    setData(response.data)
                    console.log("error",response.data)
                    setLoad(false);
                    const options = {
                      key: __DEV__ ? 'rzp_test_9B8AXwdinhrVTx' : 'PRODUCTION_KEY',
                      currency: "INR",
                      amount: "25000",
                      order_id: data01.orderId,
                        name: 'e-Dost',
                        description: 'Pay your amount here.',
                        image: 'https://s3.amazonaws.com/com.jntalks.post.pic/ss.png',
                        handler: function (response) {
                          setLoad(true);
                          console.log(response.razorpay_order_id);
                          console.log(response.razorpay_payment_id);
                          console.log(response.razorpay_signature);
                          initialValue.orderId = response.razorpay_order_id;
                          initialValue.paymentId = response.razorpay_payment_id;
                          // setValues({...values,orderId : response.razorpay_order_id,paymentId : response.razorpay_payment_id})
                          axios.post('http://107.23.113.233:8080/MentalcareCommunity/secure/slot/slotbooking',initialValue)
                          .then((resp) =>{
                            // const data = resposnse.data.data;
                                        if (resp.data==="Something went wrong. may be paymentId or orderId does not exist") {
                                          setLoad(false);
                                          notify("Oops!something went wrong");
                                        }
                                        else{
                                          setLoad(false);
                                          console.log("order",resp.data);
                                          setFinalData(resp.data);
                                          console.log(finalData);
                                          setFormValues({});
                                          localStorage.removeItem('slotId');
                                          localStorage.setItem('success',resp.data.data);
                                          props.history.push({pathname:'/success',state:{success:resp.data.data}});
                                        }
                                      }).catch((err)=>{
                                        setLoad(false);
                                        notify("something went wrong");
                                        console.log(err);
                                      })
                                      
                                      // alert(response.razorpay_payment_id)
				                  // alert(response.razorpay_order_id)
				                  // alert(response.razorpay_signature)
                        },
			                  // prefill: {
			                  // 	name,
		                  	// 	email: 'sdfdsjfh2@ndsfdf.com',
			                  // 	phone_number: '9899999999'
			                  // }
                      }
                      const paymentObject = new window.Razorpay(options)
                                    paymentObject.open()
                                      }
                                      // console.log(data);
                                    }).catch((err)=>{
                                      console.log(err);
                })

                
		// const options = {
		// 	key: __DEV__ ? 'rzp_test_q5qUylJJ84aZld' : 'PRODUCTION_KEY',
		// 	currency: "INR",
		// 	amount: "25000",
		// 	order_id: data.orderId,
		// 	name: 'e-Dost',
		// 	description: 'Pay your amount here.',
		// 	image: 'https://s3.amazonaws.com/com.jntalks.post.pic/ss.png',
		// 	handler: function (response) {
      //     console.log(response.razorpay_signature);
      //     // Values.orderId = response.razorpay_order_id;
      //     // Values.paymentId = response.razorpay_payment_id;
      //     setValues({...values,orderId : response.razorpay_order_id,paymentId : response.razorpay_payment_id})
      //     axios.post('http://107.23.113.233:8080/MentalcareCommunity/secure/slot/slotbooking',values)
      //            .then((resp) =>{
        //             			// const data = resposnse.data.data;
        //                   console.log(resp);
    //                   setFinalData(resp);
    //                   console.log(finalData);
    //            }).catch((err)=>{
      //              console.log(err);
      //            })
      
      // 		// alert(response.razorpay_payment_id)
      // 		// alert(response.razorpay_order_id)
		// 		// alert(response.razorpay_signature)
		// 	},
		// 	// prefill: {
		// 	// 	name,
		// 	// 	email: 'sdfdsjfh2@ndsfdf.com',
		// 	// 	phone_number: '9899999999'
		// 	// }
		// }
		// const paymentObject = new window.Razorpay(options)
		// paymentObject.open()
	}
  
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    if (localStorage.getItem('slotId') !== null && localStorage.getItem('slotId') !== undefined ) {
      setData({});
      const token = localStorage.getItem('token');
      const SLotId = localStorage.getItem('slotId');
      console.log("inslot", SLotId);
      initialFValues.slotId = SLotId;
      initialFValues.emailId = formValues.emailId;
      initialFValues.phoneNumber = formValues.phoneNumber;
      initialFValues.category = formValues.category;
      console.log(formValues);
              if (token===null || token === undefined) {
                setLoad(false);
                console.log("nothing");
                history.push({pathname: '/login',
                state: { getpath: '/verify' }});
              } else {
                console.log("process");
                // history.push("/success");
                axios.defaults.headers={
                  Authorization:`Bearer ${token}`
                }
                displayRazorpay(token);
              }
            }
            else{
        notify("no slot id");
              setLoad(false)
      }
    };

    
    return (
      <div className="verify">
            <FadeLoader css={loaderCSS} size={50} color='black' loading={load}  />
            <div className="details">
                <h1>Verify Appointment Details</h1>
                <div className="details-list">
                    <div className="detail-individual">
                        <h6>Expert</h6>
                        <p>{localStorage.getItem('name')}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Date</h6>
                        <p>{moment(localStorage.getItem('date'),'dd-mm-yyyy').format('MMM Do')}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Time</h6>
                        <p>{moment(localStorage.getItem('time'),'hh:mm:ss').format('h:mm a')}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Type</h6>
                        <p>video</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Charges</h6>
                        <p>Rs 250</p>
                    </div>
                </div>
            </div>
            <div className="FormForLogins">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              
              <div className="formLogins">
                <label htmlFor="phone">Phone no</label>
                <input className="FieldClassLogins" type="text" name="phone" id="phone" value ={formValues.phoneNumber} onChange={(e)=>{setFormValues({...formValues,phoneNumber : e.target.value})}}></input>
              
              </div>

              <div className="formLogins">
                <label htmlFor="email">Email Id</label>
                <input className="FieldClassLogins" type="text" name="email" id="email" value = {formValues.emailId} onChange={(e)=>setFormValues({...formValues,emailId : e.target.value})}></input>
              
              </div>
              <div className="formLogins">
                <label htmlFor="catagory">Catagory</label>
                <input className="FieldClassLogins" type="text" name="catagory" id="catagory" value = {formValues.category} onChange={(e)=>setFormValues({...formValues,category : e.target.value})}></input>
              
              </div>
              <button
                className="buttonLogin"
                id="submitButtonLogin"
                type="submit"
              >
                Pay Rs. 250
              </button>
            </form>
            </div>
        </div>
    )
}

export default Verify
