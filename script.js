const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
let debut = '';
let fin = '';

// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// utiliser l'API https://www.voicerss.org/api/ pour raconter la blague 
function blague(debut, fin) {
    VoiceRSS.speech({
        key: '8636fe5001004cfaada3ebe14ea51222',
        src: `${debut} ... ${fin}`,
        hl: 'fr-fr',
        v: 'Logan',
        r: 1, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Sélectionner une blague aléatoire
function getRandomId(ids) {
    const randomIndex = Math.floor(Math.random() * ids.length);
  return randomIndex;
  }
  
// Sélectionner la catégorie de blague
function getCategorie(){
  const categories = document.getElementById('choixMenu'); // Accédez à l'élément <select>
  const selectedValue = categories.value; // Récupérez la valeur de l'option sélectionnée
  return selectedValue;
}

// Prendre une blague au hasard dans la catégorie
function filterJoke(joke, categorie){
  const result = joke.filter(joke => joke.type === categorie)
  return result;
}

// Obtenir une blague du JSON
async function getJoke() {
  fetch('blagues.json')
  .then(response => response.json())
  .then(blagues => {
    // Maintenant, 'blagues' contient le contenu du fichier JSON
    // On filtre par la catégorie choisie par User
    let categorie = getCategorie();
    let blaguesCategorized = filterJoke(blagues, categorie);
    //obtnir un array avec les IDs de la catégorie choisie
    let IdsCategorized = blaguesCategorized.map(blaguesCategorized => blaguesCategorized.id);
    let blague_idndex = getRandomId(IdsCategorized);
    debut = blaguesCategorized[blague_idndex].joke;
    fin = blaguesCategorized[blague_idndex].answer;
    blague(debut,fin);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite : ', error);
  });
}


// Appuyer sur le bouton pour charger une blague (run)
button.addEventListener('click', getJoke)===true;
