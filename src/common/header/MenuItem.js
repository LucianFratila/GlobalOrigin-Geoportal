import React from 'react';


class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        let block;
        if(this.props.children && this.props.children[0].id){
            block=<li key={this.props.text} className="nav-item dropdown">
                            <a href="#" id="menu_Cartare" className=" nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.props.text}
                            </a>
                            <ul key={this.props.text} className="dropdown-menu" >
                                {this.props.children.map((item, i) => (
                                            <MenuItem key={item.menu} link={item.url} onclick={item.onclick} text={item.menu}  children={item.children} />
                                    )
                                )}
                            </ul>
                    </li>             
        }
        else{
            block= <li  key={this.props.text} className="nav-item">
                        <a className="nav-link"   href={'/#'+this.props.link}>{this.props.text}</a>
                    </li>
        }

        return (
                    <React.Fragment>{block}</React.Fragment>
                )
    }
  }
  
export default MenuItem
