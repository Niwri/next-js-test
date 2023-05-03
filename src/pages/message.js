import {Header, Button} from '../components/header.js';

import { useRef, useState } from 'react';
import axios from "axios"

function SubmissionStatusBox(props) {
    return(
        <div className="w-fit mx-auto bg-slate-900 px-8 py-3 rounded-3xl hover:-translate-y-1 duration-200 mb-10">
            {props.children}
        </div>
    )
}

function Message() {

    const nameInput = useRef();
    const numberInput = useRef();
    const messageInput = useRef();

    const [nameText, setNameText] = useState("");
    const [numberText, setNumberText] = useState("");
    const [messageText, setMessageText] = useState("");

    const [submitStatus, setSubmitStatus] = useState(0);
    const [submitMessage, setSubmitMessage] = useState("");

    var data = require('../data/info.json');

    {/* Submit event. Toggles the submission div on via submitSuccess */}
    const handleSubmit = async (event) => {
        setSubmitStatus(0);

        event.preventDefault();

        setNameText(nameInput.current.value);
        
        setNumberText(numberInput.current.value);
        
        setMessageText(messageInput.current.value);

        try {
            const axios = require('axios')

            const instance = axios.create({
                baseURL: 'https://dry-shelf-88643.herokuapp.com'
            })

            const response = await instance({
                method: 'post',
                url: '/http://cloudsking.com/react_api.php',
                params: {
                    'name': nameInput.current.value,
                    'phone_number': numberInput.current.value,
                    'message': messageInput.current.value
                }});
            
            console.log('Response: ', response.data);
            
            if(response.data.status_code == 400) 
                setSubmitStatus(3);
            else if(response.data.status_code == 200)
                setSubmitStatus(1);
            
            setSubmitMessage(response.data.message);
                

        } catch (err) {
            console.log("Error: ", err);
            setSubmitStatus(2);
        }


    }

    
    {/* Toggles submitSucess div off */}
    const resetSubmit = () => {
        setSubmitStatus(0);
    }


    const SubmissionStatus = (status) => {
        switch(status) {
        /* Default */
        case 0: 
            return <></>

        /* If submit success, recap information */
        case 1: 
            return (
            <SubmissionStatusBox>
                <p className="text-lg my-5"><span className="text-bold">Submission success!</span></p>
                <div className="w-3/4 text-center mx-auto">
                    <p>{submitMessage}</p>
                </div>
                <div className="mx-auto w-fit">
                    <button className="mt-5 mb-5 text-bold bg-slate-600 hover:bg-slate-800 px-3 py-1 rounded-xl hover:rounded-full duration-300" onClick={resetSubmit}>Close</button>
                </div>
            </SubmissionStatusBox>)

        /* If submission fail due to some response fetch error, show */
        case 2:

            return (
            <SubmissionStatusBox>
                <p className="text-lg my-5"><span className="text-bold">Submission failed!</span> Unable to post data!</p>
                <div className="mx-auto w-fit">
                    <button className="mt-5 mb-5 text-bold bg-slate-600 hover:bg-slate-800 px-3 py-1 rounded-xl hover:rounded-full duration-300" onClick={resetSubmit}>Close</button>
                </div>
            </SubmissionStatusBox>
            )

        /* If API response gives an error, show */
        case 3:
            return (
                <SubmissionStatusBox>
                    <p className="text-lg my-5"><span className="text-bold">Submission failed!</span> {submitMessage}</p>
                    <div className="mx-auto w-fit">
                        <button className="mt-5 mb-5 text-bold bg-slate-600 hover:bg-slate-800 px-3 py-1 rounded-xl hover:rounded-full duration-300" onClick={resetSubmit}>Close</button>
                    </div>
                </SubmissionStatusBox>
            )
        }
    }

    return(
        <div>
            <Header/>

            <div className="w-1/2 max-w-2xl m-auto">
                
                <div className="mt-20 mb-10 relative -left-20">
                    <Button text="Back" link="/"/>
                </div>

                <h1 className="font-mono text-start text-2xl mb-5">&gt; Send a Message</h1>

                {/* The Message Form, using handleSubmit function */}
                <form className="flex flex-col w-3/4 mx-auto space-y-10 p-10 rounded-3xl" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="flex flex-col space-y-3">
                        <label className="my-auto text-bold">—Name—</label>
                        <input id="name" className="rounded-full px-3 py-1 text-black" ref={nameInput} type="text" placeholder="Enter name here..."/>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-3">
                        <label className="my-auto text-bold">—Phone number—</label>
                        <input id="number" className="rounded-full px-3 py-1 text-black" ref={numberInput} type="text" placeholder="Enter number here..."/>
                    </div>

                    {/* Message Content */}
                    <div className="flex flex-col space-y-3">
                        <label className="my-auto text-bold">—Message—</label>
                        <input id="message" className="rounded-full px-3 py-1 text-black" ref={messageInput} type="text" placeholder="Enter message here..."/>
                    </div>

                    {/* Submit Button */}
                    <button className="bg-slate-600 w-fit mx-auto px-3 py-1 rounded-full text-bold text-slate-400 hover:text-slate-300 duration-200 hover:bg-slate-800" type="submit">Submit</button>

                 </form>

                {/* Submit response box */}
                {SubmissionStatus(submitStatus)}

            </div>

        </div>
    )
}

export default Message;