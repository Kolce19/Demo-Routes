import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm"
import{useHistory} from 'react-router-dom' 
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api"
const NewQuote = () => {
    const {sendRequest,status} = useHttp(addQuote)//sendRequest e ednakva na funkcijata addQuote od libApi so argument(dataQuote)koj doaga od QuoteForm site vrednosti od formata
    const history = useHistory();//go koristime koga funkcijata ke ja submitirame odnosno koga ke stisneme na battonot da ne prati na urlto koe sme go zapisale vo zahradite
    useEffect(() => {
        if(status === 'completed'){
            history.push('/quotes')//go koristime koga funkcijata ke ja submitirame odnosno koga ke stisneme na battonot da ne prati na urlto koe sme go zapisale vo zahradite
        }
    }, [status,history])
   
    const addQuoteHandler = (dataQoute)=>{
        sendRequest(dataQoute)//sendRequest od usehttp fukncija kajsto e ednakva, na fukncijata aqqQuote od file api,so argument dataQuote koj doaga od se od QuoteForm sto sme pratile
        //a vo sendRequest argumentov dataQuote e requestData
    }
    return <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler}/>

}
export default NewQuote