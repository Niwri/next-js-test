function Button({text, link}) {
    return(
      <a className="cursor-pointer text-slate-300  border-red-800 border border-1 bg-slate-900 hover:bg-red-800 p-3 m-3 w-60 rounded-lg transition hover:rounded-xl hover:scale-105 duration-300 hover:text-slate-100 text-center"
      href={link}>
        {text}
      </a>
    )
  }
  
function Header() {
    
    var data = require('../data/info.json');

    return( 
        <div className="relative z-50">
        <header className="bg-slate-800 p-5 mb-10">
            <h1 className="text-xl font-mono text-center">{data.name}'s Personal Website</h1>
        </header>
        </div>
    );
};

export {Header, Button}