




firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var jk =new URL(location.href).searchParams.get('repo');
if(jk){
  getRepoFiles(new URL(location.href).searchParams.get('repo'))
  
}else{
  document.getElementById("no-repo-shadow").style.display="flex"
}
    


      document.querySelector(".main--editor").style.display = "block";
      
      init()

      var element = document.querySelector('.monaco-editor');
      if (typeof (element) != 'undefined' && element != null) {
        //  window  editor Exists.
        window.onresize = function () {
          editor.layout();
        };

      }
 

    

    
  if (user !== null) {
    user.providerData.forEach((profile) => {

     
      document.getElementById("user-image-editor").src = profile.photoURL;


      

  








    })




  }



  }
 else {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

  }
});