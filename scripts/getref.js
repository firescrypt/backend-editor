// function getExampleRef() {
//   var ref = firebase.database().ref();

//     var hash = window.location.hash.replace(/#/g, '');



//   if (hash) {
//     ref = ref.child(hash);
//  const user = firebase.auth().currentUser;
// if (user !== null) {
//   user.providerData.forEach((profile) => {

//     document.getElementById("user-image-editor").src=profile.photoURL;
    


//   })}

// }
//  else {

//  const user = firebase.auth().currentUser;
// if (user !== null) {
//   user.providerData.forEach((profile) => {
//     ref = ref.push(); // generate unique location.
//     var x = ref.key;
    
//     window.location = window.location + '#' + x;


//   })}




//   }
  
//   // if (typeof console !== 'undefined') {
//   //   console.log('Firebase data: ', ref.toString());
//   // }
//   return ref;
// }