import { 
	AspectRatio,
  Image
} from "@chakra-ui/react"

export function VideoView(params) {

return (
<>
	<AspectRatio maxW='560px' ratio={1}>
  <iframe
    title='naruto'
    src='https://www.youtube.com/embed/QhBnZ6NPOY0'
    allowFullScreen
  />
</AspectRatio>
</>
)

	
}


export function ImageView(params) {

return (
<>
<AspectRatio maxW='400px' ratio={4 / 3}>
  <Image src='https://bit.ly/naruto-sage' alt='naruto' objectFit='cover' />
</AspectRatio>
</>
)

	
}