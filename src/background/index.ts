import { showNotification } from "@/lib/notification";

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension Installed Update');
  showNotification({ title: 'Installed', message: 'Installed Successfully' });
});
