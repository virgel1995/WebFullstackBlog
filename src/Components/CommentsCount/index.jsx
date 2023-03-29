import { useState , useEffect } from "react"
import { 
	Flex,
  Text,
} from '@chakra-ui/react'
import { VscComment } from "react-icons/vsc";


import { getComments } from "@/Config"
export default function CommentsCount(props) {
	
const [conts, setConts] = useState([]);
	
	useEffect(()=>{
	getComments(props.id).then(({ data}) =>{
setConts(data.data)
//console.log(data.data)
})
		return () => {
	console.log("getcomments Count Done ✅")
		}
	}, [props.id,conts])

return (
	<>
	<Flex maxW="20" ml="1" alignItems="center" px="1" bg="#FF0080" borderLeft= "solid 4px #7928CA"  borderRadius="lg">
		<VscComment />
		<Text px="1">
		{conts.length ?? 0}
</Text>
	</Flex>
	</>
)

}