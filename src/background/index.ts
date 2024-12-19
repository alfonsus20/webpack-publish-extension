import { showNotification } from "@/lib/notification";

chrome.runtime.onInstalled.addListener(() => {
  showNotification({ title: 'Installed', message: 'Extension was Installed Successfully' });
});
