import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MyCustomUploadAdapterPlugin from './MyCustomUploadAdapterPlugin';
import firebase from "../firebase";
import './Admin.css';
import DOMPurify from 'dompurify';


class Admin extends Component {
    
    constructor(){
        super();
        this.state = {name_ : "",data_: "Data"};
        this.handleFetch = this.handleFetch.bind(this);
        
    }
    editor = null;
    setName(n){
        
        this.setState({name_: n}); 
        
    };
    setData(d){
        this.setState({data_: d}); 

    }

    handleFetch(e){
        console.log(this.state.name_)
        e.preventDefault();
        const ref = firebase.firestore().collection("pages");
        ref.doc(this.state.name_).get().then((doc)=>{
         if(doc.exists){

            this.setData(doc.data().data);
        }else{
        this.setData("No data");
        }
    });
      }
    


    render() {
        return (
            <div className="Admin">
                <div className = "form-editor">
          <form  onSubmit={(event)=>{
            event.preventDefault();

            const ref = firebase.firestore().collection("pages");
            ref.doc(this.state.name_).set({Name:this.state.name_, data:this.state.data_}).then(()=>{
               console.log("Success");
                 }).catch((error)=>{
                   console.error("ERROR",error);
               });




          }}>
              <h2>Data Adder</h2>
          <label>Name:</label>
          <input type = "text" value={this.state.name_} onChange = {(event)=>{
            this.setName(event.target.value);
          }}></input>
          <input type = "submit" value="Submit"></input>
          <button onClick = {this.handleFetch}>Fetch from Database</button>

                <CKEditor
                    onReady={ editor => {

                       this.imgadapter =  MyCustomUploadAdapterPlugin(editor);

                      editor.config._config['extraPlugins'] = [ MyCustomUploadAdapterPlugin ]
                        console.log( 'Editor is ready to use!' );

                        // Insert the toolbar before the editable area.
                        console.log("hello")
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    } }
                
                    onError={ ( { willEditorRestart } ) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if ( willEditorRestart ) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    } }
                    onChange={ ( event, editor ) => 
                        {
                            this.setData(editor.getData())
                            
                        }}
                    editor={ DecoupledEditor }
                    data={this.state.data_}
                />
            </form> </div> 
                    <div className = "preview"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.data_)}}>
                        
                        
                        
                        </div>  
                </div>
        );
    }
}

export default Admin;