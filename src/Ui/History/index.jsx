import { useState, useEffect } from "react"
import {
	Link,
	useLocation,
} from "react-router-dom"
import {
	Breadcrumb,
	BreadcrumbItem,
	GridItem,
	Container,
	Grid,
	IconButton,
	Box
} from '@chakra-ui/react'
import {
	FiArrowRightCircle, FiWifiOff, FiWifi
} from "react-icons/fi"
import { PostCreate } from "../../Components"
import useOnline from '../../Hooks/onlineStatus';

import { useSelector } from "react-redux"

export function Loged(params) {


	return (

		<Breadcrumb spacing='8px' pt="0" separator={<FiArrowRightCircle color='gray.500' />}>
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

	)


}


export default function History(props) {
	const location = useLocation();
	const isAdmin = useSelector(state => state.auth.isAdmin)
	const online = useOnline()

	return (
		<>
			<Box alignItems={'center'} justifyContent={'center'} w={'80%'} ml={'10%'}>
			<Grid templateColumns='repeat(3, 1fr)'  gap={6} alignItems={"center"} borderLeft="solid 5px #7928CA" borderRight="solid 5px #7928CA"
				bg="teal" rounded="lg" shadow='md' py="1">
				<GridItem pl={'50%'}>
					<Box display="flex">
						<Loged location={location} />
					</Box>
				</GridItem>
				<GridItem pl={'50%'} > {online ? <IconButton
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
				<GridItem pl={'50%'}>
					{(() => {
						if (isAdmin) {
							return (
								<PostCreate />
							)
						}
					})()}
				</GridItem>

			</Grid>
		</Box >
		</>
	)
}


