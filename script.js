function includeHTML() {
    let z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("data-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status === 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("data-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

let view = 0;

function switchView(){
    if(view){
        console.log(view)
        document.querySelectorAll(".view-1").forEach(el =>{
            el.style.display = 'none';
        })
        document.querySelectorAll(".view-0").forEach(el =>{
            el.style.display = '';
        })
        view = 0;
    }else{
        console.log("sidemenu")
        document.querySelectorAll(".view-0").forEach(el =>{
            el.style.display = 'none';
        })
        document.querySelectorAll(".view-1").forEach(el =>{
            el.style.display = '';
        })
        view = 1;
        if(window.innerWidth < 1024){
            setupDisplaySections();
        }else{
            revertDisplaySections();
        }

    }
}

function setupDisplaySections(){
    if(document.querySelector(".section-title").hasAttribute("href")){
        document.querySelectorAll(".section-title").forEach(el =>{
            el.removeAttribute("href");
            el.classList.remove("underline");
            el.nextElementSibling.style.display = "";
            el.onclick = function (){
                let next = el.nextElementSibling;
                if(next.style.display === "" || next.style.display === "flex"){
                    next.style.display = "grid";
                }else{
                    next.style.display = "";
                }
            }
        })
    }
}

function revertDisplaySections(){
    if(!document.querySelector(".section-title").hasAttribute("href")){
        document.querySelectorAll(".section-title").forEach(el =>{
            el.href = "#";
            el.classList.add("underline");
            el.nextElementSibling.style.display="flex";
            el.onclick = "";
        })
    }


}

