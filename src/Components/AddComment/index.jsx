import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom"
import { 
	Textarea ,
	Button ,
	Box,
	useToast
} from '@chakra-ui/react'
import { FiNavigation } from "react-icons/fi"
import { createComment } from "@/Config"

export default function AddComment(props) {
	const toast = useToast()
	const navigate = useNavigate()
let [comment, setComment] = useState('')
let [rows , setRows] = useState(1)
let [rounded , setRounded] = useState("full")
	
	  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setComment(inputValue)
		if (inputValue === "") {
					setRows(1); 
			   setRounded("full")
		} else {
					setRows(4); 
setRounded("md")

		}

  }

const submitHandler = async (e) => {
    e.preventDefault();

    try {
		if (comment === "") {
				toast({
  title: "Sorry",
  description: "Sorry but You Cant Send Empty Comment",
  status: "error",
  duration: 3000,
  isClosable: true,
    })
		}
			else{
await createComment(props.id, comment).then(()=>{
	setComment('')
	setRows(1); 
	setRounded("full")
	toast({
  title: "Added Comment",
  description: `Comment Sent Successfully `,
  status: "success",
  duration: 3000,
  isClosable: true,
                  })

})
			}
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
		<Box as="form"         position="relative" onSubmit={submitHandler}>
      <Textarea
        value={comment}
        onChange={handleInputChange}
        placeholder='Add Comment'
        size='md'
				borderRadius='full'
				rounded={rounded}
				rows={rows}
      />
			<Button           position="absolute"
				type="submit"
          top={"0"}
					right= {"0"} borderRadius='full'
				zIndex="99999"
				rounded={rounded}
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}> <FiNavigation /></Button>
			</Box>
    </>
  )
}