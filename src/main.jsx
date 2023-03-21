import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async';
import { router } from "@/routes"
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Layout, NotFound, Login, Rigster, Home } from "@/Pages"

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>   
				<BrowserRouter>
		<HelmetProvider>	
			<ChakraProvider>
        <Routes>
					
		<Route path="/" element={ <Layout><Login /></Layout>} />
         
	<Route path="/home" element={<Layout><Home /></Layout>} />
					
	<Route path="/login" element={<Layout><Login /></Layout>} />
					
  <Route path="/rigster" element={<Layout><Rigster /></Layout>} />

					
	<Route path="*" element={<Layout><NotFound /></Layout>} />
     
				</Routes>
		   </ChakraProvider>

		</HelmetProvider>
					   
				</BrowserRouter>
	</React.StrictMode>,
)
