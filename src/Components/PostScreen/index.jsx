import {
	Box,
	Badge,
	Image,
	Avatar,
	Text,
	Flex,
	SimpleGrid,
	useToast
} from "@chakra-ui/react"
import moment from 'moment';
import {
	CommentsCount,
	Comments,
	Tags,
	PostUpdate,
	AddTag,
} from '../'

import Postlogo from "@/Assets/img/developer.gif"
import Userlogo from "@/Assets/img/logo.jpg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllComments } from "@/Store/slice/comments";
import { useNavigate, useParams } from "react-router-dom";
export default function PostScreen({
	post
}) {

	const comments = useSelector(state => state.comments.comments);
	const isAdmin = useSelector(state => state.auth.isAdmin)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast()

	useEffect(() => {
		if (post) {
			dispatch(getAllComments(post.id))
		}
	}, [post])

	if (!post) {
		navigate('/home')
		toast({
			title: "Error",
			description: `The Post You Need It Not Found Or May Be Deleted`,
			status: "error",
			duration: 3000,
			isClosable: true,
		})
	} else {
		return (
			<SimpleGrid columns={[1, null, 2]} spacingX="40px" spacingY="20px">
				<Box maxH="lg" maxW="sm" borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden">
					<a href={Postlogo}>
						<Image src={Postlogo} alt={post.user.name} w="100%" />
					</a>
					<Box p="6">
						<Flex d="flex" alignItems="baseline">
							<a href={Userlogo}>
								<Avatar w="25px" h="25px" src={Userlogo} />
							</a>
							<Text px="1">
								{post.user.name}
							</Text>
							<Text fontSize="10px" bg="red.100" color="black" rounded="lg" px="1">{moment(post.created_at).local().startOf('seconds').fromNow()}
							</Text>
							{/* {(() => {
											if (isAdmin) {
												return (
													<Flex>
														<PostUpdate post={post} />
														<AddTag post={post} />
													</Flex>
												)
											}
										})()} */}
						</Flex>
						{/* tags */}
						<Tags tags={post.tags} post={post} />

						<Box
							mt="1"
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
							isTruncated
						>
							{post.title}
						</Box>
						<hr style={{
							width: "25%",
							background: "#FF0080"
						}} />
						<Box>
							{post.text.slice(0, 50)}
						</Box>
						<hr style={{
							width: "50%",
							background: "#FF0080",
						}} />
						{/* comments Count*/}
						<CommentsCount comments={comments} />
					</Box>
				</Box>
				<Box maxW="sm" borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden">
					{/* comments */}
					<Comments comments={comments} post={post} />
				</Box>
			</SimpleGrid>
		)
	}
}