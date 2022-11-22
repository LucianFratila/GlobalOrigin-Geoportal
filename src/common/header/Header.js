import logo from './img/zenith_logo.jpg'
import '../../assets/css/flag.min.css' 

function Header({children}) {


    return (
      <header>
        <nav className="navbar navbar-light fixed-top navbar-expand-lg bg-white " >
          <div className="container">
            <a className="navbar-brand" href="#">
                  <img src={logo} className="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse"  id="navbarSupportedContent">
					    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {children}
              </ul>
            </div>
          </div>
        </nav>
      </header>          
    )
  }
  export default Header
