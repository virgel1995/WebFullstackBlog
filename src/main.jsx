import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { 
	Layout,
	NotFound,
	Login,
	Rigster,
	Home,
	Landing,
	PostView,
	PostUpdate,
	Profile
} from "./Pages"
import "./assets/css/index.css"
import {theme } from "./Config"
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>   
				<BrowserRouter>
		<HelmetProvider>	
			<ChakraProvider theme ={theme}>
        <Routes>
					
		<Route path="/" element={ <Layout><Landing /></Layout>} />
         
	<Route path="/home" element={<Layout><Home /></Layout>} />
					
	<Route path="/login" element={<Login />} />
					
  <Route path="/rigster" element={<Rigster />} />
	<Route path="/profile" element={<Profile />} />
					
  <Route path="/post/view" element={<Layout><PostView /></Layout>} />
  <Route path="/post/edit" element={<Layout><PostUpdate /></Layout>} />

					
	<Route path="*" element={<NotFound />} />
     
				</Routes>
		   </ChakraProvider>

		</HelmetProvider>
					   
				</BrowserRouter>
	</React.StrictMode>,
)
