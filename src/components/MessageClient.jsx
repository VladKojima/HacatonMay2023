export default function MessageClient({text,time,st}){
    
    return <div className="message_client">
        <div className="time">      <p>{new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit'}).format(time)}</p></div>
  
        <div className="message">
        <p>{text}</p>
    </div>
    </div>
    
}