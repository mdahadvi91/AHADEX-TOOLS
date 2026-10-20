type ToastType = "success" | "error" | "info";
type ToastListener = (msg: string, type: ToastType) => void;

let listener: ToastListener | null = null;

export function registerToast(l: ToastListener) {
  listener = l;
}

export function showToast(msg: string, type: ToastType = "success") {
  if (listener) listener(msg, type);
}
