import firebase from '../firebase';

export default function SetData(name_,title,des,table_){
    const ref = firebase.firestore().collection("pages");
    ref.doc(name_).set({Name:name_, title:title,description:des,foot:" "}).then(()=>{
        console.log("Success");
    }).catch((error)=>{
        console.error("ERROR");
    });
};


