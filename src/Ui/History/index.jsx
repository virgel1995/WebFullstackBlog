import { useState, useEffect } from "react"
import { 
	Link,
	useLocation,
} from "react-router-dom"
import {
	Breadcrumb,
	BreadcrumbItem,
	GridItem,
  Box,
	Center,
	Container ,
	Grid
} from '@chakra-ui/react'
import {
	FiArrowRightCircle
} from "react-icons/fi"
import { PostCreate } from "@/Components"

import { getLoged ,getAdmin} from "@/Config"

export function Loged(params) {
  const [loged , setLoged ] = useState(false)
const [isAdmin, setIsAdmin ] = useState(false)
	
	useEffect(() =>{
		if (getLoged() === "true") {
			setLoged(true)
		}
	if (getAdmin() === "true") {
		setIsAdmin(true)
	}
	}, [loged])
		return (
<Grid templateColumns='repeat(3, 1fr)' gap={6} alignItems={"center"}>
  <GridItem >
	<Breadcrumb  spacing='8px'  pt="0" separator={<FiArrowRightCircle color='gray.500'  />}>
						<BreadcrumbItem>
							<Link to='/' state={{ name: "Main" }}>
								Main
							</Link>
						</BreadcrumbItem>
						<BreadcrumbItem isCurrentPage>
							<p>
{location.pathname.substring(1)}
							</p>
						</BreadcrumbItem>
					</Breadcrumb>
</GridItem>
  <GridItem  />
  <GridItem  alignItems={"center"}  >
		
		{isAdmin  && (
           <PostCreate  />
         )}
	</GridItem>
</Grid>
	)
		

}
	

export default function History(props) {
const location = useLocation();
//	console.log(location)
	return (
		<>

<Container  borderLeft= "solid 5px #7928CA"  borderRight= "solid 5px #7928CA" bg="teal" rounded="lg" shadow='md' py="1"display="flex">
<Loged location={location} />
	
				</Container>

		</>
	)
}


