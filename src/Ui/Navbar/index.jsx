import { BrowserView, MobileView } from 'react-device-detect';
import {
	Link,
} from "react-router-dom";
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
} from '@chakra-ui/react';
import { Avatar, Logo } from "@/Ui"


export function browserNavbar() {

	return (
		<>
			browser navbar
		</>
	)
}
export function MobileNavbar(props) {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={"4"}>
				<Flex h={"16"} alignItems={'center'} justifyContent={'space-between'}>
					<Flex>
						<Button ref={props.refe} onClick={props.open} > <HamburgerIcon /> </Button>
						<Logo />
						<Button onClick={toggleColorMode}>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Flex>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Menu>
								<MenuButton
									as={Button}
									rounded={'full'}
									variant={'link'}
									cursor={'pointer'}>
									<Avatar
										url={'https://i.pravatar.cc/300'}
									/>
								</MenuButton>
								<MenuList >
									<br />
									<Center>
										<p>Username</p>
									</Center>
									<br />
									<MenuDivider />
									<MenuItem>
										Your Servers
									</MenuItem>
									<MenuItem>
										Account Settings
									</MenuItem>
									<MenuItem>
										Logout
									</MenuItem>

								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}


export default function Navbar(props) {

	return (
		<>
				<MobileNavbar refe={props.refe} open={props.open} />

		</>
	)

}
