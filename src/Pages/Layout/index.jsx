import * as React from "react"
//import { Outlet , Link } from "react-router-dom";
import {
useDisclosure,
Center
} from '@chakra-ui/react'
import { Seo } from "@/Components"
import { Sidebar , History, Navbar, Footer, Loader} from "@/Ui"
import { waiter, getToken, setLoged ,setAdmin} from "@/Config"

export default function Layout({children}) {
	const [loading , setLoading ] = React.useState(true);

	if (getToken() === null) {
		setLoged(false);
		setAdmin(false);
	}
const { isOpen, onOpen, onClose } = useDisclosure()
const btnRef = React.useRef()
React.useEffect(()=>{
	waiter(1000).then(()=> {
		setLoading(false)
	})
	
}, [loading])

	if(!loading){
	return (
		<>
			<Seo />
			<Navbar open= {onOpen} refe= {btnRef} />
 			<Sidebar close= {onClose} open= {isOpen}/>
				<History />
			{/*	<Container py="2">*/}
<Center py="2">

				{children}
	</Center>
			{/*	</Container>*/}
			<Footer />
		</>
	);
	} else {
		return <Loader />
	}
}