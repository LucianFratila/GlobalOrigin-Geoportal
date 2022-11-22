import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Translate from '../languages/Translate'
import '../assets/css/flag.min.css' 

class LangMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let flag_class=this.props.lang + " flag";

        return (
                    <NavDropdown title={<i className={flag_class}></i>}>
                        <Nav.Link href="#" onClick={() => this.props.setLang("ro")}><i className="ro flag"></i><Translate>Romanian</Translate></Nav.Link>   
                        <Nav.Link href="#" onClick={() => this.props.setLang("gb")}><i className="gb flag"></i><Translate>English</Translate></Nav.Link>    
                    </NavDropdown>
                )
    }
  }

export default LangMenu
