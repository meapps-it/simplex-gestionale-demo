import {provincesData} from './italian-addresses-data.js';
export const provinces=provincesData;
const normalize=value=>String(value||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
export function provinceFor(value){return provinces.find(p=>normalize(p.code)===normalize(value)||normalize(p.name)===normalize(value));}
export function municipalitiesFor(value){return provinceFor(value)?.municipalities||[];}
export function resolveAddress(payload={}){
 let province=provinceFor(payload.province),city;
 if(province)city=province.municipalities.find(c=>c[0]===payload.municipality_code||normalize(c[1])===normalize(payload.city));
 else if(payload.city){const matches=provinces.flatMap(p=>p.municipalities.filter(c=>normalize(c[1])===normalize(payload.city)).map(c=>({province:p,city:c})));if(matches.length===1)({province,city}=matches[0]);}
 return {province,city};
}
