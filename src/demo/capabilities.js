// No network adapter or commercial implementation is shipped in the demo.
const blocked=()=>{throw Error('Funzione disponibile solo nella versione commerciale.');};
export const configured=()=>false,currentSession=()=>null;
export const login=blocked,logout=blocked,recover=blocked,activate=blocked,password=blocked,token=blocked;
export const acceptRecovery=async()=>false;
export const memberships=blocked,entitlement=blocked,pull=blocked,mutate=blocked,activateLicense=blocked,updateBranding=blocked;
