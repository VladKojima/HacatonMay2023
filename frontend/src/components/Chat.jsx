import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import ChatsList from "./ChatsList";
import MiniWindow from "./MiniWindow";
import NewMessage from "./NewMessage";
import { getCoockes } from "../utilites/getCoockes";
import axios from "axios";
export default function Chat(){

    const [bt,setBt]=useState(false)
    const [online,setOnline]=useState(true)
    const [userId,setUserId]=useState(getCoockes('userID'))
    const [chat,setChat]=useState([])
    const [chatId,setChatId]=useState()
    let [stomp,setStomp]=useState()
    async function checkperson(){
        const url="192.168.214.232:8080"
        const get="/manager/status?id="+getCoockes('userID')
        console.log('http://'+url+get)
        return  await axios.get('http://'+url+get).then(res=>{console.log(res.data.role)})
    }
    useEffect(()=>{

            const onConnected = () => {
                stompClient.subscribe(
                    "/user/" + userId + "/queue/messages", (msg)=>{setChat(c=>[...c,JSON.parse(msg.body)])}
                    
                  );
                  
              };
              const onError=()=>{
                console.log(1)
              }
            const eSockJS = new SockJS("http://192.168.214.70:8080/ws");
            let stompClient = Stomp.over(eSockJS);
            setStomp(stompClient)
            stompClient.connect({}, onConnected, onError);
            
   },[])
   let chats = chat.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.chatId === value.chatId  
  ))
)
    if(!bt){
        return <><Button setBt={setBt}/></>
    }
    else{
        console.log(chat)
        if(chat.length==0){
            return <NewMessage show={bt?'show':'hide'} setBt={setBt} setChatId={setChatId}/>
        }
        else{
            
            if(chatId!=undefined){
                return <MiniWindow show={bt?'show':'hide'} online={true} setBt={setBt} messages={(chat.map((v)=>{if(v.chatId==chatId)return v}).filter(function( element ) {
                    return element !== undefined;}))} stomp={stomp} chatId={chatId} ></MiniWindow>
            }
            return <><ChatsList show={bt?'show':'hide'} setChatId={setChatId} chats={chats}setBt={setBt}/></>
        }
        
    }
    
}