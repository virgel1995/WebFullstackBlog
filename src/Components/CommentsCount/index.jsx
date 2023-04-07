import { useEffect } from "react"
import {
	Flex,
	Text,
} from '@chakra-ui/react'
import { VscComment } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "@/Store/slice/comments";

export default function CommentsCount(props) {
	const comments = useSelector(state => state.comments.comments);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllComments(props.id))
	}, [])

	return (
		<>
			<Flex maxW="20" ml="1" alignItems="center" px="1" bg="#FF0080" borderLeft="solid 4px #7928CA" borderRadius="lg">
				<VscComment />
				<Text px="1">
					{comments.length ?? 0}
				</Text>
			</Flex>
		</>
	)

}