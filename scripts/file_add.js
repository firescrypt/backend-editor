function addfile(){
  const user = firebase.auth().currentUser;
  var name = prompt("File Name");
  db.ref("files-to-add/"+user.uid+"/"+repoName).push({
    file:name,
    type:"file"
  })
  db.ref(user.uid+"/"+repoName+"/"+btoa(name)).set({
    filepath:name,
    value:""
  })
  document.getElementById("root").innerHTML += `<li id="newly-added-file-${name}" type="file"><p onclick="gotofile('${name}');"> <i class="material-icons mdc-button__icon" aria-hidden="true"> insert_drive_file </i>${name}</p></li>`
}