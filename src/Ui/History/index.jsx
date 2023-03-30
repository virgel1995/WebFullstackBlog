import { useState, useEffect } from "react"
import { 
	Link,
	useLocation,
} from "react-router-dom"
import {
	Breadcrumb,
	BreadcrumbItem,
	GridItem,
  Container ,
	Grid,
IconButton
} from '@chakra-ui/react'
import {
	FiArrowRightCircle,FiWifiOff,FiWifi
} from "react-icons/fi"
import { PostCreate } from "../../Components"
import useOnline from '../../Hooks/onlineStatus';

import { getLoged ,getAdmin} from "../../Config"

export function Loged(params) {
  const [loged , setLoged ] = useState(false)
const [isAdmin, setIsAdmin ] = useState(false)
	const online = useOnline()
	useEffect(() =>{
		if (getLoged() === "true") {
			setLoged(true)
		}
	if (getAdmin() === "true") {
		setIsAdmin(true)
	}
	}, [loged,isAdmin])
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
  <GridItem > {online ? <IconButton
  colorScheme='teal'
  aria-label='Call Segun'
  size='md'
  icon={<FiWifi />}
/> : <IconButton
  colorScheme='red'
  aria-label='Call Segun'
  size='md'
  icon={<FiWifiOff />}
/>}</GridItem>
  <GridItem  alignItems={"center"}  >
		
		{(()=>{if (isAdmin) {
			return (
			<PostCreate  />
			)
		}
})()}
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


