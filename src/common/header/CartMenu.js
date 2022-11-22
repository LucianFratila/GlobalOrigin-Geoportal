import React from 'react';
import Translate from '../languages/Translate'
import harti from '../../magazin/harti.json'
import CartTable from '../../magazin/CartTable'

class CartMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let block;
        let cart_cnt=0;
        let cart=this.props.cart;
        let cartHarti=[];
        let pretTotal=0;
        //Object.keys(this.props.cart).length;
        for (var key in cart) {
            cart_cnt+=cart[key];
        }

        for (var i = 0; i < harti.length; i++) {
        
            if (!cart[harti[i]["id"]]) {
              continue;
            }else{
                let mapid=harti[i]["id"];
      
                let hrt={}

                hrt.id=mapid
                hrt.qty=cart[mapid]
                hrt.coperta=harti[i]["coperta"]
                hrt.harta=harti[i]["harta"]
                hrt.pret_ron=harti[i]["pret_ron"]
                hrt.pret_tot=hrt.qty*hrt.pret_ron
                pretTotal+=hrt.pret_tot
                cartHarti.push(hrt)

            }
        
        }

        if(cart_cnt != 0){
            block=<li key="cart_dropdown" className="nav-item dropdown">
                            <a href="#" id="menu_cart" className=" nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-shopping-cart px-2 "></i>
                                <span className="cart_count" >
                                    <strong>{cart_cnt}</strong>											
                                </span>
                                <Translate>Cosul meu</Translate>
                            </a>
                            <ul className="dropdown-menu m-2">
                                <CartTable cart={this.props.cart} add2Cart={this.props.add2Cart} className="cart-dropdown"/>     
                                <a href="/#/neworder" id="" className="btn btn-primary btn-rounded px-4 text-white"  type="button">
                                    <Translate>Finalizeaza comanda</Translate>
                                    <i className="fas fa-angle-right right"></i>
                                </a> 
                            </ul>       
                    </li>           
        }
        else{
            block=<a className="nav-link"><i className="fa fa-shopping-cart px-2"></i><Translate>Cosul meu</Translate></a>
        }    
        return (
                    <React.Fragment>{block}</React.Fragment>
                )
    }
  }

export default CartMenu
