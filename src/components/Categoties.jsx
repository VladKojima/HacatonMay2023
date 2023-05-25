import { useState } from "react"
import { getCoockes } from "../utilites/getCoockes"
import axios from "axios"
export default function Categoties({sQ,cts,chatId,setDel, setOnCts}){
    const [ct, setCt]=useState()
    const url1="192.168.214.70:8080"
    async function red(ctg){
        
        const get="/chat/redirect/"
        return  await axios.post('http://'+url1+get, { old: getCoockes('userID'), category: ctg, chatId: chatId},{headers:{Authorization: 'Bearer '+getCoockes('accessToken')}}).then(res=>{setDel(chatId);setOnCts(false)})
    }
    return <div className="cts">
        <div className="header"><p>Список чата продуктов</p></div>
        <div className="body">
            {cts.map((v)=>{return <div onClick={()=>{setCt(v.nameCategory);red(v.id);sQ(v.id)}}>
                <p>{v.nameCategory}</p>
            </div>})}
        </div>
    </div>
}