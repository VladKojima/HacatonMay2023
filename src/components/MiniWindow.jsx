
import { useEffect, useState } from 'react'
import avatar from '../imgs/Avatar.png'
import MessageClient from './MessageClient'
import MessageMeneger from './MessageMeneger'
import { getCoockes } from '../utilites/getCoockes'
import send from '../imgs/Send.png'
import axios from 'axios'
const url="192.168.214.70:8080"
export default function MiniWindow({show,online,setBt,messages,stomp,chatId}){
    async function first_get(){
        
        const get="/manager/status?id="+getCoockes('userID')
        return  await axios.get('http://'+url+get)
    }
    const [textarea, setTextarea]=useState('')
    const [userStatus, setUserStatus] = useState(null);
    const [showedCat, setShowedCat] = useState(false);
    const [cat, setCat] = useState([]);
    const [c,sC]=useState(true)
    useEffect(()=>{
        first_get().then(res=>setUserStatus(res.data));
        let res = axios.get("http://"+url+"/categories").then(res=>{setCat(res.data)});
        
    },[])

    async function showCat()
    {
        setShowedCat(!showedCat);
    }

    async function catRed(category)
    {
        let newM = await (await axios.get("http://"+url+"/managers/"+category)).data;
        await axios.post("http://"+url+"/chat/redirect", {old: getCoockes("userID"), current: newM[0].id, chatId: chatId},{headers: {'Authorization': 'Bearer '+getCoockes("accessToken")}});

    }

    return <div className={("miniwindow "+show)}>
        <div className="miniwindow__header">
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <div className='text'>
                <h1>Ваш консультант</h1>
                {online && <p>Online</p>}
            </div>
            <div className='close' onClick={()=>{setBt(false)}}>
                <p>+</p>
            </div>
        </div>
        { <div className="miniwindow__body">
            {messages.sort((a,b)=>{if(a.timestamp>b.timestamp){return 1}else{
    if(a.timestamp==b.timestamp) return 0
    else{
        return 1
    }
  }}).map((v)=>{
                    if(v.senderId==getCoockes('userID'))
                    return <MessageClient  text={v.content} time={v.timestamp} st={v.state} />
                    else
                    return <MessageMeneger  text={v.content} time={v.timestamp} />
                    
                })}
                
        </div> }
        <div className="miniwindow__footer">
            {userStatus && userStatus.role == "manager" && userStatus.category == null && 
            <button onClick={showCat}>Перенаправить</button>}
            {showedCat && cat.map(item=><button onClick={()=>catRed(item.id)}>{item.nameCategory}</button>)}
                <textarea type="text"   />
                <img className='button1' src={send}onClick={()=>{
                    if(document.querySelector('textarea').value.length!=0){
                        stomp.send("/app/chat",{Authorization: 'Bearer '+getCoockes('accessToken')},JSON.stringify({senderId: getCoockes('userID'),chatId: chatId, content: document.querySelector('textarea').value}))
                        document.querySelector('textarea').value=''
                    }
              
                }}/>
            </div>
    </div>
}