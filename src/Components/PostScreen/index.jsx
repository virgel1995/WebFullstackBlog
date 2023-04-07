import {
	Box,
	Badge,
	Image,
	Avatar,
	Text,
	Flex,
	SimpleGrid
} from "@chakra-ui/react"
import logo from "../../assets/img/developer.gif"
import moment from 'moment';
import {
	//   AddTag,
	CommentsCount,
	Comments,
	AddTag
} from '../'

export default function PostScreen({
	post
}) {

	return (
		<SimpleGrid columns={[1, null, 2]} spacingX="40px" spacingY="20px">
			<Box maxH="lg" maxW="sm" borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden">
				<Image src={logo} alt={post.user.name} w="100%" />

				<Box p="6">
					<Flex d="flex" alignItems="baseline">
						<Avatar w="25px" h="25px" src={'https://i.pravatar.cc/300'} /> <Text px="1">
							{post.user.name}
						</Text>
						<Text fontSize="10px" bg="red.100" color="black" rounded="lg" px="1">{moment(post.created_at).local().startOf('seconds').fromNow()}
						</Text>
					</Flex>
					<Box d="flex" alignItems="baseline" spacing="2">
						{post.tags.map((tag, index) => (
							<Badge key={tag.id} borderRadius="full" mr="1" px="1" bg="#FF0080">
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
					<CommentsCount id={post.id} />
				</Box>
			</Box>
			<Box maxW="sm" borderLeft="solid 4px #7928CA" borderRadius="lg" overflow="hidden">
				<Comments post={post} />
			</Box>
		</SimpleGrid>
	)
}