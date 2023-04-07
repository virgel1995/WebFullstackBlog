import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Posts } from "../../Components"
import { useSelector } from "react-redux";

export default function Home() {

	const navigate = useNavigate();
	const user = useSelector(state => state.auth.user)
	const isLogedIn = useSelector(state => state.auth.isLogedIn)
	useEffect(() => {
		if (isLogedIn === false) {
			navigate("/login")
		}
	}, [])

	return (
		<>
			<Posts user={user} />
		</>
	)




}


