export const pendingOrders=records=>records.filter(r=>r.kind==='orders'&&!r.deleted&&r.payload.status==='Confermato');
export function orderStockChanges(records,old,payload,deleted=false){
 if(old?.payload.status==='Evaso'){
  if(deleted||payload.status!=='Evaso'||payload.client!==old.payload.client||JSON.stringify(payload.lines)!==JSON.stringify(old.payload.lines))throw Error('Ordine già evaso: cliente, righe e stato non modificabili; eliminazione non consentita.');
  return [];
 }
 if(deleted||payload.status!=='Evaso')return [];
 const quantities=new Map();for(const line of payload.lines){const q=Number(line.quantity);if(!Number.isFinite(q)||q<=0)throw Error('Quantità non valida.');quantities.set(line.product,(quantities.get(line.product)||0)+q);}
 return [...quantities].map(([id,q])=>{const r=records.find(r=>r.id===id&&r.kind==='products'&&!r.deleted),stock=Number(r?.payload.stock);if(!r||!Number.isFinite(stock)||stock<q)throw Error('Scorte insufficienti per '+(r?.payload.name||'articolo')+'.');return {...r,payload:{...r.payload,stock:stock-q},version:(r.version||0)+1,updated_at:new Date().toISOString()};});
}
