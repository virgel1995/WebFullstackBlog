import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
	components: {
	},
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
})

export const websiteUrl =  "https://WebFullstackBlog.virgel1995.repl.co";
export const githubBaseUrl = "https://github.com/virgel1995/WebFullstackBlog";
import logo from "../assets/img/developer.gif"
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
export const removeToken = () => localStorage.removeItem("token")

export const setToken = (token) => localStorage.setItem("token", token)
// rigster code 
export const setCode =  (code) => localStorage.setItem("userCode", code)
export const getCode =  () => localStorage.getItem("userCode")
export const removeCode = () => localStorage.removeItem("userCode")


export const setLoged = (value) => localStorage.setItem("isLogedin", value)
export const getLoged = () => localStorage.getItem("isLogedin")


export const removeLoged = () => localStorage.removeItem("isLogedin")

export const setAdmin = (value) => localStorage.setItem("isAdmin", value)
export const getAdmin = () => localStorage.getItem("isAdmin")


export const removeAdmin = () => localStorage.removeItem("isAdmin")

export const waiter = async (time) => {
	await new Promise(resolve => setTimeout(resolve, time));
}

export const calcDate = (date1, date2) => {
 
    //new date instance
    const dt_date1 = new Date(date1);
    const dt_date2 = new Date(date2);

    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();

    let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    //Set up custom text
    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];

    //Convert to days and sum together
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
    const total_secs = total_days * 24 * 60 * 60;
    const total_mins = total_days * 24 * 60;
    const total_hours = total_days * 24;
    const total_weeks = ( total_days >= 7 ) ? total_days / 7 : 0;

    //display result with custom text
    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : '');

    //return the result
    return {
        "total_days": Math.round(total_days),
        "total_weeks": Math.round(total_weeks),
        "total_hours" : Math.round(total_hours),
        "total_minutes" : Math.round(total_mins),
        "total_seconds": Math.round(total_secs),
        "result": result.trim()
    }

}

export * from "./Api";

export const Suggest = [
	"JavaScript",
	'Php' ,
	"C#",
	"C++",
	"Payton",
	"Flask",
	"Django",
	'Nodejs',
	'Laravel' ,
  'React',
	'Vue',
	"Angular",
	"Redux",
	"Redux/toolkit",
	"Vuetx",
	"Svlite",
	"Expressjs",
	"Koa.js",
	"Socket.io",
  "MySQL",
	"MongoDb",
  "Mongoose",
	"Sql",
	"NoSql",	
	"Typeorm",
  "Oracle"
   ]
