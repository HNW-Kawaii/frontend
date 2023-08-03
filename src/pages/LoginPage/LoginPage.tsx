// import { useState } from 'react'
import {Link} from 'react-router-dom'
import style from './LoginPage.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAt, faLock} from "@fortawesome/free-solid-svg-icons"

import Team from '../../assets/svgs/team.svg'
import Mobile from '../../assets/svgs/mobile.svg'
import Logo from '../../assets/imgs/logo_green.png'
// import Google from '../../assets/imgs/google.png'


export default function LoginPage() {
  const GOOGLE_CLIENT_ID = '107757984121-ri7lppilck29vrcp828kugnufjf99uls.apps.googleusercontent.com'
  const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/login/callback'

  let BASE_URL = `https://accounts.google.com/o/oauth2/v2/auth`
    BASE_URL += `?client_id=${GOOGLE_CLIENT_ID}`
    BASE_URL += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`
    BASE_URL += `&response_type=token`
    BASE_URL += `&scope=email profile`

  return (
    <div className={style.container}>
      <img className={style.team} src={Team} alt="" />
      <div className={style.contain}>
        <div className={style.form}>
          <div className={style.title}>
            <img className={style.logo} src={Logo} alt="" />
            <div className={style.text}>포용런</div>
          </div>

          <div className={style.input_contain}>
            <FontAwesomeIcon className={style.icon} icon={faAt} />
            <input className={style.input} type="text" placeholder='Email' />
          </div>
          <div className={style.input_contain}>
            <FontAwesomeIcon className={style.icon} icon={faLock} />
            <input className={style.input} type="password" placeholder='Password' />
          </div>

          <a className={style.btn} href={BASE_URL}>로그인</a>
          {/*<a className={style.btn} href={BASE_URL}>*/}
          {/*  <img src={Google} alt="" className={style.google} />*/}
          {/*  <p className={style.p}>Google로 로그인</p>*/}
          {/*</a>*/}

          <Link to={'/signup'} className={style.up}>계정이 없다면?</Link>
        </div>
      </div>
      <img className={style.mobile} src={Mobile} alt="" />
    </div>
  )
}
