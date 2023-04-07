
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Stack,
	Text,
	Button
} from '@chakra-ui/react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom"


export function MobileSidebar({
	open,
	close,
	ref
}) {
	const posts = useSelector(state => state.posts.posts)
	const location = useLocation()
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
						<Stack>

							<Text>Posts - [ {posts.length} ]</Text>
						</Stack>
					</DrawerHeader>
					<DrawerBody>
						{/* {location.pathname === "/home" ? */}
						<ul>
							{posts.map((post, index) => (
								<li key={index} style={{
									display: 'flex',
									alignItems: 'center'
								}}>
									<Text px={'1'} rounded='full'
										bgGradient='linear(to-l, #FF0080, #7928CA)'
										_hover={{
											bgGradient: 'linear(to-r, red.500, yellow.500)',
										}}>{("0" + index).slice(-2)}</Text>
									<FiArrowRightCircle />
									<Link to={`/post/${post.id}`} state={post}>

										<Button w={'52'} my={'1'} ml={'1'} borderRadius='md'
											bgGradient='linear(to-l, #7928CA, #FF0080)'
											_hover={{
												bgGradient: 'linear(to-r, red.500, yellow.500)',
											}}>
											{post.title.slice(0, 15)}
										</Button>
									</Link>
								</li>
							))}
						</ul>
						{/* : <Link to="/home" >
							Go Home
						</Link>} */}

					</DrawerBody>

					{/* <DrawerFooter>
footer
					</DrawerFooter> */}
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
