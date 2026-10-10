export function drawStockChart(canvas,series){
 if(!canvas||!series.length||!globalThis.CanvasRenderingContext2D)return;
 const width=canvas.clientWidth||600,height=240,dpr=globalThis.devicePixelRatio||1;canvas.width=width*dpr;canvas.height=height*dpr;
 const c=canvas.getContext('2d');c.scale(dpr,dpr);const left=48,right=width-18,top=20,bottom=200,max=Math.max(1,...series.map(p=>p.value))*1.15;
 c.font='12px system-ui';c.fillStyle='#596476';c.strokeStyle='#dce3ee';c.lineWidth=1;
 for(let i=0;i<5;i++){const y=bottom-(bottom-top)*i/4;c.beginPath();c.moveTo(left,y);c.lineTo(right,y);c.stroke();c.fillText(String(Math.round(max*i/4)),4,y+4);}
 const x=i=>series.length===1?(left+right)/2:left+(right-left)*i/(series.length-1),y=v=>bottom-(bottom-top)*v/max;
 c.beginPath();series.forEach((p,i)=>i?c.lineTo(x(i),y(p.value)):c.moveTo(x(i),y(p.value)));c.strokeStyle='#1976ff';c.lineWidth=4;c.stroke();
 for(let i=0;i<series.length;i++){c.beginPath();c.arc(x(i),y(series[i].value),5,0,Math.PI*2);c.fillStyle='#1976ff';c.fill();c.strokeStyle='#111';c.lineWidth=2;c.stroke();}
 const label=p=>new Date(p.date+'T12:00:00').toLocaleDateString('it-IT',{day:'2-digit',month:'short'});c.fillStyle='#596476';c.textAlign='center';c.fillText(label(series[0]),x(0),226);if(series.length>1)c.fillText(label(series.at(-1)),x(series.length-1),226);
}
