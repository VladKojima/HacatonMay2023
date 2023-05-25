import { useState } from "react"
import { getCoockes } from "../utilites/getCoockes"
import axios from "axios"
export default function Categoties({cts,chatId,setDel, setOnCts}){
    const [ct, setCt]=useState()
    async function red(ctg){
        const url="192.168.214.70:8080"
        const get="/chat/redirect/"
        return  await axios.post('http://'+url+get, { old: getCoockes('userID'), category: ctg, chatId: chatId},{headers:{Authorization: 'Bearer '+getCoockes('accessToken')}}).then(res=>{setDel(chatId);setOnCts(false)})
    }
    return <div className="cts">
        <div className="header"><p>Список чата продуктов</p></div>
        <div className="body">
            {cts.map((v)=>{return <div onClick={()=>{setCt(v.nameCategory);red(v.id)}}>
                <p>{v.nameCategory}</p>
            </div>})}
        </div>
    </div>
}