
import { useEffect, useState } from "react"
import {
	useColorModeValue,
	Text,
	Box
} from '@chakra-ui/react'
import {
	AddComment,
} from '../'
import { getAllComments } from "@/Store/slice/comments";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Comments() {
	const params = useParams()
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const comments = useSelector(state => state.comments.comments);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllComments(params.post))
	}, [])

	return (
		<>
			<Box >

				<Text textAlign={'center'}>Comments</Text>
				{comments.map((com, index) => (
					<Box key={com.id} maxW="sm" mt="1" py={'1'} m="1" borderRight="solid 4px #7928CA"
						borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden"
						bg={'#FF0080'}>
						<Text px="2">
							{com.text}
						</Text>
					</Box>
				))}
				{isLoggedIn && (
					<AddComment id={params.post} />
				)}
			</Box>
		</>
	)
}