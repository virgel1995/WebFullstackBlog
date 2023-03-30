import * as React from "react"
import {
	Link,
useNavigate
} from "react-router-dom";

import { FiMoon , FiSun, FiMenu, FiShare, FiUserPlus} from "react-icons/fi";

import {
	Box,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorModeValue,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import { Avatar, Logo } from "../"
import { getUserDetails, setLoged, removeToken, getLoged,setAdmin } from "../../Config"

export function IsLogedIn(props) {
		const navigate =useNavigate()
	const Logout = () => {
		setLoged(false)
		removeToken()
		setAdmin(false)
		navigate("/")
window.location.reload() 
	}
return (
	<>
									<MenuList >

			<MenuItem>
					<Link to="/profile" state = {props.user} >
										Profile
								</Link>
									</MenuItem>
									
									<MenuItem>
		<Link to="/profile" >
										Settings
								</Link>
					</MenuItem>
					<MenuItem onClick={Logout}>
					Logout
										
					</MenuItem>
								</MenuList>
	</>
)

}

export function IsLogedOut(props) {
		return (
			<MenuList >
			<MenuItem display= "flex">
				<FiShare px="2" />	
		<Link to="/login" >
									Login
								</Link>
					</MenuItem>
			<MenuItem display="flex">
				<FiUserPlus />
		<Link to="/rigster" >
										Rigster
								</Link>
					</MenuItem>							</MenuList>
		) 
		}

export default function Navbar(props) {
	const navigate =useNavigate()
	const [user, setUser ] = React.useState(null)
	  const [loged , setLoged ] = React.useState(false)
	const { colorMode, toggleColorMode } = useColorMode();
	React.useEffect(()=>{
		if (getLoged() === "true") {
setLoged(true);				getUserDetails().then(({data}) =>{
// console.log(data)
	setUser(data);
		}).catch((e) =>{
			console.log({
	message: "Error NavBar",
	error: e
});
});
		}
		return () => {
			console.log("getUser Done ✅")
		}
	}, [loged])
	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={"4"}>
				<Flex h={"16"} alignItems={'center'} justifyContent={'space-between'}>
					<Flex>
						<Button ref={props.refe} onClick={props.open} > <FiMenu /> </Button>
						<Logo />
						<Button onClick={toggleColorMode}>
							{colorMode === 'light' ? <FiMoon /> : <FiSun />}
						</Button>
					</Flex>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Menu>
								<MenuButton
									as={Button}
							rounded={'full'}
									variant={'link'}
									cursor={'pointer'}
					>
									<Avatar
										url={'https://i.pravatar.cc/300'}
									/>
								</MenuButton>
			{(()=>{
if (loged) {
	return <IsLogedIn user={user}/>
}else {
	return <IsLogedOut />
}
})()}

		
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}



