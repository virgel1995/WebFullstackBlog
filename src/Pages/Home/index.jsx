import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Posts } from "../../Components"
import { useSelector } from "react-redux";

export default function Home() {

	const navigate = useNavigate();
	const user = useSelector(state => state.auth.user)
	useEffect(() => {
		if (user === null) {
			navigate("/")
		}
	}, [])

	return (
		<>
			<Posts user={user} />
		</>
	)




}


