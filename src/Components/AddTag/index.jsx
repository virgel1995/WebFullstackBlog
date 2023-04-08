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
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import {
  FiHash,
  FiNavigation
} from "react-icons/fi"
import { useDispatch } from "react-redux";
import { addTag } from "@/Store/slice/posts";

export default function AddTag({
  post
}) {
  const toast = useToast();
  const [text, setText] = useState('')
  const dispath = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault()
    if (text !== '') {
      const updating = await dispath(addTag({
        id: post.id,
        text: text
      })).then((data) => {
        toast({
          title: "Successfully Created Tag",
          description: `Tag ${text} Is Created`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setText("")
      }).catch((e) => {
        toast({
          title: "An Error Eccored",
          description: e.message ?? "Error",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      })
    } else {
      toast({
        title: "An Error Eccored",
        description: "You Can't Add Empty Tag",
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
          <Button ml={'5'} rounded={'full'} p={'2'}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}><FiHash /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>add Tag</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {/* updating */}
            <Box as="form" p={'5'}>
              {/** Form Tag */}

              <Stack spacing={4}>
                <FormLabel> {text}</FormLabel>
                <InputGroup >
                  <Input value={text} onChange={(e) => setText(e.target.value)} isRequired />
                  <InputRightAddon alignItems={'center'} onClick={submitHandler}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    _hover={{
                      bgGradient: 'linear(to-r, red.500, yellow.500)',
                    }} >
                    <FiNavigation />
                  </InputRightAddon>
                </InputGroup>
              </Stack>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

