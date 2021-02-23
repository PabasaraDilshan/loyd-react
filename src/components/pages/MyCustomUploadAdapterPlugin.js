import firebase from '../firebase'

class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.url = "URL"
    }

    
    // Starts the upload process.
    upload() {
        console.log("upload",this.loader);
        const storageRef = firebase.storage().ref('image')
        /*
        this.prom =  this.loader.file
          .then( (file) => {
            this.uploadTask = storageRef.child('file.png').put(file)
            

             return this.uploadTask.on('state_changed', (data) => {
            this.loader.uploadTotal = data.totalBytes;
            this.loader.uploaded = data.bytesTransferred;
            data.ref.getDownloadURL().then(durl=>{
                
                this.url = durl
                console.log(this.url)});
                
            
          } )}
        );*/
    
          this.test = this.loader.file
          .then(file=> new Promise((myresolve,myreject)=>{
              console.log(file)
            this.uploadTask = storageRef.child(file.name).put(file)
            this.uploadTask.on('state_changed', (data)=>{
                this.loader.uploadTotal = data.totalBytes;
                this.loader.uploaded = data.bytesTransferred;
                /*data.ref.getDownloadURL().then(durl=>{
                
                    myresolve({default: durl});
                });*/
            }, (error) =>{
                console.log("ERROR");
            },()=>{
                this.uploadTask.snapshot.ref.getDownloadURL().then(durl=>{
                    myresolve({'500': durl});
                });

            }


            );
            

          }));
        console.log(this.test);


        return this.test;
        
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
