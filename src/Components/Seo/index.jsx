import {Helmet} from "react-helmet-async";
 
import { siteConfig , websiteUrl} from "../../Config";

export default function Seo (){
	
  const defaultSeo = siteConfig.seo;
  const meta = { ...defaultSeo };
  const image = meta.openGraph?.image?.url
//	console.log(image)

const path =  window.location.pathname;
	return (
		<>
		<Helmet>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link rel="canonical" href={`${websiteUrl}${path}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:site_name" content={meta.openGraph?.siteName} />
      <meta property="og:type" content={meta.openGraph?.type} />
      <meta property="og:url" content={`${websiteUrl}${path}`} />
      <meta property="og:image" content={image} />
      <meta
        property="og:image:width"
        content={meta.openGraph?.image?.width?.toString()}
      />
      <meta
        property="og:image:height"
        content={meta.openGraph?.image?.height?.toString()}
      />
      <meta property="og:image:alt" content={meta.openGraph?.image?.alt} />
      <meta property="og:locale" content={meta.openGraph?.locale} />
      <meta property="og:site_name" content={meta.openGraph?.siteName} />
      <meta name="twitter:card" content={meta.twitter?.cardType} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:site" content={meta.twitter?.site} />
      <meta name="twitter:image" content={meta.twitter?.image?.url} />
      <meta name="twitter:image:alt" content={meta.twitter?.image?.alt} />
    </Helmet>
			</>
	)
				}