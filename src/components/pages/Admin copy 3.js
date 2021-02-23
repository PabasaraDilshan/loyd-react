import React,{useState} from 'react';
import './Admin.css';
import { CKEditor,CKEditorContext } from '@ckeditor/ckeditor5-react';
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/src/decouplededitor';
import Context from '@ckeditor/ckeditor5-core/src/context';
import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import firebase from '../firebase';





export default function Admin(){
  const [name_,setName] = useState("");
  const [data_,setData] = useState("Enter Data");
  const [editor,setEditor] = useState(null)
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
            <CKEditorContext context={ Context }>
            <CKEditor
            config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
            
            onError={ ( { willEditorRestart } ) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if ( willEditorRestart ) {
                          console.log("onError")
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    } }
              onReady={ editor => {
                  console.log( 'Editor is ready to use!', editor );
                  window.editor = editor;
                  
                  

                  // Add these two lines to properly position the toolbar
                  editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                        setEditor(editor);
                 
              } }
              onChange={ ( event, editor ) => 


                setData(editor.getData()) }
              editor={ DecoupledEditor }
              data={data_}

              
            />
            </CKEditorContext>
            </div>
          </div>
          </form>
        </div>
        
    </>

        
    );
}