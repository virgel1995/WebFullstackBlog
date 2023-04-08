import { Link } from "react-router-dom"
import {
	Box,
	Image,
	Avatar,
	SimpleGrid,
	Text,
	Flex,
	Button
} from "@chakra-ui/react"
import { Loader } from "@/Ui"
import Postlogo from "@/Assets/img/developer.gif"
import Userlogo from "@/Assets/img/logo.jpg"
import moment from 'moment';
import {
	AddTag,
	PostUpdate, Tags,
} from '../'

import { useDispatch, useSelector } from "react-redux"
import { handleNext, handlePrev } from "@/Store/slice/posts"

export default function Posts(props) {

	const loading = useSelector(state => state.posts.loading)
	const isAdmin = useSelector(state => state.auth.isAdmin)
	const posts = useSelector(state => state.posts.posts)
	const per_page = useSelector(state => state.posts.per_page)
	const dispatch = useDispatch()

	const handleBackToTop = () => {

		function scrollTo() {
			var e = document.documentElement;
			if (e.scrollTop === 0) {
				var t = e.scrollTop;
				++e.scrollTop;
				e = t + 1 === e.scrollTop-- ? e : document.body;
			}
			scrollToC(e, e.scrollTop, 0, 13000);
		}

		// Element to move, element or px from, element or px to, time in ms to animate
		function scrollToC(element, from, to, duration) {
			if (duration <= 0) return;
			if (typeof from === "object") from = from.offsetTop;
			if (typeof to === "object") to = to.offsetTop;
			// Choose one effect like easeInQuart
			scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
		}

		function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
			if (t01 < 0 || t01 > 1 || speed <= 0) {
				element.scrollTop = xTo;
				return;
			}
			element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
			t01 += speed * step;

			setTimeout(function () {
				scrollToX(element, xFrom, xTo, t01, speed, step, motion);
			}, step);
		}
		/* Effects List */
		function linearTween(t) {
			return t;
		}
		function easeInQuad(t) {
			return t * t;
		}
		function easeOutQuad(t) {
			return -t * (t - 2);
		}
		function easeInOutQuad(t) {
			t /= 0.5;
			if (t < 1) return t * t / 2;
			t--;
			return (t * (t - 2) - 1) / 2;
		}
		function easeInCuaic(t) {
			return t * t * t;
		}
		function easeOutCuaic(t) {
			t--;
			return t * t * t + 1;
		}
		function easeInOutCuaic(t) {
			t /= 0.5;
			if (t < 1) return t * t * t / 2;
			t -= 2;
			return (t * t * t + 2) / 2;
		}
		function easeInQuart(t) {
			return t * t * t * t;
		}

		function easeOutQuart(t) {
			t--;
			return -(t * t * t * t - 1);
		}

		function easeInOutQuart(t) {
			t /= 0.5;
			if (t < 1) return 0.5 * t * t * t * t;
			t -= 2;
			return -(t * t * t * t - 2) / 2;
		}
		function easeInQuint(t) {
			return t * t * t * t * t;
		}
		function easeOutQuint(t) {
			t--;
			return t * t * t * t * t + 1;
		}
		function easeInOutQuint(t) {
			t /= 0.5;
			if (t < 1) return t * t * t * t * t / 2;
			t -= 2;
			return (t * t * t * t * t + 2) / 2;
		}
		function easeInSine(t) {
			return -Math.cos(t / (Math.PI / 2)) + 1;
		}
		function easeOutSine(t) {
			return Math.sin(t / (Math.PI / 2));
		}
		function easeInOutSine(t) {
			return -(Math.cos(Math.PI * t) - 1) / 2;
		}
		function easeInExpo(t) {
			return Math.pow(2, 10 * (t - 1));
		}
		function easeOutExpo(t) {
			return -Math.pow(2, -10 * t) + 1;
		}

		function easeInOutExpo(t) {
			t /= 0.5;
			if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
			t--;
			return (-Math.pow(2, -10 * t) + 2) / 2;
		}

		function easeInCirc(t) {
			return -Math.sqrt(1 - t * t) - 1;
		}

		function easeOutCirc(t) {
			t--;
			return Math.sqrt(1 - t * t);
		}

		function easeInOutCirc(t) {
			t /= 0.5;
			if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
			t -= 2;
			return (Math.sqrt(1 - t * t) + 1) / 2;
		}
		scrollTo()
		// window.scrollTo({
		// 	top: 0,
		// 	behavior: "smooth",
		// 	transition: "ease out 10.5"
		// });
	};

	const handleNextPage = async () => {
		dispatch(handleNext(4))
	}
	const handlePrevPage = async () => {
		dispatch(handlePrev(4))
	}



	return (
		<>
			{loading ? <Loader /> :
				<Box  >

					<SimpleGrid columns={[1, null, 2]} spacingX="40px" spacingY="20px">
						{posts.slice(0, per_page).map((post) => (
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
										<Text fontSize="10px" bg="red.100" color="black" rounded="lg" px="1">
											{moment(post.created_at).local().startOf('seconds').fromNow()}
										</Text>
										{(() => {
											if (isAdmin) {
												return (
													<Flex>
														<PostUpdate post={post} />
														<AddTag post={post} />
													</Flex>
												)
											}
										})()}
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
									<Flex my="1">
										<Link key={post.id}
											to={`/post/${post.id}`}
											state={post} >
											<Box ml="1" px="1" bg="#FF0080" borderRight="solid 4px #7928CA" borderRadius="lg" >
												Read Post
											</Box></Link>
									</Flex>
								</Box>
							</Box>
						))}
					</SimpleGrid>

					<SimpleGrid columns={[1, null, 2]} mt={'3'} spacingX="40px" spacingY="20px">
						<Button w="full"
							my={1}
							borderRadius='md'
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							_hover={{
								bgGradient: 'linear(to-r, red.500, yellow.500)',
							}} onClick={handleBackToTop}>
							Back Top
						</Button>

						{per_page + 1 <= posts.length ? <Button w="full"
							my={1}
							borderRadius='md'
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							_hover={{
								bgGradient: 'linear(to-r, red.500, yellow.500)',
							}} onClick={handleNextPage}>
							Load More
						</Button> : <Button w="full"
							my={1}
							borderRadius='md'
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							_hover={{
								bgGradient: 'linear(to-r, red.500, yellow.500)',
							}} onClick={handlePrevPage}>
							Hide Less
						</Button>}
					</SimpleGrid>
				</Box >
			}
		</>
	)

}

