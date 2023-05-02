import {Header, Button} from '../components/header.js';

function Intro() {

    var data = require('../data/info.json');

    return(
        <div>
            <Header/>

            <div className="w-1/2 max-w-2xl m-auto">
                
                <div className="my-20 relative -left-20">
                    <Button text="Back" link="/"/>
                </div>

                <h1 className="font-mono text-start text-2xl mb-5">&gt; Introduction</h1>
                <p className="indent-10">{data.intro}</p>
            </div>
        </div>
    )
}

export default Intro;