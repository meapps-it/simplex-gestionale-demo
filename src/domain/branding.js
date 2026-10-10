import './tenant-config.js';
import {capabilities} from './capabilities.js';
const T=globalThis.SimplexTenants;
const vars=['--tenant-primary','--tenant-on-primary','--tenant-secondary','--tenant-on-secondary','--tenant-accent','--tenant-on-accent','--tenant-bg','--tenant-ink','--tenant-muted','--green'];
let manifestUrl='',signature='';
export function customerBranding(customer,mode='cloud'){
 const cfg=mode==='demo'?{}:customer?.config||{};
 const resolved=T.resolve({...(!Object.hasOwn(cfg,'branding')&&cfg.color?{primary_color:cfg.color}:{}),...(cfg.branding||{}),...(cfg.logo_url?{logo_url:cfg.logo_url}:{})},capabilities);if(Object.hasOwn(cfg,'logo_url')&&!cfg.logo_url)delete resolved.logo_url;return resolved;
}
export function applyBranding(customer,mode='cloud'){
 const b=customerBranding(customer,mode),root=document.documentElement,cfg=mode==='demo'?{}:customer?.config||{},custom=cfg.branding||{},hasColors=T.colorKeys.some(k=>custom[k]);
 for(const key of vars)root.style.removeProperty(key);
 delete root.dataset.tenantTheme;delete root.dataset.tenantLayout;
 if(hasColors){root.dataset.tenantTheme='custom';const colors={'--tenant-primary':b.primary_color,'--tenant-on-primary':T.ink(b.primary_color),'--tenant-secondary':b.secondary_color,'--tenant-on-secondary':T.ink(b.secondary_color),'--tenant-accent':b.accent_color,'--tenant-on-accent':T.ink(b.accent_color),'--tenant-bg':b.background_color,'--tenant-ink':T.ink(b.background_color),'--tenant-muted':T.ink(b.background_color),'--green':b.primary_color};for(const [key,value] of Object.entries(colors))root.style.setProperty(key,value);}
 else if(cfg.color&&!Object.hasOwn(cfg,'branding')&&/^#[a-f0-9]{6}$/i.test(cfg.color))root.style.setProperty('--green',cfg.color);
 if(b.menu_layout!=='original')root.dataset.tenantLayout=b.menu_layout;
 document.title=b.app_name;
 const theme=document.querySelector('meta[name="theme-color"]');if(theme)theme.content=b.primary_color;
 for(const link of document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]'))link.href=b.icon_url;
 const manifest=document.querySelector('link[rel="manifest"]');if(!manifest)return b;
 const next=JSON.stringify([mode,customer?.id,b]);if(next===signature)return b;signature=next;
 if(manifestUrl)URL.revokeObjectURL(manifestUrl);manifestUrl='';
 if(mode==='cloud'&&customer?.id&&Object.keys(custom).length){const start=new URL('./',location.href);start.search='workspace='+encodeURIComponent(customer.id);start.hash='';const data={id:start.href,name:b.app_name,short_name:b.short_name,start_url:start.href,scope:new URL(start.pathname,start.origin).href,display:'standalone',theme_color:b.primary_color,background_color:b.background_color,icons:[{src:new URL(b.icon_url,location.href).href,sizes:custom.icon_url?'512x512':'192x192',type:'image/png',purpose:'any'},...(!custom.icon_url?[{src:new URL('/simplex-gestionale-demo/assets/icon-512.png',location.href).href,sizes:'512x512',type:'image/png'}]:[])]};manifestUrl=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/manifest+json'}));manifest.href=manifestUrl;}
 else manifest.href='/manifest.webmanifest';
 return b;
}

