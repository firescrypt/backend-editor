let repoName;
let fileName;
function getSubFolder(url, sha) {
  const parentElement = document.getElementById(sha);
  const className = "subfolder";
  const childElement = parentElement.querySelector(`.${className}`);

  // If the child element is found, hide it
  if (childElement !== null) {
    var n = childElement.style.display;
    if (n == "none") {
      childElement.style.display = "block";
    } else {
      childElement.style.display = "none";
    }
  } else {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer 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"
      }
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => displayFiles(response, sha))
      .catch((err) => console.error(err));
  }
}
function getRepoFiles(repo) {
  repoName = repo;

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer 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"
    }
  };
  fetch(`https://api.github.com/repos/${repo}/contents`, options)
    .then((response) => response.json())
    .then((response) => createTree(response, "root"))
    .catch((err) => console.error(err));
}
function createTree(data, id) {
  document.getElementById("reponame").innerHTML = repoName.split("/")[1];
  // console.log(data)
  var outputdiv = document.getElementById("output");
  var ul = document.createElement("ul");
  ul.setAttribute("id", id);
  data.forEach(function (d) {
    var li = document.createElement("li");
    li.setAttribute("id", d.sha);
    li.setAttribute("type", d.type);

    var title = document.createElement("p");

    if (d.type == "dir") {
      title.innerHTML =
        " <i class='material-icons mdc-button__icon' aria-hidden='true'> folder </i>" +
        d.name;
      title.setAttribute("onclick", `getSubFolder('${d.url}','${d.sha}');`);
    } else {
      title.innerHTML =
        " <i class='material-icons mdc-button__icon' aria-hidden='true'> insert_drive_file </i>" +
        d.name;
      title.setAttribute("onclick", `gotofile('${d.path}');`);
    }
    li.appendChild(title);
    ul.appendChild(li);
  });
  outputdiv.appendChild(ul);
  const dbRef = firebase.database().ref();
  const user = firebase.auth().currentUser;

  dbRef
    .child("files-to-add/" + user.uid + "/" + repoName)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        additionalfiles(snapshot.val());
      } else {
        console.log("nothing");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function displayFiles(data, parentid) {
  console.log(data, parentid);
  var outputdiv = document.getElementById(parentid);
  var ul = document.createElement("ul");
  ul.setAttribute("class", "subfolder");
  data.forEach(function (d) {
    var li = document.createElement("li");
    li.setAttribute("id", d.sha);

    var title = document.createElement("p");

    if (d.type == "dir") {
      title.innerHTML =
        " <i class='material-icons mdc-button__icon' aria-hidden='true'> folder </i>" +
        d.name;
      title.setAttribute("onclick", `getSubFolder('${d.url}','${d.sha}');`);
    } else {
      title.innerHTML =
        " <i class='material-icons mdc-button__icon' aria-hidden='true'> insert_drive_file </i>" +
        d.name;
      title.setAttribute("onclick", `gotofile('${d.path}');`);
    }
    li.appendChild(title);
    ul.appendChild(li);
  });

  outputdiv.appendChild(ul);
}

function gotofile(path) {
  fileName = path;
  const user = firebase.auth().currentUser;
  const dbRef = firebase.database().ref();
  dbRef
    .child(user.uid)
    .child(repoName)
    .child(btoa(path))
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        window.editor.getModel().setValue(snapshot.val().value);
      } else {
        const options = { method: "GET" };

        fetch(
          "https://api.github.com/repos/" + repoName + "/contents/" + path,
          options
        )
          .then((response) => response.json())
          .then((response) =>
            window.editor.getModel().setValue(atob(response.content))
          )
          .catch((err) => console.error(err));
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function getrepos() {
  document.getElementById("search-repo-contents").innerHTML = "";
  var m = document.getElementById("ghuser").value;
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer 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"
    }
  };

  fetch(`https://api.github.com/users/${m}/repos`, options)
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        document.getElementById(
          "search-repo-contents"
        ).innerHTML += `<div class="repo-info" onclick="k('${m}/${data[i].name}')"><h5>${data[i].name}</h5><p>${data[i].description}</p></div>`;
      }
    })
    .catch((err) => console.error(err));
}
function k(repo) {
  window.location.replace("https://nn754t.csb.app/?repo=" + repo);
}
function additionalfiles(obj) {
  Object.keys(obj).forEach(function (d) {
    console.log(obj[d].file);
    var name = obj[d].file;
    document.getElementById(
      "root"
    ).innerHTML += `<li id="newly-added-file-${name}" type="file"><p onclick="gotofile('${name}');"> <i class="material-icons mdc-button__icon" aria-hidden="true"> insert_drive_file </i>${name}</p></li>`;
  });
}
