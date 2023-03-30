
import { WithContext as ReactTags } from 'react-tag-input';
import { Suggest, tagAdd } from "../../Config"

import {
 Button,
  useToast,
	Flex
} from '@chakra-ui/react';

import { 
	FiNavigation,
	FiFilePlus 
} from "react-icons/fi"
	import { useState } from "react"
const suggestions = Suggest.map((sug) => {
   return {
      id: sug,
      text: sug,
   };
});
const KeyCodes = {
   comma: 188,
   enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AddTag({
	id
}){
const [tags, setTags] = useState([]);

   const handleDelete = (i) => {
   setTags(tags.filter((tag, index) => index !== i));
};
const handleAddition = (tag) => {
   setTags([...tags, tag]);
};
const handleDrag = (tag, currPos, newPos) => {
   const newTags = tags.slice();
   newTags.splice(currPos, 1);
   newTags.splice(newPos, 0, tag);
   // re-render
   setTags(newTags);
};
const handleTagClick = (index) => {
   console.log('The tag at index ' + index + ' was clicked');
};

	const handleSubmit = async () =>{
		
		tags.map((tag) =>{
tagAdd(id, tag.text).then(({ data }) =>{
	console.log(data)
}).catch((e) =>{
console.log(e)
})
})
	}
return (
   <>
<Flex>
 <ReactTags
tags={tags}
suggestions={suggestions}
delimiters={delimiters}
handleDelete={handleDelete}
handleAddition={handleAddition}
handleDrag={handleDrag}
handleTagClick={handleTagClick}
inputFieldPosition="bottom"
  autocomplete
editable
            />
	      <Button onClick={handleSubmit} 
      borderRadius='full'
					rounded="full"
      bgGradient='linear(to-l, #7928CA, #FF0080)'
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}>
        <FiNavigation />
      </Button>
	</Flex>
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