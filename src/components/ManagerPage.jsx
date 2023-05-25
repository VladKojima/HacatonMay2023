import avatar from '../imgs/200m.jpg'
import { getCoockes } from '../utilites/getCoockes'
import UserLine from './UserLine'
import axios from 'axios'
import SockJS from "sockjs-client";
import ava from '../imgs/Avatar.png'
import Stomp from 'stompjs'
import { useEffect, useState } from 'react'
import ManagerChat from './ManagerChat';
import Categoties from './Categoties';
export default function ManagerPage(){
    const [chats,setChats]=useState([])
    const [cat,setCat]=useState()
    const [senderID,setSenderID]=useState(null)
    const [chatId,setChatId]=useState()
    const [chatId2,setChatId2]=useState()
    const [stomp,setStomp]=useState()
    const [cts,setCts]=useState([])
    const [onCts,setOnCts]=useState(false)
    const [del,setDel]=useState(null)
    const [sts,setSts]=useState([])
    const [s,sQ]=useState()
    async function first_get(){
        const url="192.168.214.70:8080"
        const get="/manager/status?id="+getCoockes('userID')
        return  await axios.get('http://'+url+get).then(res=>{setCat(res.data.category); get_Cat(cat) })
    }
    async function get_Cat(cat){
        const url="192.168.214.70:8080"
        const get="/managers/"+cat
        return  await axios.get('http://'+url+get).then(res=>{})
    }
    async function get_ctgs(){
        const url="192.168.214.70:8080"
        const get="/categories/"
        return  await axios.get('http://'+url+get).then(res=>{setCts(res.data)})
    }
    useEffect(()=>{

        const onConnected = () => {
            stompClient.subscribe(
                "/user/" + getCoockes('userID') + "/queue/messages", (msg)=>{setChats(c=>[...c,JSON.parse(msg.body)])}
              );
            stompClient.subscribe("/user/"+getCoockes('userID')+"/queue/state",(msg)=>{
                let state = JSON.parse(msg.body);
                setSts(c=>[...c.filter(item=>item.userId != state.userId),state]);
            });
            stompClient.subscribe("/user/"+getCoockes('userID')+"/queue/checked",(msg)=>{
                
            });
          };
          const onError=()=>{
            console.log(1)
          }
        const eSockJS = new SockJS("http://192.168.214.70:8080/ws");
        let stompClient = Stomp.over(eSockJS);
        setStomp(stompClient)
        stompClient.connect({}, onConnected, onError);
       
        get_ctgs()
        first_get()
        
},[])



let chats2=chats.filter((value, index, self) =>
index === self.findIndex((t) => (
  t.chatId === value.chatId 
))&& value.chatId!=del)
if(senderID==null){
    return <div className="managerPage">
    <div className="header">
        <div className="header__text"><p>Список всех чатов</p></div>
        <div className='header__second'>
            <img src={ava} alt="" />
            <div>
                <p>Консультант</p>
            </div>
        </div>
    </div>
    <div className="body">
    {chats&&chats2.map((v,i)=>{return <UserLine key={v.chatId}cat={cat}login={'user'+(v.chatId.substring([v.chatId.length-7]))} time={v.timestamp} status={'of'} text={v.content}  senderID={v.senderId} chatId={v.chatId} setChatId={setChatId} setChatId2={setChatId2}setSenderID={setSenderID} setOnCts={setOnCts}/>})}
    
    </div>
    {onCts==true&&<Categoties cts={cts} chatId={chatId2} setDel={setDel} setOnCts={setOnCts} sQ={sQ}/>}
</div>
}
else{
    return <ManagerChat cts={s} chats={chats} stomp={stomp} setSenderID={setSenderID} chatId={chatId} />
}
    
}