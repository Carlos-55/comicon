import { Dialog, Notify, QSpinnerIos, Quasar, Loading } from 'quasar';
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
	//TimePlay(message,color);
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
			title = "Información"
			break;
		case "Warning":
			color = 'yellow'
			title = translate ? translateMessage(`notifications.titles.Warning`) : "Warning"
			break;
		default:
			break;
	}
	Dialog.create({title ,message, color });

}

function TimePlay(mensaje : any, color: any){

	const spinner = typeof QSpinnerIos !== 'undefined'
	? QSpinnerIos //  importado arriba
	: Quasar.components.QSpinnerIos

	Loading.show({
		spinner,
		message: mensaje,
		spinnerColor: color
	  });
	let time = setTimeout(() => {
		Loading.hide()
	let	time2 = void 0
	},2000)

}