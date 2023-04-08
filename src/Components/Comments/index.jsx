
import { useEffect } from "react"
import {
	Text,
	Box,
	Avatar,
	Flex
} from '@chakra-ui/react'
import {
	AddComment,
} from '../'
import { useSelector } from "react-redux";
import moment from 'moment';

import Userlogo from "@/Assets/img/logo.jpg"
import { Loader } from "@/Ui";
export default function Comments({
	comments,
	post
}) {

	const loading = useSelector(state => state.comments.loading)
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	
	return (
		<>
		{loading ? <Loader /> :
			<Box >
				<Text textAlign={'center'}>Comments</Text>
				{comments.map((com, index) => (
					<Box key={com.id} maxW="sm" m={'1'} borderRight="solid 4px #7928CA"
						borderLeft="solid 4px #7928CA" borderBottom="solid 4px #7928CA" borderRadius="lg" overflow="hidden"
						bg={'#FF0080'}>
						<Box bg={'#7928CA'} py={'1'} roundedBottomLeft={'md'} roundedBottomRight={'md'}>
							<Flex d="flex"  alignItems={'center'}>
								<a href={Userlogo}>
									<Avatar w="25px" h="25px" src={Userlogo} />
								</a>
								<Text mx={'2'} bg="#FF0080"
									color="black" rounded="lg" px="2" >
									#{com.id}
								</Text>
								<Text fontSize="10px" bg="#FF0080"
									color="black" rounded="lg" px="1">
									{moment(com.created_at).local().startOf('seconds').fromNow()}
								</Text>
							</Flex>
						</Box>
						<Box roundedBottomRight={'md'} roundedBottomLeft={'md'} py={'1'}>
							<Text px="2">
								{com.text}
							</Text>
						</Box>
					</Box>
				))}
				{isLoggedIn && (
					<AddComment id={post} />
				)}
			</Box>
			}
		</>
	)
}