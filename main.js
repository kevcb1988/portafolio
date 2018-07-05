// Service Worker

if('serviceWorker' in navigator){
  console.log("El service worker funciona");

  navigator.serviceWorker.register('./serviceWorker.js')
                         .then( respuesta => console.log('serviceWorker cargado correctamente', respuesta))
                         .catch( error => console.log('serviceWorker no se ha cargado correctamente', error));
}else{
  console.log("El service worker NO funciona");
}
