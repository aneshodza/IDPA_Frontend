import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function GameLobby() {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
    }, [])
    return (
        <>
            Game Lobby
        </>
    )
}