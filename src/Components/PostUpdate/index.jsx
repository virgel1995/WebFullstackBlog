import {useState } from "react"
import { updatePost } from "../../Config"
import {
	Box,
  Button,
  useToast,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Flex
} from '@chakra-ui/react';
import {	useNavigate } from"react-router-dom";
import { 
	FiNavigation,
	FiFilePlus 
} from "react-icons/fi"

export default function PostUpdate({
	post,
	...props
}) {
const navigate = useNavigate()
const toast = useToast();
const [title, setTitle ] = useState(post.title)
const [text, setText ] = useState(post.text)

	const submitHandler = async (e) => {
    e.preventDefault();
    try {
 await updatePost(post.id,title, text)

	toast({
  title: "Successfully Updated Post",
  description: `Post with id ${post.id} Is Updated`,
  status: "success",
  duration: 3000,
  isClosable: true,
                  })
			
     navigate('/home');
			
    } catch (err) {
			console.log(err)
	toast({
  title: "Sorry But You Faild",
  description: err.message,
  status: "error",
  duration: 3000,
  isClosable: true,
                  })
    }
  };
	
	return (
		<>
<Box as="form" onSubmit={submitHandler}>
		{/** Form Title */}
	<FormControl isRequired>
  <FormLabel>Post Title</FormLabel>
  <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
</FormControl>
		{/** Form Text */}
		
<FormControl isRequired>
  <FormLabel>Post Text</FormLabel>
 <Textarea
        value={text}
        size='sm'
        resize="horizontal"
	 onChange={(e) => setText(e.target.value)}
      />
</FormControl>
	
<Flex>
<FormControl></FormControl>
<Button type="submit"
      borderRadius='md'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}>
        <FiNavigation />
      </Button>
</Flex>
	</Box>
		</>
	)
}

