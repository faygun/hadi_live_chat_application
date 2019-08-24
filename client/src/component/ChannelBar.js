import React,{Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class ChannelBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            active_id :""
        }
    }
    render(){
        return(
            <div className="channel-bar">
                <p>Channels</p>
                <Nav vertical color="dark" width="25%">
                    {
                        this.props.channels.map(({id,name}) => (  
                            <NavItem>
                                    <NavLink key={id} className={this.state.active_id === id ? "active" : ""} onClick={()=>{this.setState({active_id : id}); this.props.setActiveChannel(id)}} href="#">{name}</NavLink>
                            </NavItem>  
                        ))
                    }
                </Nav>
            </div>
        )
    }
}