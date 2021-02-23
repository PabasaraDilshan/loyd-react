import firebase from '../firebase'

class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.url = "URL"
        this.testfun = this.testfun.bind(this);
    }

    testfun(myResolve, myReject) {
        let x = 0;
        if(x==0){
            myResolve({
                default: this.url
            });
        }else{
            myReject("ERROR");
    }
    }
    // Starts the upload process.
    upload() {
        console.log("upload",this.loader);
        const storageRef = firebase.storage().ref('image')
    
        this.prom =  this.loader.file
          .then( (file) => {
            this.uploadTask = storageRef.child('file.png').put(file)
            

             return this.uploadTask.on('state_changed', (data) => {
            this.loader.uploadTotal = data.totalBytes;
            this.loader.uploaded = data.bytesTransferred;
            data.ref.getDownloadURL().then(durl=>{
                console.log(durl);
                this.url = durl});
            
          } )}
        );
          this.test = new Promise(this.testfun)
        console.log(this.test);
        console.log(this.prom);

        return this.prom;
        
        // Return a promise that will be resolved when the file is uploaded.
       

    }

    // Aborts the upload process.
    abort() {
        this.uploadTask.cancel()
    }

}

// ...

export default function MyCustomUploadAdapterPlugin( editor ) {
    console.log("test1");
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        console.log("test2");
        return new MyUploadAdapter( loader );
    };
}

// ...
