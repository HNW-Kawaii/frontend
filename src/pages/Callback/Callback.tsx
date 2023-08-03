import {useEffect} from "react"
import {useLocation} from "react-router-dom"
import axios from "axios"

export default function Callback () {
    const location = useLocation()

    useEffect(() => {
        let url = window.location.href, cnt = 0, tmp
        for (let i = 0; i < url.length; i++) {
            if (url[i] == '#') {
                cnt = 1
                tmp = i
            }
        }
        if (cnt) {
            const _url = [...url]
            _url[tmp] = '?'
            url = _url.join('')
            window.location.href = url
        }

        const accessToken = new URLSearchParams(location.search).get('access_token')

        if(accessToken) {
            sessionStorage.setItem('TOKEN', accessToken)

            axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            }).then(resp => {
                console.log(resp)
                window.location.href = '/'
            }).catch(() => console.log('oAuth token expired'))
        }
    }, [])

    return (
        <>
        </>
    )
}