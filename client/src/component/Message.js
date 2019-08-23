import React,{Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MessageRow from './MessageRow';

export default class Message extends Component{

    render(){
        return(
            <div className="message">
                <ListGroup>
                    <ListGroupItem>
                        <MessageRow/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <MessageRow/>
                    </ListGroupItem>
                    <ListGroupItem>
                        <MessageRow/>
                    </ListGroupItem>
                    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}