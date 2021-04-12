function carica(){
    const griglia_film=document.querySelectorAll(".film");
    for(let i=0; i<titoli.length; i++){
        const titolo=document.createElement("h2");
        titolo.textContent=titoli[i];
        griglia_film[i].appendChild(titolo);
        const immagine=document.createElement("img");
        immagine.src=immagini[i];
        griglia_film[i].appendChild(immagine);
        const informazione=document.createElement("p");
        informazione.textContent=info[i];
        griglia_film[i].appendChild(informazione);
        informazione.classList.add('hidden');
        const mostra_info=document.createElement("h3");
        mostra_info.textContent="Mostra descrizione";
        griglia_film[i].appendChild(mostra_info);
        const aggiungi=document.createElement("button");
        aggiungi.textContent="Aggiungi ai preferiti";
        griglia_film[i].appendChild(aggiungi);
    }
    const contenuto=document.querySelectorAll("#griglia h3");
    for(const cont of contenuto){
        cont.addEventListener("click",mostra);
    }
    const preferiti=document.querySelectorAll("#griglia button");
    for(const pref of preferiti){
        pref.addEventListener("click",aggiungi_preferiti);
    }
}

function mostra(event){
    const description=event.currentTarget.parentNode.querySelector('p');
    const testo=event.currentTarget.parentNode.querySelector('h3');
    if(testo.textContent === "Mostra descrizione"){
        description.classList.remove('hidden');
        testo.textContent = "Nascondi descrizione";
    }
    else{
        description.classList.add('hidden');
        testo.textContent = "Mostra descrizione";
    }
}

function aggiungi_preferiti(event){
    const titolo = event.currentTarget.parentNode.querySelector("h2");
    const immagine = event.currentTarget.parentNode.querySelector("img");
    const tasto = event.currentTarget.parentNode.querySelector("button");
    if(tasto.textContent === "Aggiungi ai preferiti"){
        tasto.textContent="Film già inserito nei preferiti";
        const sezione_preferiti=document.querySelector("#preferiti");
        sezione_preferiti.classList.remove("hidden");
        const griglia_preferiti=document.querySelector("#favorites");
        const blocco=document.createElement("div");
        griglia_preferiti.appendChild(blocco);
        const titolo_preferiti=document.createElement("h2");
        titolo_preferiti.textContent=titolo.textContent;
        blocco.appendChild(titolo_preferiti);
        const immagine_preferiti=document.createElement("img");
        immagine_preferiti.src=immagine.src;
        blocco.appendChild(immagine_preferiti);
        const rimuovi=document.createElement("button");
        rimuovi.textContent="Rimuovi dai preferiti";
        blocco.appendChild(rimuovi);
        const togli=document.querySelectorAll("#favorites button");
        for(const tog of togli){
            tog.addEventListener("click",aggiungi_preferiti);
        }
    }
    if(tasto.textContent === "Rimuovi dai preferiti"){
        const titolo_pref=document.querySelectorAll("#griglia h2");
        for(let i=0; i<titoli.length; i++){
            if(titolo_pref[i].textContent === titolo.textContent){
                const cambio=document.querySelectorAll("#griglia button");
                cambio[i].textContent="Aggiungi ai preferiti";
                break;
            }
        }
        event.currentTarget.parentNode.remove("div");
    }
    if(!document.querySelector("#favorites div")){ 
        const sezione_preferiti=document.querySelector("#preferiti");
        sezione_preferiti.classList.add("hidden");
    }
}

function cerca(event){
    const parola=document.getElementById("cerca");
    const maiuscolo=parola.value.toUpperCase();
    const barra=document.querySelectorAll("#griglia h2");
    for(let i=0; i<titoli.length;i++){
        const testo=barra[i].textContent;
        if(testo.toUpperCase().indexOf(maiuscolo)>-1){
            barra[i].parentNode.classList.remove("hidden");
        }
        else{
            barra[i].parentNode.classList.add("hidden");
        }
    }
}

document.body.onload = carica; 
document.getElementById("cerca").addEventListener("keyup",cerca);