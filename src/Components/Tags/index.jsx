import {
    Badge,
    Box,
    useToast,
    FormLabel,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverArrow,
    Stack,
    InputGroup,
    InputRightAddon,
    Flex,
} from '@chakra-ui/react';

import {
    FiRepeat
} from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { updateTag } from "@/Store/slice/posts";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Tags({
    tags,
    post
}) {
    const toast = useToast();
    const [text, setText] = useState('')
    const isAdmin = useSelector(state => state.auth.isAdmin)

    const [id, setId] = useState('')
    const dispath = useDispatch()
    const location = useLocation()
    const submitHandler = async (e) => {
        e.preventDefault()
        if (text !== '') {
            const updating = await dispath(updateTag({
                blog_id: post.id,
                text: text,
                id: id
            })).then((data) => {
                toast({
                    title: "Successfully Updated Tag",
                    description: `Tag ${text} Is Updated`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
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
                description: "You Can't Update Tag To Be Empty",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };
    return (
        <>
            <Box d="flex" alignItems="center" spacing="2">
                {tags.map((tag, index) => (


                    (() => {
                        if (location.pathname === "/home" && isAdmin) {
                            return (
                                <Popover isLazy key={tag.id}>
                                    <PopoverTrigger >
                                        <Badge onClick={() => setText(tag.name)} cursor={'pointer'} borderRadius="full" borderLeft="solid 4px #7928CA"
                                            borderRight="solid 4px #7928CA" mr="1" px="1" bg="#FF0080">
                                            {tag.name}
                                        </Badge>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverHeader fontWeight='semibold'>Update Tag</PopoverHeader>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            {/* updating */}
                                            <Box as="form" >
                                                {/** Form Tag */}

                                                <Stack spacing={4}>
                                                    <FormLabel> {text ?? tag.name}</FormLabel>
                                                    <InputGroup >
                                                        <Input value={text ?? tag.name}
                                                            onChange={(e) => setText(e.target.value)}
                                                            onClick={(e) => setId(tag.id)}
                                                            isRequired />
                                                        <InputRightAddon alignItems={'center'} onClick={submitHandler}
                                                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                                                            _hover={{
                                                                bgGradient: 'linear(to-r, red.500, yellow.500)',
                                                            }} >
                                                            <FiRepeat />
                                                        </InputRightAddon>
                                                    </InputGroup>
                                                </Stack>
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )
                        } else {
                            return (
                                <Badge key={tag.id} borderRadius="full" borderLeft="solid 4px #7928CA"
                                    borderRight="solid 4px #7928CA" mr="1" px="1" bg="#FF0080">
                                    {tag.name}
                                </Badge>
                            )
                        }
                    })()
                ))}
            </Box >

        </>
    )
}