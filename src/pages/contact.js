import {Header, Button} from '../components/header'
import Image from 'next/image'

function Icon({path, link}) {
    return (<a href={link} target="_blank">
        <Image className="cursor-pointer hover:bg-slate-100 rounded-full hover:-translate-y-1 duration-200" src={path} width='30' height='30'/>
    </a>)
}

function Contact() {
    
    var data = require('../data/info.json');
    return (
    <div>
        <Header/>

        <div className="w-1/2 max-w-2xl m-auto">

            <div className="my-20 relative -left-20">
                <Button text="Back" link="/"/>
            </div>

            {/* Contact info text */}
            <h1 className="font-mono text-start text-2xl mb-5">&gt; Contact Info</h1>
            <p className="indent-10 my-10">Phone Number — {data.phone}</p>

            {/* Social Icons */}
            <div className="flex flex-row space-x-3 ">
                <p className="indent-10">Socials —  </p>
                <Icon path='/linkedin.png' link={data.linkedin}/>
                <Icon path='/github.png' link={data.github}/>
            </div>
            
        </div>
    </div>
    )
}

export default Contact;