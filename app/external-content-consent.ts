export const externalContentKey = "arteidea-external-content";
export const externalContentEvent = "arteidea-external-content-change";

export type ExternalContentChoice = "allowed" | "denied" | null;

export function getExternalContentChoice(): ExternalContentChoice {
  try {
    const choice = window.localStorage.getItem(externalContentKey);
    return choice === "allowed" || choice === "denied" ? choice : null;
  } catch { return null; }
}

export function externalContentAllowed() {
  return getExternalContentChoice() === "allowed";
}

export function setExternalContentAllowed(allowed: boolean) {
  try {
    window.localStorage.setItem(externalContentKey, allowed ? "allowed" : "denied");
  } catch { /* Il servizio resta disattivato se la memoria non è disponibile. */ }
  window.dispatchEvent(new Event(externalContentEvent));
}
