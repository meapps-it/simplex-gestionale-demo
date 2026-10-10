export function salesMonths(orders,now=new Date()){
 const months=Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);return {key:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'),label:d.toLocaleDateString('it-IT',{month:'short'}).replace('.',''),value:0};});
 for(const o of orders){if(o.status!=='Evaso')continue;const month=months.find(m=>m.key===String(o.date).slice(0,7));if(month)month.value+=(o.lines||[]).reduce((sum,l)=>sum+Number(l.price)*Number(l.quantity),0);}
 return months;
}
export function stockSeries(history,productId){const days=new Map();for(const event of [...history].sort((a,b)=>String(a.recorded_at).localeCompare(String(b.recorded_at)))){const day=String(event.recorded_at).slice(0,10),value=productId?(event.product_id===productId?event.stock:event.stocks?.[productId]):event.total_stock;if(value!==undefined&&Number.isFinite(Number(value)))days.set(day,Number(value));}return [...days].map(([date,value])=>({date,value}));}
