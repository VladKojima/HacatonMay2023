
import { useEffect, useState } from 'react'
import avatar from '../imgs/200m.jpg'
import MessageClient from './MessageClient'
import MessageMeneger from './MessageMeneger'
import { getCoockes } from '../utilites/getCoockes'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import axios from 'axios'
import send from '../imgs/Send.png'
const url="192.168.214.232:8080"
export default function ManagerChat({chats, stomp,senderID,chatId}){
  let buf=chats.sort((a,b)=>{if(a.timestamp>b.timestamp){return 1}else{
    if(a.timestamp==b.timestamp) return 0
    else{
        return 1
    }
  }})
    return <div className={("mchat")}>
        <div className="mchat__header">
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <div className='text'>
                <h1>Клиент</h1>

            </div>

        </div>
        { <div className="mchat_body">
            <p className='start'>Начало чата</p>
            {buf.filter((u)=>u.chatId==chatId).map((v)=>{
                    if(v.senderId==getCoockes('userID') )
                    return <MessageClient  text={v.content} time={v.timestamp}/>
                    else
                    return <MessageMeneger  text={v.content} time={v.timestamp}/>
                    
                })}
                
        </div> }
        <div className="mchat__footer">
                <div>
                <textarea type="text"  placeholder="Ваш ответ..."/>
                <img className='button1'src={send} onClick={()=>{
                    
                    
                    if(document.querySelector('textarea').value.length!=0)
                    stomp.send("/app/chat",{Authorization: 'Bearer '+getCoockes('accessToken')},JSON.stringify({senderId: getCoockes('userID'),chatId: chatId, content: document.querySelector('textarea').value}))
                
                }}></img>
                </div>
                <div>
                    <p className='tech'>
                    by ROWI [tech]
                    </p>
                </div>
            </div>
    </div>
}