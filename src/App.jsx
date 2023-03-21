import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider ,useDisclosure } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { Seo } from "@/Components"
import { Sidebar , History, Navbar, Footer, Loader} from "@/Ui"
import { Layout, NotFound, Login, Rigster } from "@/Pages"



export default function App() {
const { isOpen, onOpen, onClose } = useDisclosure()
	  const btnRef = React.useRef()
	

	return (
		<ChakraProvider>

<BrowserRouter>
	<Seo />
	<Navbar open= {onOpen} refe= {btnRef} />
 	<Sidebar close= {onClose} open= {isOpen}/>
	<History />
        <Routes>
		<Route path="/" element={<Login />} />
         
	<Route path="/login" element={<Login />} />
					
  <Route path="/rigster" element={<Rigster />} />

					
	<Route path="*" element={<NotFound />} />


				</Routes>

				</BrowserRouter>
			
	<Footer />
		 </ChakraProvider>  
)

}