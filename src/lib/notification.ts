export function showNotification({ title, message }: { title: string, message: string; }) {
  chrome.notifications.create('notification', { type: 'basic', iconUrl: 'icons/icon-128x128.png', title, message });
}