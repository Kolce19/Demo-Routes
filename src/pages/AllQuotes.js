import { useEffect } from "react"
import useHttp from "../hooks/use-http"
import {getAllQuotes} from "../lib/api"
import QuoteList from "../components/quotes/QuoteList"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import NoQuotesFound from "../components/quotes/NoQuotesFound"
// const Nikola_Products=[
//     {id:'n1',author:'Nikola',text:'Learning React is fun'},
//     {id:'n2',author:'Nikola',text:'Learning React is fun'}
// ]
const AllQuotes = () => {
    const{sendRequest,status,data:loadedQuotes,error} = useHttp(getAllQuotes,true) 
    //function getAllQuotes=transformedObject objekt kade se e objaveno from api.js >loadedQuotes < vo useReducer responseData i za taa responseData e napravena action i tie tuka gi spojuvame
    useEffect(()=>{
        sendRequest()
    },[sendRequest])

    if(status==='pending'){
        return (
            <div className='centered focused'>
                <LoadingSpinner />
            </div>
        )
    }
    if(error){
        <div className='centered focused'>{error}</div>
    }
    if(status==='completed' && (!loadedQuotes || loadedQuotes.length===0)){
        return <NoQuotesFound />
    }

    return <QuoteList quotes={loadedQuotes}/> 

}
export default AllQuotes

//loadedQuotes doaga od getAllQuotes funkcijata od lib/api koja e napravena da bide action(dvizecka) vo sendRequest funkcijata od hooks/use-http 
// getAllQuotes (transformedQuotes) from libApi > responseData from use-http.js > loadedQuotes 