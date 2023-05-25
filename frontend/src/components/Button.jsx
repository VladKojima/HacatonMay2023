export default function Button({setBt}){
    return <div className="buttonn" onClick={()=>{setBt(true)}}>
        <p>Чат</p>
        
    </div>
}