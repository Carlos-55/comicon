import { Dialog, Notify } from 'quasar';
import { translateMessage } from "../boot/i18n";

export type Notified = "Error" | "Success" | "Info" | "Warning"

export const NotifyPersonal = (typeNotify: Notified, messageSending: string, translate: boolean = true) => {
	let message: string = translate ? translateMessage(messageSending) : messageSending;
	let color: string = 'green'
	let title: string = translate ? translateMessage(`notifications.titles.Success`) : "Success"
	switch (typeNotify) {
		case "Error":
			color = 'red'
			title = translate ? translateMessage(`notifications.titles.Error`) : "Error"
			break;
		case "Info":
			color = 'blue'
			title = translate ? translateMessage(`notifications.titles.Info`) : "Information"
			break;
		case "Warning":
			color = 'yellow'
			title = translate ? translateMessage(`notifications.titles.Warning`) : "Warning"
			break;
		default:
			break;
	}
	Notify.create({ message, color });

}
export const DialogPersonal = (typeNotify: Notified, messageSending: string, translate: boolean = true) => {
	let message: string = translate ? translateMessage(messageSending) : messageSending;
	let color: string = 'green'
	let title: string = translate ? translateMessage(`notifications.titles.Success`) : "Success"
	switch (typeNotify) {
		case "Error":
			color = 'red'
			title = translate ? translateMessage(`notifications.titles.Error`) : "Error"
			break;
		case "Info":
			color = 'blue'
			title = translate ? translateMessage(`notifications.titles.Info`) : "Information"
			break;
		case "Warning":
			color = 'yellow'
			title = translate ? translateMessage(`notifications.titles.Warning`) : "Warning"
			break;
		default:
			break;
	}
	Dialog.create({ title, message, color });

}
