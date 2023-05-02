import {Header, Button} from '../components/header.js';

import { useRef, useState } from 'react';
import axios from "axios"

function Message() {

    const nameInput = useRef();
    const numberInput = useRef();
    const messageInput = useRef();

    const [nameText, setNameText] = useState("");
    const [numberText, setNumberText] = useState("");
    const [messageText, setMessageText] = useState("");

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitFail, setSubmitFail] = useState(false);

    var data = require('../data/info.json');

    {/* Submit event. Toggles the submission div on via submitSuccess */}
    const handleSubmit = async (event) => {
        setSubmitSuccess(false);

        event.preventDefault();

        const formData = new FormData();

        setNameText(nameInput.current.value);
        formData.append('name', nameInput.current.value);
        
        setNumberText(numberInput.current.value);
        formData.append('number', numberInput.current.value);
        
        setMessageText(messageInput.current.value);
        formData.append('message', messageInput.current.value);

        if(nameInput.current.value.length == 0 || numberInput.current.value.length == 0 || messageInput.current.value.length == 0) {
            setSubmitFail(true);
            return;
        }

        try {
            const response = await axios.post('https://cloudsking.com/react_api.php', formData);

            console.log('Response: ', response.data);

        } catch (err) {
            console.log("Error: ", err);
        }

        setSubmitSuccess(true);

    }

    
    {/* Toggles submitSucess div off */}
    const resetSubmit = () => {
        setSubmitSuccess(false);
        setSubmitFail(false);
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
                {submitSuccess ? 
                    /* If submit success, recap information */
                    <div className="w-fit mx-auto bg-slate-900 px-8 py-3 rounded-3xl hover:-translate-y-1 duration-200">
                        <p className="text-lg my-5"><span className="text-bold">Submission success!</span> Here are the details:</p>
                        <div className="ml-10">
                            <p>Name: {nameText}</p>
                            <p>Number: {numberText}</p>
                            <p>Message: {messageText}</p>
                        </div>
                        <div className="mx-auto w-fit">
                            <button className="mt-5 mb-5 text-bold bg-slate-600 hover:bg-slate-800 px-3 py-1 rounded-xl hover:rounded-full duration-300" onClick={resetSubmit}>Close</button>
                        </div>
                    </div> 
                : 
                submitFail ? 
                    /* If submission fail, show error */
                    <div className="w-fit mx-auto bg-slate-900 px-8 py-3 rounded-3xl hover:-translate-y-1 duration-200">
                        <p className="text-lg my-5"><span className="text-bold">Submission failed!</span> There is an empty input field!</p>
                        <div className="mx-auto w-fit">
                            <button className="mt-5 mb-5 text-bold bg-slate-600 hover:bg-slate-800 px-3 py-1 rounded-xl hover:rounded-full duration-300" onClick={resetSubmit}>Close</button>
                        </div>
                    </div> 
                : 
                <></>}
            </div>

        </div>
    )
}

export default Message;