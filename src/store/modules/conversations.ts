import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import axios from "axios";
import { URL_SERVER } from "../../helpers/configs";
import { IConversation } from '../../models/conversation';
import { oflineItems } from '../../helpers/helpers';
import { IUser } from '../../models/user';
import { IMessage } from '../../models/message';

@Module({
	name: 'ConversationStoreModule',
	namespaced: true,
})
export class ConversationStoreModule extends VuexModule {
	public selectedConversation: IConversation = {};
	public conversations: IConversation[] = [{ messages: [] }]
	public users: IUser[] = [];
	public loader: boolean = false;
	@Mutation
	LIST(conversations: IConversation[]) {
		this.conversations = [...conversations];
	}
	@Mutation
	LIST_USERS(users: IUser[]) {
		this.users = { ...users };
	}
	@Mutation
	SET_USERS(message: IMessage) {
		let wantedAdmin = this.users.find(u => u.id == message.fromId)
		console.log(wantedAdmin, 'Administrador');
	}
	@Mutation
	SET_USERS_CLEAN(userId: number) {
		let wanted = this.users.find((u: any) => u.id == userId)
		console.log(wanted)
	}
	@Mutation
	ADD_MESSAGE(message: IMessage) {
		this.selectedConversation = { ...this.selectedConversation, messages: [...this.selectedConversation.messages || [], { ...message }] }
		this.conversations = [...this.conversations.filter(conversation => conversation.messages != message.toId), { ...this.selectedConversation }];
	}
	@Mutation
	ADD_MESSAGE_NOT_IN(message: IMessage) {
		let conversation = this.conversations.find(conversation => conversation.messages == message.toId)
		if (conversation) {
			if (this.selectedConversation.id != message.toId) {
				this.context.commit('SET_USERS', message)
			}
		} else {
			conversation = { id: message.fromId, messages: [message] }
		}
		this.conversations = [...this.conversations.filter(conversation => conversation.messages != message.toId), { ...conversation }];
	}
	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}
	@Mutation
	ADD(conversation: IConversation) {
		const conversations = this.conversations.filter(s => s.id !== conversation.id);
		this.conversations = [...conversations, conversation];
	}
	@Mutation
	REMOVE(conversation: IConversation) {
		this.conversations = this.conversations.filter(s => s.id !== conversation.id);
	}
	@Mutation
	SET(conversation?: IConversation) {
		// @ts-ignore
		this.selectedConversation = Object.assign({}, conversation ? { ...conversation } : {});
	}
	@Action
	async getUsers() {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get('messages/users');
				this.context.commit('LIST_USERS', res);
				return res
			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async getConversation(userId?: number) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get(`messages/conversation/${userId}`);
				this.context.commit('ADD', { id: userId, messages: res });
				this.context.commit('SET', { id: userId, messages: res });
				return res
			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}

	@Action
	async create(item: IMessage) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				this.getUsers()
				const res = await Vue.prototype.$axios.post('messages', { toId: this.selectedConversation.id, ...item });
				this.context.commit('ADD_MESSAGE', res);

			} else {
				oflineItems(`conversations`, 'post', item);
			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async isReadStatusUpdate() {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				this.getUsers()
				const res = await Vue.prototype.$axios.put('messages/is-read');
				this.context.commit('SET_USERS_CLEAN', this.selectedConversation.id);

			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}

	get pending(): any {
		let men = this.users.reduce((before, after: any) =>  before = before + after.messages || 0, 0) + this.users.reduce((before, after: any) => before = before + after.messages || 0, 0) + this.users.reduce((before, after: any) => before = before + after.messages || 0, 0)
		return men
	}
}
