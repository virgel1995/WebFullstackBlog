import * as React from "react"
import { Outlet , Link } from "react-router-dom";
import {
Button,useDisclosure
} from '@chakra-ui/react'
import { Seo } from "@/Components"
import { Sidebar , History, Navbar, Footer, Loader} from "@/Ui"

export default function Layout({children}) {
const { isOpen, onOpen, onClose } = useDisclosure()
	  const btnRef = React.useRef()
	
	return (
		<>
			<Seo />
			<Navbar open= {onOpen} refe= {btnRef} />
 			<Sidebar close= {onClose} open= {isOpen}/>
				<History />
				{children}
			{/*	<Loader />*/}
			<Footer />
		</>
	);
}