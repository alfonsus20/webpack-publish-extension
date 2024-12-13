import { showNotification } from "@/lib/notification";

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension Installed Update Lagi Lagi');
  showNotification({ title: 'Installed', message: 'Installed Successfully' });
});
