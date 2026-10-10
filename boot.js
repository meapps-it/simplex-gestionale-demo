const root=document.getElementById('app');
(async()=>{
  try{
    await import('./src/app.js?v=20261006-2015');
  }catch(e){
    console.error(e);
    if(root) root.innerHTML='<div style="padding:24px;font-family:system-ui,sans-serif;color:#7a1d1d"><h2>Errore di avvio</h2><p>'+String(e&&e.message||e).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))+'</p><p style="color:#555">Versione diagnostica 20261006-2015</p></div>';
  }
})();
