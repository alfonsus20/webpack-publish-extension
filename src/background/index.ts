import { showNotification } from "@/lib/notification";

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension Installed Update Lagi');
  showNotification({ title: 'Installed', message: 'Installed Successfully' });
});
