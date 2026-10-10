// Keep section navigation and temporary panels in the browser's native history.
// Android's Back button then dismisses the current panel before leaving a section.
export function createNavigation({history,location,target,onChange,standalone=()=>false,confirmExit=()=>true}){
 let started=false,lastPage='dashboard';
 const state=(page,overlay=null)=>({sgNavigation:true,page,overlay});
 const url=page=>location.pathname+location.search+(page?'#'+page:'');
 const current=()=>history.state?.sgNavigation?history.state:null;
 function start(page){lastPage=page||'dashboard';if(started){replace(lastPage);return;}started=true;
  if(standalone()){history.replaceState({...state(lastPage),sgBase:true},'',url(lastPage));history.pushState(state(lastPage),'',url(lastPage));}
  else history.replaceState(state(lastPage),'',url(lastPage));
 }
 function replace(page){lastPage=page;history.replaceState(state(page),'',url(page));}
 function go(page){if(!started)start(page);const previous=current();if(previous?.page===page&&!previous.overlay)return;
  lastPage=page;history[previous?.overlay?'replaceState':'pushState'](state(page),'',url(page));
 }
 function openOverlay(overlay){if(!started)return;const previous=current();history[previous?.overlay?'replaceState':'pushState'](state(lastPage,overlay),'',url(lastPage));}
 function closeOverlay(overlay){if(current()?.overlay===overlay)history.back();}
 function changed(event){if(!started)return;let next=current();
  if(next?.sgBase){if(confirmExit()){started=false;history.back();return;}next=state(lastPage);history.pushState(next,'',url(lastPage));}
  // Manual URLs still go through the existing module permission guard in render().
  const page=location.hash.slice(1)||'dashboard';
  if(event.type==='hashchange'&&next?.page===page)return;
  lastPage=page;onChange(page,next?.overlay||null);
 }
 target.addEventListener('popstate',changed);target.addEventListener('hashchange',changed);
 return {start,replace,go,openOverlay,closeOverlay,overlay:()=>current()?.overlay||null};
}
