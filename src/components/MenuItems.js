import firebase from './firebase';
const ref = firebase.firestore().collection('pages');
export var MenuItems = []

ref.onSnapshot((snap)=>{
    var list = [];
    snap.forEach((doc)=>{
        
        var ele = {};
        ele['title'] = doc.data()['Name'];
        ele['path']  = '/institutes'+'/' + doc.id;
        ele['cName'] = 'dropdown-link';
        list.push(ele);
    });
    MenuItems = list;
}

);



