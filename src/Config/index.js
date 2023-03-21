export const websiteUrl =  "https://WebFullstackBlog.virgel1995.repl.co";
export const githubBaseUrl = "https://github.com/virgel1995/WebFullstackBlog";
import logo from "@/Assets/img/developer.gif"
export const siteConfig = {
  repo: {
    url: githubBaseUrl,
    editUrl: `${githubBaseUrl}/edit/main/content`,
    blobUrl: `${githubBaseUrl}/blob/main`,
  },
  author: {
    name: "virus24",
    github: "virgel1995",
    twitter: "@virus24",
    email: "kazouya25@gmail.com",
  },
  seo: {
    title: "Virus-Blog",
    description: "Blog for Whatsapp group for web development",
    openGraph: {
      url: websiteUrl,
      type: "website",
      image: {
        url: logo,
        width: 1240,
        height: 1080,
        alt: "Blog for Whatsapp group for web development",
        type: "image/gif",
      },
      locale: "en_US",
      siteName: "Virus-Blog",
    },
    twitter: {
      site: "@virus24",
      handle: "@virus24",
      cardType: "summary_large_image",
      image: {
        url: logo,
        width: 1012,
        height: 506,
        alt: "Blog for Whatsapp group for web development",
        type: "image/gif",
      },
    },
    robots: "index, follow",
  },
};

export const API = "https://webfull-stack-courses.herokuapp.com"

//user token
export const getToken = () => localStorage.getItem("token")
export const setToken = (token) => localStorage.setItem("token", token)
// rigster code 
export const setCode =  (code) => localStorage.setItem("userCode", code)
export const getCode =  () => localStorage.getItem("userCode")
export const removeCode = () => localStorage.removeItem("userCode")

//user data
export const setUser = (user) => localStorage.setItem("user", user)
export const getUser = () => localStorage.setItem("user")

