import React, {useState,useEffect} from 'react';
import firebase from '../firebase';
import './Institutes.css'
export default function Institutes({match:{params:{id}}}){
    console.log(id);
    const [items,setItems] = useState({});
    const [loading, setLoading] = useState(false);
    function getitems(){
        setLoading(true);
        const ref = firebase.firestore().collection('pages');
        console.log("test2");
        ref.doc(id).onSnapshot((doc)=>{
            console.log("test3");
            setItems(doc.data());
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
        <h1 className = "ins-title">{items.title}</h1>
        <p className = "ins-des">{items.description}</p>
        <p className = "ins-foot">{items.foot}</p>

        </>
    );
}