export function isTrial(entitlement){return !!entitlement?.trial?.is_trial;}
export function trialRemaining(entitlement){const t=entitlement?.trial;if(!t?.is_trial||t.expired)return 0;return Math.max(0,Date.parse(t.expires_at)-Date.parse(t.server_now)-Math.max(0,performance.now()-(t.received_at??performance.now())));}
export function trialActive(entitlement){return isTrial(entitlement)&&trialRemaining(entitlement)>0;}
