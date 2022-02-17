import { Fragment } from "react"
import { useParams,Route, Link,useRouteMatch } from "react-router-dom"
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"
import { useEffect } from "react/cjs/react.development"
import LoadingSpinner from "../components/UI/LoadingSpinner"

//red 9 ili vaka ili dynamic path={`/quotes/${params.quoteId}/comment`}
// const Nikola_Products=[
//     {id:'n1',author:'Nikola',text:'Learning React is fun'},
//     {id:'n2',author:'Kolce',text:'Learning React is veru fun'}
// ]
const QuoteDetails = () => {
    const params = useParams();
    const match = useRouteMatch();
   // console.log(match) match da vidime deka e objekt i dole vo linkot da go kristime za pokratno da bide
    // const quote = Nikola_Products.find((quote) => quote.id === params.quoteId)
    // if(!quote){
    //     return <p>No Quote found</p>
    // }
    const{sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true)
    const {quoteId} = params
    useEffect (()=>{
        sendRequest(quoteId)
    },[sendRequest,quoteId])

    if(status === 'pending'){
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }
    if(error){
        return(
            <div className='centered'>
                {error}
            </div>
        )
    }
    if(!loadedQuote.text){
        return (
            <p>No Quote found</p>
        )
    }
    return ( 
    <Fragment>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
        <Route path={`${match.path}`} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`${match.url}/comment`}>Load Comment</Link>
            </div>
        </Route>
        <Route path={`${match.path}/comment`}>
            <Comments />
        </Route>
    </Fragment>
    )

}
export default QuoteDetails