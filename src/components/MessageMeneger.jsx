export default function MessageMeneger({text,time,}){

    return <div className="message_meneger">
        <div className="message">
            <p>{text}</p>
        </div>
        <div className="time"><p>{new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit'}).format(time)}</p></div>
    </div>
    
}