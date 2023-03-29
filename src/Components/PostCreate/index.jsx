
import { useState } from "react"
import {
	Box,
  Button,
  useToast,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverCloseButton,
	PopoverBody,
	PopoverArrow,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Flex
} from '@chakra-ui/react';
import { 
	createPost
} from "@/Config";
import {	useNavigate } from"react-router-dom";
import { 
	FiNavigation,
	FiFilePlus 
} from "react-icons/fi"

export default function PostCreate(){
	const navigate = useNavigate()
	const toast = useToast();
 
const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');


const submitHandler = async (e) => {
    e.preventDefault();
    try {
 await createPost(title, desc)

	toast({
  title: "Successfully Created Post",
  description: `Post ${title} Is Created`,
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
	<Popover isLazy>
  <PopoverTrigger>
    <Button borderRadius='md'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}><FiFilePlus /></Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader fontWeight='semibold'>Create Post</PopoverHeader>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody>
<Box as="form" onSubmit={submitHandler}>
		{/** Form Title */}
	<FormControl isRequired>
  <FormLabel>Post Title</FormLabel>
  <Input placeholder='New Post' onChange={(e) => setTitle(e.target.value)}/>
</FormControl>
		{/** Form Text */}
		
<FormControl isRequired>
  <FormLabel>Post Text</FormLabel>
 <Textarea
        placeholder='
			Post Text'
        size='sm'
        resize="horizontal"
	 onChange={(e) => setDesc(e.target.value)}
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
    </PopoverBody>
  </PopoverContent>
</Popover>
</>
  );
}


/** 

      <Button onClick={""} 
      borderRadius='md'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}>
        submit!
      </Button>
*/