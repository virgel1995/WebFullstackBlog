import { useState , useEffect } from "react"
import { getPosts, getLoged, getAdmin } from "../../Config"
import { Link } from "react-router-dom"
	
	import { 
	      Box,
				Badge,
				Image,
				Avatar,
				SimpleGrid ,
	      Text,
        Flex,
		Button
			 } from "@chakra-ui/react"
import { Loader} from "../../Ui"
import logo from "../../assets/img/developer.gif"
import moment from 'moment';
import { 
	AddComment,
	CommentsCount 
} from '../'

import { FiSettings } from "react-icons/fi";

export default function Posts(props) {
const [posts , setPosts ] = useState([]);
const [loading, setLoading] = useState(true);
 const [loged , setLoged ] = useState(false)
const [isAdmin, setIsAdmin ] = useState(false)
	
useEffect(() =>{

		if (getLoged() === "true") {
			setLoged(true)
		}
	if (getAdmin() === "true") {
		setIsAdmin(true)
	}
getPosts().then(({ data }) => {
 //   console.log(data.data);
    setPosts(data.data);
	  setLoading(false);
  }).catch((e) => {
console.log({
	message: "Error Posts",
	error: e.message
})
            })
return () => {
	console.log("getPosts Done ✅")
}
}, [loged])


 if (!loading) {
return (
	<>
		<SimpleGrid columns={[1, null, 2]} spacingX="40px" spacingY="20px">
		{posts.map((post)=>(
				


	<Box key={post.id} maxW="sm" borderLeft= "solid 4px #7928CA"  borderRadius="lg" overflow="hidden">

		<Image src={logo} alt={post.user.name} w="100%" borderBottom= "solid 4px #7928CA"/>

      <Box p="6">
        <Flex d="flex" alignItems="center">
				<Avatar w="25px" h="25px" src={'https://i.pravatar.cc/300'} /> <Text px="1">	
					{post.user.name}
				</Text>
	<Text fontSize="10px" bg="red.100" color="black" rounded="lg" px="1">{moment(post.created_at).local().startOf('seconds').fromNow()}
	</Text>
		{(()=>{
		if (isAdmin) {
			return (
					<Button ml="5" borderRadius="full" borderLeft= "solid 4px #7928CA" borderRight= "solid 4px #7928CA"  bg="#FF0080" rounded="full" maxW="10" >
		<Link key={post.id}  
		to="/post/edit"
		state= {post}  >
			<FiSettings />
		</Link>			
</Button>
		)
		}
		})()}
				</Flex>
			
        <Box d="flex" alignItems="center" spacing="2">
					{post.tags.map((tag, index) =>(
          <Badge key={tag.id} borderRadius="full" borderLeft= "solid 4px #7928CA" borderRight= "solid 4px #7928CA"  mr="1" px="1" bg="#FF0080">
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
	width:"25%",
	background: "#FF0080"
}}/>
        <Box>
          {post.text.slice(0, 50)}
         
        </Box>
				<hr style={{
	width:"50%",
	background: "#FF0080",
}}/>

<Flex my="1">

<CommentsCount id={post.id} />

	<Link key={post.id}  
		to="/post/view"
		state= {post} >
		<Box ml="1" px="1" bg="#FF0080" borderRight= "solid 4px #7928CA"  borderRadius="lg" >
			View Comments
			</Box></Link>
</Flex>
						
		{loged && (
<AddComment id ={post.id} />
         )}

      </Box>
    </Box>


	 ))}  
		</SimpleGrid>

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

