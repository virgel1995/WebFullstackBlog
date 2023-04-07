import { Box, Button } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"



export default function Profile() {
	const navigate = useNavigate()
	const user = useSelector(state => state.auth.user)
	if (user === null) {
		return (
			<>
				<Box textAlign="center" alignItems="center" py={10} px={6}>

					<p>sorry you need to login first</p>
					<Link to={'/login'}>
						<Button>
							Login
						</Button>
					</Link>
				</Box>
			</>
		)
	} else {
		return (
			<>
				{user.name}
			</>
		)
	}


}