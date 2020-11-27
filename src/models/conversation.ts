import { IMessage } from "./message";

export interface IConversation {
	id?: number,
	messages?: IMessage[]
}
