export default function ChatLine({setChatId, chatId, text}){
    return <div className="chatline" key={chatId} onClick={()=>{setChatId(chatId)}}> 
        <div className="message">
        <p>{text}</p>
    </div>
    </div>
    
}