import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, 
        ListGroupItem, 
        InputGroup,
        InputGroupAddon,
        Input,
        Button,
 } from 'reactstrap';
import MessageRow from './MessageRow';
import ScrollArea from 'react-scrollbar';
import { getConfig, getUser } from '../helper/jwt';
import io from "socket.io-client";

export default class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            message : ""
        }
    }
    
    scrollToBottom(){
        const node = this['scrollElement'];
        node.scrollArea.scrollBottom();
    }
    

    sendMessage(){
        if(!this.state.message || !this.props.channel_id)return;

        const message = this.state.message;
        const user = getUser();
        var request = {message : message, channel_id : this.props.channel_id, name:user.name, user_id : user.id};
        const socket = io("http://localhost:5000");
        socket.emit("send", request);
        socket.on('scrollBottom', ()=>{
            this.scrollToBottom();
        })
        this.setState({message:''});
    }
    
    render(){
        return(
            <div className="message">
                <ScrollArea speed={0.8}
                            className="message"
                            contentClassName="content"
                            ref={(ref) => this['scrollElement'] = ref}
                            >
                    <ListGroup>
                        {
                            this.props.messages.map(({message_id,message, user_name})=>
                                (<ListGroupItem onClick={()=>{this.scrollToBottom()}} key={message_id}>
                                    <MessageRow message={message} name={user_name}/>
                                </ListGroupItem>
                                ))
                        }
                    </ListGroup>
                </ScrollArea>
                <div className="text-container">
                    <InputGroup>
                        <Input className="text-left" value={this.state.message} onChange={(e)=>{
                            this.setState({message:e.target.value})
                        }} onKeyDown={(e)=>{if(e.key === 'Enter') this.sendMessage();}} placeholder="type message"/>
                        <InputGroupAddon addonType="append">
                            <Button onClick={()=>this.sendMessage()}>Send</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    </div>
            </div>
        )
    }
}