import React,{useState} from 'react'
import './Verify.css'
import {Redirect,useHistory} from 'react-router-dom'
import axios from 'axios';

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
  const [values, setValues] = useState(initialValue);
  const [data, setData] = useState({});
  const [finalData, setFinalData] = useState({});
  // const history = useHistory();
  // const SlotId = localStorage.getItem('slotId'); 
  
  async function displayRazorpay(token) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
		if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
			return
		}
    
		await axios.post('http://107.23.113.233:8080/MentalcareCommunity/secure/slotavailable/slotbooking',initialFValues)
    .then((response) =>{
                 console.log("out",response.data.status);
                 if (response.data.status == "invalid slotId") {
                   alert("response.data.status");
                   console.log("in",response.data.status);
                   // break;
                   
                  }
                  else{
                    const data01 = response.data.data;
                    
                    setData(response.data)
                    console.log("error",response.data)
                        
                    const options = {
                      key: __DEV__ ? 'rzp_test_q5qUylJJ84aZld' : 'PRODUCTION_KEY',
                      currency: "INR",
                      amount: "25000",
                      order_id: data01.orderId,
                        name: 'e-Dost',
                        description: 'Pay your amount here.',
                        image: 'https://s3.amazonaws.com/com.jntalks.post.pic/ss.png',
                        handler: function (response) {
                          console.log(response.razorpay_order_id);
                          console.log(response.razorpay_payment_id);
                          console.log(response.razorpay_signature);
                          initialValue.orderId = response.razorpay_order_id;
                          initialValue.paymentId = response.razorpay_payment_id;
                          // setValues({...values,orderId : response.razorpay_order_id,paymentId : response.razorpay_payment_id})
                          axios.post('http://107.23.113.233:8080/MentalcareCommunity/secure/slot/slotbooking',initialValue)
                          .then((resp) =>{
                            // const data = resposnse.data.data;
                                        console.log("order",resp.data.data);
                                        setFinalData(resp.data);
                                        console.log(finalData);
                                        setFormValues({});
                                        localStorage.removeItem('slotId');
                                        localStorage.setItem('success',resp.data.data);
                                        props.history.push({pathname:'/success',state:{success:resp.data.data}});
                                      }).catch((err)=>{
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
        alert("no slot id");
      }
    };

    
    return (
      <div className="verify">
            <div className="details">
                <h1>Verify Appointment Details</h1>
                <div className="details-list">
                    <div className="detail-individual">
                        <h6>Expert</h6>
                        <p>Vraj Patel</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Date</h6>
                        <p>Dec,26</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Time</h6>
                        <p>9:38 am</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Type</h6>
                        <p>video</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Charges</h6>
                        <p>Rs 859</p>
                    </div>
                </div>
            </div>
            <div className="FormForLogin">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="phone" id="phone" value ={formValues.phoneNumber} onChange={(e)=>{setFormValues({...formValues,phoneNumber : e.target.value})}}></input>
                <label htmlFor="phone">Phone no</label>
              
              </div>

              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="email" id="email" value = {formValues.emailId} onChange={(e)=>setFormValues({...formValues,emailId : e.target.value})}></input>
                <label htmlFor="email">Email Id</label>
              
              </div>
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="catagory" id="catagory" value = {formValues.category} onChange={(e)=>setFormValues({...formValues,category : e.target.value})}></input>
                <label htmlFor="catagory">Catagory</label>
              
              </div>
              <button
                className="buttonLogin"
                id="submitButtonLogin"
                type="submit"
              >
                Pay Rs. 859
              </button>
            </form>
            </div>
        </div>
    )
}

export default Verify
