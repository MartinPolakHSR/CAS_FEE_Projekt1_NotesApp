var titels = sessionStorage.getItem("titels");
if( !titels )
{
    sessionStorage.setItem("titels", JSON.stringify([]));
    titels = sessionStorage.getItem("titels");
}
titels = JSON.parse(titels);

document.getElementById("title").innerHTML = titels.length == 0 ? "none" : titels.join("</br>"); //very very simple solution!