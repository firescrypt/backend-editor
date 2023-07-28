var db = firebase.database();
function cloudUpload(uid,path){
  db.ref(uid+"/"+repoName+"/"+btoa(path)).set({
    filepath:path,
    value:window.editor.getValue()
  })
}