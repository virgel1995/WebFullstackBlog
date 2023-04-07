import * as React from "react"
import {
	useDisclosure,
	Center
} from '@chakra-ui/react'
import { Seo } from "@/Components"
import {
	Sidebar,
	History,
	Navbar,
	Footer
} from "@/Ui"
import { getToken } from "@/Config"
import { useDispatch } from "react-redux"
import { setAuthToken } from "@/Store/slice/auth"

export default function Layout({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const dispatch = useDispatch()
	if (getToken() !== null) {
		dispatch(setAuthToken(getToken()))
	}
	return (
		< >
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
		</>
	);

}