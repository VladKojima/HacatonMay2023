import ChatLine from "./ChatLine"
import MessageClient from "./MessageClient"

export default function ChatsList({show, setChatId, chats,setBt}){
    return <div className={("miniwindow "+show)}>
    <div className="chatlist__header">
        <div className='text'>
            <h1>Чаты</h1>
        </div>
        <div className='close' onClick={()=>{setBt(false)}}>
            <p>+</p>
        </div>
    </div>
  
    <div className="miniwindow__body">
        {chats.map((v)=>{
            return <ChatLine key={v.chatId}  setChatId={setChatId} chatId={v.chatId} text={v.content} />
            })}
    </div>

    </div>
}
