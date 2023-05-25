import gal from '../imgs/Rectangle 65.png'
import axios from 'axios'
import thr from '../imgs/Rectangle 65 (1).png'
import ava from '../imgs/Avatar.png'
import { useNavigate } from 'react-router-dom'
export default function UserLine({cat,login,time,text,status,senderID,chatId, setSenderID,setChatId,setChatId2,setOnCts}){
    const nav=useNavigate()
    return <div className="userline" key={chatId} >
        <div className="avatar"><img src={ava} alt="" /></div>
        <div className="login">{login}</div>
        <div className="time">{new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit'}).format(time)}</div>
        <div className="text" >{text}</div>
        <div className='status'>{status=='OFFLINE'?'Пользователь оффлайн':''}</div>
        <div className="check" onClick={()=>{
            setSenderID(senderID)
            setChatId(chatId)
        }}><img src={gal} alt="" /><p>Принять вопрос</p></div>
        {cat==null&&<div className='reg' onClick={()=>{setOnCts(true);setChatId2(chatId)}}><img src={thr} alt="" /><p>Перенаправить <br/> вопрос</p></div>}
    </div>
}