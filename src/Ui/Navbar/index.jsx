import * as React from "react"
import {
	Link,
	useNavigate
} from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiShare, FiUserPlus, FiUser, FiCloudOff } from "react-icons/fi";
import {
	Box,
	Flex,
	Button,
	useColorModeValue,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import { Avatar, Logo } from "../"
import { 
	getUserDetails,
	 removeToken } from "@/Config"
import { useDispatch, useSelector } from "react-redux";
import { 
	handleLogout,
	 setAdmin, setUser
	 } from "@/Store/slice/auth";
import logo from "@/Assets/img/logo.jpg"

export default function Navbar(props) {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const { colorMode, toggleColorMode } = useColorMode();
	React.useEffect(() => {
		if (isLoggedIn) {
			getUserDetails().then(({ data }) => {
				if (data.type === "admin") {
					dispatch(setAdmin(true))
				}
				dispatch(setUser(data))
			}).catch((e) => {
				console.log({
					message: "Error NavBar",
					error: e.message
				});
			});
		}
	}, [])
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
							<Flex>

								{isLoggedIn ? <Box display={'flex'}><IsLogedIn user={user} />
									<Link to={'/profile'}>
										<Avatar
											url={logo}
										/>
									</Link>
								</Box> : <IsLogedOut />}

							</Flex>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}


export function IsLogedIn(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const Logout = async () => {
		removeToken()
		await dispatch(handleLogout())
		navigate("/")

	}
	return (
		<>
			<Flex >
				<Link to="/profile" state={props.user} >
					<Button rounded='full' p={'1'}
						bgGradient='linear(to-l, #7928CA, #FF0080)'
						_hover={{
							bgGradient: 'linear(to-r, red.500, yellow.500)',
						}}>
						<FiUser />
					</Button>
				</Link>
				<Button mx={'2'}
					rounded='full' p={'1'}
					bgGradient='linear(to-l, #7928CA, #FF0080)'
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}} onClick={Logout}>
					<FiCloudOff />
				</Button>
			</Flex>
		</>
	)

}

export function IsLogedOut(props) {
	return (
		<Flex >
			<Link to="/login" >
				<Button rounded='full' p={'1'}
					bgGradient='linear(to-l, #7928CA, #FF0080)'
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}}>
					<FiShare />
				</Button>
			</Link>

			<Link to="/rigster" style={{
				marginLeft: '5px',
				marginRight: '5px'
			}}	 >
				<Button rounded='full' p={'1'}
					bgGradient='linear(to-l, #7928CA, #FF0080)'
					_hover={{
						bgGradient: 'linear(to-r, red.500, yellow.500)',
					}}>
					<FiUserPlus />
				</Button>
			</Link>
		</Flex>
	)
}