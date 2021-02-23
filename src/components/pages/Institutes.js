import React, {useState,useEffect} from 'react';
import firebase from '../firebase';
import './Institutes.css';
import DOMPurify from 'dompurify';

export default function Institutes({match:{params:{id}}}){
    console.log(id);
    const [items,setItems] = useState("");
    const [loading, setLoading] = useState(false);
    function getitems(){
        setLoading(true);
        const ref = firebase.firestore().collection('pages');
        console.log("test2");
        ref.doc(id).onSnapshot((doc)=>{
            console.log("test3");
            setItems(doc.data().data);
            setLoading(false);
        });
    }
    console.log("test4");
    useEffect(()=>{
        getitems();
    },[id]);
    if(loading){
        return(<><h1>Loading...</h1></>)
    }
    console.log("test5");
    return(
        <>
        <div className="preview" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(items)}}>

        </div>

        </>
    );
}