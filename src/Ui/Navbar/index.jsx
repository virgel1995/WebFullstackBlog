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
import { Avatar, Logo } from "@/Ui"
import { getUserDetails, setLoged, removeToken } from "@/Config"

export function IsLogedIn(props) {
		const navigate =useNavigate()
	const Logout = () => {
		setLoged(false)
		removeToken()
		navigate("/")
window.location.reload() 
	}
	if (props.username === "") {
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
	} else {
return (
	<>
									<MenuList >

			<MenuItem>
					<Link to="/profile" >
										Profile
								</Link>
									</MenuItem>
									
									<MenuItem>
		<Link to="/profile/settings" >
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
}

export default function Navbar(props) {
	const navigate =useNavigate()
		const [user, setUser ] = React.useState(null)
	
	const { colorMode, toggleColorMode } = useColorMode();

	
	React.useEffect(()=>{
		getUserDetails().then(({data}) =>{

// console.log(data)
	setUser(data);
		}).catch((e) =>{
			console.log(e.message)
		//	navigate("/login")
})
	}, [user])
 let username;


	if (user) {
		username = user.name
			} else {
		username = ""
	}
	
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
		<IsLogedIn username={username}/>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}



