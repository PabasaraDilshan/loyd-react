import React,{useState} from 'react';
import './Admin.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/src/decouplededitor';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import firebase from '../firebase';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';




export default function Admin(){
  const [name_,setName] = useState("");
  const [data_,setData] = useState("Enter Data");
  function handleFetch(e){
    e.preventDefault();
    const ref = firebase.firestore().collection("pages");
    ref.doc(name_).get().then((doc)=>{
      if(doc.exists && name_!=""){
          setData(doc.data().data);
      }else{
        setData("No data");
      }
    });
  }

    return(<>
    <div className="set-data">
          <h2>Data Adder</h2>
          <form onSubmit={(event)=>{
            event.preventDefault();
            console.log(data_);

            const ref = firebase.firestore().collection("pages");
            ref.doc(name_).set({Name:name_, data:data_}).then(()=>{
               console.log("Success");
                 }).catch((error)=>{
                   console.error("ERROR",error);
               });




          }}>
          <label>Name:</label>
          <input type = "text" value={name_} onChange = {(event)=>{
            setName(event.target.value);
          }}></input>
          <input type = "submit" value="Submit"></input>
          <button onClick = {handleFetch}>Fetch from Database</button>
          <div className="document-editor">
            <div className="document-editor__toolbar"></div>
            <div className="document-editor__editable-container">
            <CKEditor
            
            
              onReady={ editor => {
                  console.log( 'Editor is ready to use!', editor );
                  window.editor = editor;
                  
                  

                  // Add these two lines to properly position the toolbar
                  const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
                  toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                 
              } }
              onChange={ ( event, editor ) => 


                setData(editor.getData()) }
              editor={ ClassicEditor }
              data={data_}
            />
            </div>
          </div>
          </form>
        </div>
        
    </>

        
    );
}