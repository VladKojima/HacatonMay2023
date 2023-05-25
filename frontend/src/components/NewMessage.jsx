
import { useState } from 'react'
import avatar from '../imgs/200m.jpg'
import MessageClient from './MessageClient'
import MessageMeneger from './MessageMeneger'
import axios from 'axios'
import send from '../imgs/Send.png'
import { getCoockes } from '../utilites/getCoockes'
export default function NewMessage({show, setBt, setChatId}){
    async function first_get(){
        const url="192.168.214.70:8080"
        const get="/chat/create/"
        console.log('http://'+url+get+getCoockes('userID'))
        return  await axios.post('http://'+url+get,{firstMessage:document.querySelector('textarea').value,clientId: getCoockes('userID')},{headers:{Authorization: 'Bearer '+getCoockes('accessToken')}}).then(res=>{setChatId(res.data)})
    }
    return <div className={("miniwindow "+show)}>
        <div className="miniwindow__header">
            <div className='text'>
                <h1>Чат с менеджером</h1>
            </div>
            <div className='close' onClick={()=>{setBt(false)}}>
                <p>+</p>
            </div>
        </div>
         <div className="miniwindow__body">
            <p>Хотите задать вопрос?</p>
                
        </div> 
        <div className="miniwindow__footer t">
           
           <div className='message'>
               <textarea type="text" />
               <img className='button1'src={send}onClick={()=>{first_get()}}/>
           </div>
       </div></div>
}