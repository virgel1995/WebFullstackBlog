


import {useState , useEffect} from "react"
import { getComments, getLoged } from "../../Config"
import { 
	useColorModeValue,
  Text,
	Box
} from '@chakra-ui/react'
import { 
	AddComment,
} from '../'


export default function Comments({
	post
}) {
const [comments, setComments ] = useState ([])
 const [loged , setLoged ] = useState(false)


	useEffect(()=>{
				if (getLoged() === "true") {
			setLoged(true)
		}

	getComments(post.id).then(({ data}) =>{
setComments(data.data)
//console.log(data.data)
}).catch((e) =>{
		console.log({
	message: "Error Comments",
	error: e.message
})
	})
		return () => {
	console.log("getAll Comments Done ✅")
}
	}, [post, comments, loged])
	return (
		<>

	{comments.map((com, index) =>(

<Box key={com.id} maxW="sm" mt="1" mx="1" borderRight= "solid 4px #7928CA" borderLeft= "solid 4px #7928CA"  borderRadius="lg" overflow="hidden" bg={useColorModeValue('#FF0080', 'red.200')}>
			<Text px="2">


{com.text}


</Text>

</Box>
			))}

		{loged === "true" && (
<AddComment id ={post.id} />
         )}
		</>
	)
}