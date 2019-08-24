import React,{Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MessageRow from './MessageRow';

export default class Message extends Component{
    render(){
        return(
            <div className="message">
                <ListGroup>
                    {
                        this.props.messages.map(({message, user_name})=>
                            (<ListGroupItem>
                                <MessageRow message={message} name={user_name}/>
                            </ListGroupItem>
                            ))
                    }
                </ListGroup>
            </div>
        )
    }
}