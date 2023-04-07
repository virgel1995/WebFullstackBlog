
import {
	Box,
	Badge,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useColorModeValue,
	FormControl,
	FormLabel,
	Input,
	Select,
	Avatar,
	AvatarBadge,
	IconButton,
	useToast,
	Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FiTrash } from "react-icons/fi"
import { getToken } from "@/Config";
import { UpdateUserPassword, UpdateUserDetails, setAuthToken } from "@/Store/slice/auth";
import UserLogo from "@/Assets/img/logo.jpg"

export default function Profile() {
	// const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const loading = useSelector(state => state.auth.loading)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toast = useToast()
	const user = useSelector(state => state.auth.user)


	useEffect(() => {
		if (user === null && getToken() !== null) {
			dispatch(setAuthToken(getToken()))
			navigate("/home")
			toast({
				title: "Welcome Back Mate",
				// description: "Please Use Your Code below To Login First Time To Accept Your Account",
				status: "info",
				duration: 3000,
				isClosable: true,
			})
		} else if (user === null && getToken() === null) {
			navigate("/login")
		}
	}, [])


	if (user !== null) {
		const [name, setName] = useState(user.name)
		const [gender, setGender] = useState(user.gender)
		const [age, setAge] = useState(user.age)
		const [password, setPassword] = useState('');

		const Updating = (e) => {
			e.preventDefault()
			const update = dispatch(UpdateUserDetails({
				id: user.id,
				name: name,
				gender: gender,
				age: age
			})).then((data) => {
				// console.log(data)
				if (data.payload.error) {
					toast({
						title: data.payload.error.name,
						status: "error",
						duration: 3000,
						isClosable: true,
					})
				} else {
					toast({
						title: data.payload.message,
						status: "success",
						duration: 3000,
						isClosable: true,
					})
				}


			}).catch((e) => {
				// console.log(e)
				toast({
					title: e.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				})
			})
		}
		const UpdatingPass = (e) => {
			e.preventDefault()
			const update = dispatch(UpdateUserPassword({
				id: user.id,
				name: name,
				password: password,
				gender: gender,
				age: age
			})).then((data) => {
				// console.log(data)
				toast({
					title: data.payload.message,
					status: "success",
					duration: 3000,
					isClosable: true,
				})
			}).catch((e) => {
				// console.log(e)
				toast({
					title: e.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				})
			})


		}

		return (
			<>
				<Stack>
					<Center py={6}>
						{/* user Card */}
						<Box >
							<Stack
								borderWidth="1px"
								borderRadius="lg"
								w={{ sm: '100%', md: '540px' }}
								height={{ sm: '50%', md: '20rem' }}
								direction={{ base: 'column', md: 'row' }}
								// bgGradient='linear(to-l, #7928CA, #FF0080)'
								_hover={{
									bgGradient: 'linear(to-r, red.500, yellow.500)',
								}}
								boxShadow={'2xl'}
								padding={4}>
								<Flex flex={1}>
									<a href={UserLogo}>
										<Box
											rounded={'lg'}
											mt={'-1'}
											pos={'relative'}
											// height={{ sm: '100%', md: '15rem' }}
											height={{ sm: '100%', md: '100%' }}

											_after={{
												transition: 'all .3s ease',
												content: '""',
												w: 'full',
												h: 'full',
												pos: 'absolute',
												top: 5,
												left: 0,
												backgroundImage: `url(${UserLogo})`,
												filter: 'blur(15px)',
												zIndex: -1,
											}}
											_groupHover={{
												_after: {
													filter: 'blur(20px)',
												},
											}}>
											<Image
												rounded={'lg'}
												height={{ sm: '100%', md: '100%' }}
												// width={282}
												boxSize="100%"
												objectFit={'cover'}
												src={UserLogo}
											/>
										</Box>
									</a>
								</Flex>
								<Stack
									flex={1}
									flexDirection="column"
									justifyContent="center"
									alignItems="center"
									p={1}
									pt={2}>
									<Heading fontSize={'2xl'} fontFamily={'body'}>
										<Flex direction={'row'} mt={6}>
											<Badge
												px={2}
												py={2}
												mr={1}
												rounded={'full'}
												alignItems={'center'}
												justifyContent={'center'}
												fontWeight={'400'}
												borderRadius='full'
												bgGradient='linear(to-l, #7928CA, #FF0080)'
												_hover={{
													bgGradient: 'linear(to-r, red.500, yellow.500)',
												}}
											>
												#{user.id}
											</Badge>

											{user.name}
										</Flex>


									</Heading>
									<Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
										@{user.name}
									</Text>
									<Text
										textAlign={'center'}
										color={useColorModeValue('gray.700', 'gray.400')}
										px={3}>
										No Bio Yet
									</Text>
									<Stack direction={'row'} mt={6}>
										<Button
											flex={1}
											fontSize={'sm'}
											rounded={'full'}
											bg={'blue.400'}
											color={'white'}
											boxShadow={
												'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
											}
											_hover={{
												bg: 'blue.500',
											}}
											_focus={{
												bg: 'blue.500',
											}}>
											<p>{user.age} Years</p>
										</Button>

									</Stack>
									<Stack
										width={'100%'}
										mt={'2rem'}
										direction={'row'}
										padding={2}
										justifyContent={'space-between'}
										alignItems={'center'}>
										<Button
											flex={1}
											fontSize={'sm'}
											rounded={'full'}
											_focus={{
												bg: 'gray.200',
											}}>
											{user.gender === "male" ? "Male" : "Women"}
										</Button>
										<Button
											flex={1}
											fontSize={'sm'}
											rounded={'full'}
											_focus={{
												bg: 'gray.200',
											}}
										>
											{user.type === "admin" ? "Admin" : "Client"}
										</Button>
									</Stack>
								</Stack>
							</Stack>
						</Box>
					</Center>
					{/* settings */}
					<Flex
						borderWidth="1px"
						borderRadius="lg"
						align={'center'}
						justify={'center'}
						bgGradient='linear(to-l, #e77a3f, #2f2114)'
						_hover={{
							bgGradient: 'linear(to-r, #e77a3f, #2f2114)'
						}}
					>
						<Stack
							spacing={4}
							w={'full'}
							maxW={'md'}
							rounded={'xl'}
							boxShadow={'lg'}
							p={6}
							my={12}>
							<Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
								User Profile Edit
							</Heading>
							{/* images change */}
							<Box>
								<FormControl id="userName">
									<FormLabel>User Icon</FormLabel>
									<Stack direction={['column', 'row']} spacing={6}>
										<Center>
											<Avatar size="xl" src={UserLogo}>
												<AvatarBadge
													as={IconButton}
													size="sm"
													rounded="full"
													top="-10px"
													colorScheme="red"
													aria-label="remove Image"
													icon={<FiTrash />}
												/>
											</Avatar>
										</Center>
										<Center w="full">
											<Button w="full">Change Icon</Button>
										</Center>
									</Stack>
								</FormControl>
							</Box>

							{/* informations  */}
							<Box as={'form'} onSubmit={Updating}>
								<Box>
									<FormControl id="userName" isRequired>
										<FormLabel>User name</FormLabel>
										<Input
											onChange={(e) => setName(e.target.value)}
											value={name}
											placeholder="Set Your Name"
											_placeholder={{ color: 'gray.500' }}
											type="text"
										/>
									</FormControl>

									<FormControl id="age" isRequired>
										<FormLabel>Age</FormLabel>
										<Input
											value={age}
											onChange={(e) => setAge(e.target.value)}
											placeholder="Set Your Age"
											_placeholder={{ color: 'gray.500' }}
											type="number"
										/>
									</FormControl>

									<FormControl >
										<FormLabel>Gender</FormLabel>
										<Select selected={gender}
											onChange={(e) => setGender(e.target.value)}>
											<option value='male'>Male</option>
											<option value='female'>Female</option>
										</Select>
									</FormControl>
								</Box>

								<Box>
									<Stack py={1} spacing={6} direction={['column', 'row']}>
										<Button
											type={'submit'}
											borderRadius='md'
											bgGradient='linear(to-l, #7928CA, #FF0080)'
											w={'full'}
											_hover={{
												bgGradient: 'linear(to-r, red.500, yellow.500)',
											}}>
											{loading ? <Spinner /> : "Update Details"}
										</Button>
									</Stack>
								</Box>
							</Box>
							{/* informtion End */}
							<Box as={'form'} onSubmit={UpdatingPass}>
								<Text color={'gray.400'} textAlign={'center'}
									bg={'red'} rounded={'md'} py={'1'}
								> Danger Zone </Text>
								<FormControl id="password" isRequired py={1}>
									<FormLabel>Password</FormLabel>
									<Input
										onChange={(e) => setPassword(e.target.value)}
										placeholder="*************"
										_placeholder={{ color: 'gray.500' }}
										type="password"
									/>
								</FormControl>
								<Button
									type={'submit'}
									w="full"
									my={1}
									borderRadius='md'
									bgGradient='linear(to-l, #7928CA, #FF0080)'
									_hover={{
										bgGradient: 'linear(to-r, red.500, yellow.500)',
									}}>
									{loading ? <Spinner /> : "Change Password"}
								</Button>

								<Button
									bg={'red.400'}
									color={'white'}
									w="full"
									_hover={{
										bg: 'red.500',
									}}>
									Delete Account
								</Button>
							</Box>
						</Stack>
					</Flex>


				</Stack >
			</>
		)
	}

}