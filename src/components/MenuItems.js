import firebase from './firebase';
const ref = firebase.firestore().collection('pages');
export const MenuItems = []

ref.onSnapshot((snap)=>{
    snap.forEach((doc)=>{
        var ele = {};
        ele['title'] = doc.data()['Name'];
        ele['path']  = '/institutes'+'/' + doc.id;
        ele['cName'] = 'dropdown-link';
        MenuItems.push(ele);
    });
}

);



