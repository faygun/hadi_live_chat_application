import React,{Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MessageRow from './MessageRow';
import ScrollArea from 'react-scrollbar';

export default class Message extends Component{
    render(){
        return(
            <div className="message">
                <ScrollArea speed={0.8}
                            className="message"
                            contentClassName="content"
                            focusableTabIndex={9}
                            >
                    <ListGroup>
                        {
                            this.props.messages.map(({message_id,message, user_name})=>
                                (<ListGroupItem key={message_id}>
                                    <MessageRow message={message} name={user_name}/>
                                </ListGroupItem>
                                ))
                        }
                    </ListGroup>
                </ScrollArea>
                
            </div>
        )
    }
}