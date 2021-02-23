import React,{useState} from 'react';
import './Admin.css';
import SetData from './SetData';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Admin(){
    var f = new File([""], "filename");
    const [name_,setName] = useState("");
    const [title,setTitle] = useState("");
    const [des,setDes] = useState("");
    const [table_,setTable] = useState([]);


    function handleNameChange(event){
        setName(event.target.value);
    }
    function handleTitleChange(event){
        setTitle(event.target.value);
    }
    function handleDesChange(event){
        setDes(event.target.value);
    }
    function handleTableChange(event){
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload=(e)=>{
            var items = e.target.result.split("\n");
            setTable([...table_,items]);
            
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        console.log(table_);
        SetData(name_,title,des,table_)
    }

    return(
        <>
        <h1>ADMIN</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input  value={name_} onChange={handleNameChange} type="text"></input>
            <br/>
            <label>Title:</label>
            <input value={title} onChange={handleTitleChange} type="text"></input>
            <br/>
            <label>Description:</label>
            <textarea value = {des} onChange={handleDesChange} ></textarea>
            <label>Table Data</label>
            <input onChange={handleTableChange} type="file"></input>
            <input type="submit" value="Submit"  ></input>

        </form>
        
        
        </>
    );
}