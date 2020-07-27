export interface IUser {
	id?: string;
	name?: string;
	paternSurname?: string;
	maternSurname?: string;
	birthdate?: Date;
	email?: string;
	cellphone?: number;
	user?:string;
	password?: string;
	rol?: any;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
