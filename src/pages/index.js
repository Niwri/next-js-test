import {Header, Button} from '../components/header';

export default function Home() {
    
  var data = require('../data/info.json');

  return (
    <div>
      <Header/>

      <section className="w-full relative mt-20">
          <h2 className="text-slate-300 text-center text-l font-serif">Hello! Welcome to {data.name}'s home, please select your action:</h2>

          {/* Buttons that re-routes to other pages */}
          <div className="font-mono flex flex-col items-center mt-10 ">
            <Button text="My Introduction" link="/intro"/>
            <Button text="My Contact" link="/contact"/>
            <Button text="Send a message!" link="/message"/>
          </div>

        </section>
    </div>
  )
}
