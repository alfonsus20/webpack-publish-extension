import { showNotification } from "@/lib/notification";

console.log("Running in background");
showNotification({ title: 'Installed', message: 'Extension Installed' });