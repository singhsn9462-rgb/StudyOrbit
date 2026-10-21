
if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(error=>console.error("StudyOrbital service worker registration failed:",error));});}
