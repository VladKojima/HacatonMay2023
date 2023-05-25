import logo from '../imgs/logo_rowi_основной.svg'
import Stomp from 'stompjs'
import SockJS  from 'sockjs-client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCoockes } from '../utilites/getCoockes'
import Connections from '../Connections'
export default function Login(){
    const url2=Connections.auth
    async function checkperson(){
        const url=Connections.chat;
        const get="/manager/status?id="+getCoockes('userID')
        console.log('http://'+url+get)
        return  await axios.get('http://'+url+get).then(res=>{return res.data.role})
    }
        async function get_token(username,password){
            
    return await axios.post("http://"+url2+"/api/auth/login",{username: username ,password: password}).then((res)=>{console.log(res);return res.data}).catch((err)=>{return err})
    }
    const nav=useNavigate()
    return <div className="d-flex container-fluid flex-column h-100" id="keycloak-app" data-v-app="">
        <div className="kc-content">
            <header className="row text-center rowi-logo">
                <div>
                <   img clas="" src={logo} alt=""/>
                </div>
            </header>
    <div id="kc-content" className="d-flex justify-content-center flex-column h-100" >
        <div className="main-content h-100">
            <div id="kc-form" >
                <div id="kc-form-wrapper">
                    <h4 className="text-center">Войдите <br/> в личный кабинет</h4>
                    <div className="pt-4 mt-2" >
                        <div className="form-group fg login-block pb-2 mb-1">
                            <ul className="multitab">
                                <li className="active">
                                    <div>Логин</div>
                                </li>
                                <li className="">
                                    <div>Телефон</div>
                                </li>
                                </ul>
                                <label htmlFor="username" className="pf-c-form__label pf-c-form__label-text">Логин</label>
                                <input id="username-keycloak" className="field" name="username" type="text" autoFocus="" autoComplete="off" tabIndex="1" placeholder="Введите логин или почту" aria-invalid=""/>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="password">Пароль</label>
                                    <div className="pass-block fg">
                                        <input tabIndex="2" id="password-keycloak" name="password" type="password" className="field input-pass" autoComplete="off" placeholder="Введите пароль" aria-invalid=""/>
                                            <img className="pass-svg" src="/resources/2d1r0/login/rowi/img/Eye-crossed.svg" alt=""/>
                                    </div>
                                    <div className="pt-2 pb-4" >
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div id="kc-form-options">
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className="form-group">
                                    <input tabIndex="4" name="login" className="button main-button" id="keycloak-login" type="button" value="Продолжить" onClick={()=>{
                                        function clean(){
                                            for(let el of document.querySelectorAll('.warning_p')){
                                                el.remove()
                                            }
                                           for (let el of document.querySelectorAll('input')){
                                            el.classList.remove('error')
                                           }
                                        }
                                           function modal(input,text){
                                                let p=document.createElement('p')
                                                p.classList.add('warning_p')
                                                p.style.color='red'
                                                p.append(text)
                                                input.parentNode.append(p)
                                                input.classList.add('error')
                                                
                                           }
                                           function modal2(parent,input,text){
                                            let p=document.createElement('p')
                                            p.classList.add('warning_p')
                                            p.append(text)
                                            for(let el of document.querySelectorAll('.warning_p2')){
                                                el.remove()
                                            }
                                            input.classList.add('error')
                                            p.style.color='red'
                                            parent.append(p)
                                       }
                                           function check_null(fields){
                                            let c=0
                                            let arr=[]
                                            for(let el of fields){
                                                for(let e of el.children){
                                                    if(e.tagName=='INPUT'){
                                                        if(e.value.length==0){
                                                            c++
                                                            arr.push(e)
                                                        }
                                                    }
                                                }

                                            }
                                            if(c==0){
                                                return true}
                                            else{
                                                return arr}
                                           }
                                           const fields=document.querySelectorAll('.fg')
                                           if(check_null(fields)!=true){
                                            clean()
                                            check_null(fields).map((v)=>{
                                                modal(v,'Поле не должно быть пустым')
                                            })
                                           }else{
                                            clean()
                                            
                                                if(document.querySelector('.pass-block').children[0].value.length<8){
                                                    modal2(document.querySelector('.pass-block'),document.querySelector('.pass-block').children[0],'Пароль должен содержать не менее 8 символов')
                                                }
                                                else{
                                                    if(document.querySelector('.pass-block').children[0].value.match(/^[a-zA-Z0-9]+$/)==null){
                                                        modal2(document.querySelector('.pass-block'),document.querySelector('.pass-block').children[0],'Пароль должен содержать только цифры и латинские символы')
                                                    }
                                                    else{
                                                        get_token(document.querySelector('#username-keycloak').value,document.querySelector('.pass-block').children[0].value).then(res=>{
                                                            if(res.name!=undefined){
                                                                modal(document.querySelector('#password-keycloak'),'Неправильный логин или пароль')
                                                            }
                                                            else {
                                                                document.cookie='userID='+res.userId; 
                                                                document.cookie='accessToken='+res.accessToken; 
                                                        
                                                                checkperson().then(res=>{
                                                                    if(res=='manager'){
                                                                        nav('/mean')
                                                                    }
                                                                    else{
                                                                        nav('/chat')
                                                                }
                                                                })
                                                              
                                                                }
                                                            }).catch((err)=>{
                                                                modal(document.querySelector('#password-keycloak'),'Неправильный логин или пароль')})
                                                    }
                                                }
                                            
                                           
                                           }

                                            
                                    }}/>
                                </div>
                    </div>
                </div>
                </div>
                <div className="forgot-pass-block">
                    <button className="standart-link" tabIndex="6"> Забыли пароль? </button></div></div></div></div></div>
                    // }//document.querySelector('#username-keycloak').value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/)==null && document.querySelector('#username-keycloak').value.match(/^USER_[0-9ABSDF]{7}$/)==null
// if(false ){
//     modal2(document.querySelector('.login-block'),document.querySelector('#username-keycloak'),'Некорректный логин')


// }else{
}