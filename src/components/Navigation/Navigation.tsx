import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import style from './Navigation.module.css'

import logo from '../../assets/imgs/logo_green.png'

function Navigation () {
  const [scroll, setScroll] = useState(0)
  const [navClass, setNavClass] = useState(false)
  const [user, setUser] = useState({
    name: '', email: '', profile: ''
  })

  const onScroll = () => {
    setScroll(window.scrollY)

    if (scroll >= 100) setNavClass(true)
    else setNavClass(false)
  }

  useEffect(() => {
    const getUser = async () => {
      const accessToken = sessionStorage.getItem('TOKEN')
      axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      }).then(resp => {
        console.log(resp)
        setUser({ name: resp.data.name, email: resp.data.email, profile: resp.data.picture })
      }).catch(() => console.log('oAuth token expired'))
    }

    if (sessionStorage.getItem('TOKEN')) getUser()

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Fragment>
      <div className={navClass ? style.down_nav : style.nav}>
        <Link to={'/'} className={style.logo_contain}>
          <img className={style.logo} src={logo} alt="" />
          <div className={navClass ? style.down_title : style.title}>새로운 시작<br/>포용런</div>
        </Link>

        <div className={style.menu}>
          { !sessionStorage.getItem('TOKEN') ?
            <>
              <Link className={navClass ? style.down_btn : style.btn} to={'/login'}>로그인</Link>
              <Link className={navClass ? style.down_btn : style.btn} to={'/signup'}>회원가입</Link>
            </>
          : <Link className={navClass ? style.down_btn : style.btn} to={'/dashboard'}>
               <img className={style.profile_img} src={user.profile} alt="" />
            </Link>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Navigation
