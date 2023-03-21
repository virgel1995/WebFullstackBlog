
import { BrowserView, MobileView } from 'react-device-detect';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	MenuItem,
	MenuList,
	Menu
} from '@chakra-ui/react'
import { router } from "@/routes";
import { Link } from "react-router-dom"
const animals = [
	"Dog",
	"Bird",
	"Cat",
	"Mouse",
	"Horse"
];

export function browserSidebar() {
	return (
		<>
			Browser side bar
		</>
	)
}
export function MobileSidebar({
	open,
	close,
	ref
}) {

	return (
		<>
			<Drawer
				isOpen={open}
				placement='left'
				onClose={close}
				finalFocusRef={ref}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton colorScheme="teal" />
					<DrawerHeader>
						Sidebar header
					</DrawerHeader>

					<DrawerBody>
						<Menu>
							<MenuList>
								<MenuItem>
					<Link to= "/home" >
					Home 
					</Link>
								</MenuItem>
								
					<MenuItem>
					<Link to= "/posts" >
					All Posts
					</Link>
					</MenuItem>
								
							</MenuList>
						</Menu>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={close}>
							Cancel
						</Button>
						<Button colorScheme='blue'>Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}


export default function Sidebar({
	open,
	close,
	ref
}) {

	return (
		<>
				<MobileSidebar close={close} open={open} ref={ref} />
		
		</>
	)

}
