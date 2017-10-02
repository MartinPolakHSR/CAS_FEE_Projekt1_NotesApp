function creatNewNote(){
    var titels = JSON.parse(sessionStorage.getItem("titels"));
    titels.push(document.getElementById("title").value);
    sessionStorage.setItem("titels", JSON.stringify(titels));
    window.location.replace("index.html");
};