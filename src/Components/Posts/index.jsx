import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
	Box,
	Badge,
	Image,
	Avatar,
	SimpleGrid,
	Text,
	Flex
} from "@chakra-ui/react"
import { Loader } from "@/Ui"
import Postlogo from "@/Assets/img/developer.gif"
import Userlogo from "@/Assets/img/logo.jpg"
import moment from 'moment';
import {
	PostUpdate,
} from '../'


import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "@/Store/slice/posts"

export default function Posts(props) {

	const loading = useSelector(state => state.posts.loading)
	const isAdmin = useSelector(state => state.auth.isAdmin)
	const dispatch = useDispatch()
	useEffect(() => {
		// window.addEventListener("scroll", onScroll);
		dispatch(getAllPosts())
	}, []);
	const posts = useSelector(state => state.posts.posts)
	var regExp = /[a-zA-Z]/g;
	var testString = "john";

	if (regExp.test(testString)) {
		/* do something if letters are found in your string */
	} else {
		/* do something if letters are not found in your string */
	}


	if (!loading) {
		return (
			<>

				<Box>
					<SimpleGrid columns={[1, null, 2]} spacingX="40px" spacingY="20px">
						{posts.map((post) => (
							<Box key={post.id} maxW="sm" borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden">
								<a href={Postlogo} >
									<Image src={Postlogo} alt={post.title} w="100%"
										borderBottom="solid 4px #7928CA" />
								</a>
								<Box p="6">
									<Flex d="flex" alignItems="center">
										<a href={Userlogo} >
											<Avatar w="25px" h="25px" src={Userlogo} />
										</a>
										<Text px="1">
											{post.user.name}
										</Text>
										<Text fontSize="10px" bg="red.100" color="black" rounded="lg" px="1">{moment(post.created_at).local().startOf('seconds').fromNow()}
										</Text>
										{(() => {
											if (isAdmin) {
												return (
													<PostUpdate post={post} />
												)
											}
										})()}
									</Flex>
									<Box d="flex" alignItems="center" spacing="2">
										{post.tags.map((tag, index) => (
											<Badge key={tag.id} borderRadius="full" borderLeft="solid 4px #7928CA" borderRight="solid 4px #7928CA" mr="1" px="1" bg="#FF0080">
												{tag.name}
											</Badge>
										))}
									</Box>
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
									<Flex my="1">
										{/* <CommentsCount id={post.id} /> */}
										<Link key={post.id}
											to={`/post/${post.id}`}
											state={post} >
											<Box ml="1" px="1" bg="#FF0080" borderRight="solid 4px #7928CA" borderRadius="lg" >
												View Comments
											</Box></Link>
									</Flex>
								</Box>
							</Box>
						))}
					</SimpleGrid>
				</Box>


			</>
		)
	} else {
		return (
			<>
				<Loader />
			</>
		)
	}
}

