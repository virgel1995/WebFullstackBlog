import { useState } from "react"
import {
  Box,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import {
  FiNavigation,
   FiSettings
} from "react-icons/fi"
import { useDispatch } from "react-redux";
import { updatePostDetails } from "@/Store/slice/posts";

export default function AddTag({
  post
}) {
  const toast = useToast();
  const [title, setTitle] = useState(post.title)
  const [text, setText] = useState(post.text)
  const dispath = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault()

    const updating = await dispath(updatePostDetails({
      id: post.id,
      title: title,
      text: text
    }))
    if (updating.error) {
      toast({
        title: "Sorry But You Faild",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Successfully Updated Post",
        description: `Post with id ${post.id} Is Updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // navigate('/home');
    }
  };

  return (
    <>
      <Popover isLazy>
        <PopoverTrigger>
        <Button ml={'5'} rounded={'full'} p={'2'}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}><FiSettings /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Update Post</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {/* updating */}
            <Box as="form" onSubmit={submitHandler} p={'5'}>
              {/** Form Title */}
              <FormControl isRequired>
                <FormLabel>Post Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
              <Flex py={'1'}>
                <Button type="submit"
                  borderRadius='md' display={'block'}
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
  )
}

