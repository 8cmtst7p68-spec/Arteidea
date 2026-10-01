export const externalContentKey = "arteidea-external-content";
export const externalContentEvent = "arteidea-external-content-change";

export function externalContentAllowed() {
  try { return window.localStorage.getItem(externalContentKey) === "allowed"; }
  catch { return false; }
}

export function setExternalContentAllowed(allowed: boolean) {
  try {
    if (allowed) window.localStorage.setItem(externalContentKey, "allowed");
    else window.localStorage.removeItem(externalContentKey);
  } catch { /* Il servizio resta disattivato se la memoria non è disponibile. */ }
  window.dispatchEvent(new Event(externalContentEvent));
}
