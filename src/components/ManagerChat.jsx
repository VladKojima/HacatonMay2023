
import { useEffect, useState } from 'react'
import avatar from '../imgs/Avatar.png'
import MessageClient from './MessageClient'
import MessageMeneger from './MessageMeneger'
import { getCoockes } from '../utilites/getCoockes'
import SockJS from "sockjs-client";
import Stomp from 'stompjs'
import axios from 'axios'
import send from '../imgs/Send.png'
const url="192.168.214.70:8080"
export default function ManagerChat({ctg, chats, stomp,senderID,chatId}){
  let buf=chats.sort((a,b)=>{if(a.timestamp>b.timestamp){return 1}else{
    if(a.timestamp==b.timestamp) return 0
    else{
        return 1
    }
  }})
  async function red(ctg){
    
    const get="/chat/redirect/"
    return  await axios.post('http://'+url+get, { old: getCoockes('userID'), category: ctg, chatId: chatId},{headers:{Authorization: 'Bearer '+getCoockes('accessToken')}})
}
    return <> <div className={("mchat")}>
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
               
            </div>
     
    </div>   <div className='back' onClick={()=>{window.location.reload()}}><p>Список всех чатов</p></div></>
}