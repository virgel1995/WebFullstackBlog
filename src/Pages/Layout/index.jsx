import * as React from "react"
import {
	useDisclosure,
	Center,
	Box
} from '@chakra-ui/react'
import { Seo } from "@/Components"
import {
	Sidebar,
	History,
	Navbar,
	Footer,
	Loader
} from "@/Ui"
import { getToken } from "@/Config"
import { useDispatch, useSelector } from "react-redux"
import { setAuthToken } from "@/Store/slice/auth"
import { getAllPosts } from "@/Store/slice/posts"

export default function Layout({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const dispatch = useDispatch()
	const loading = useSelector(state => state.posts.loading)

	React.useEffect(() => {
		if (getToken() !== null) {
			dispatch(setAuthToken(getToken()))
		}
		dispatch(getAllPosts())
		//  to clear Effect

		return () => {
			// console.log('layout Hit')
		}
	}, [])
	return (
		<>
			{loading ? <Loader /> : <Box>
				<Seo />
				<Navbar open={onOpen} refe={btnRef} />
				<Sidebar close={onClose} open={isOpen} />
				<History />
				{/*	<Container py="2">*/}
				<Center py="2">
					{children}
				</Center>
				{/*	</Container>*/}
				<Footer />
			</Box>
			}

		</>

	);

}