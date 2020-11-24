export interface IUser {
	id?: string;
	name?: string;
	paternSurname?: string;
	maternSurname?: string;
	birthdate?: Date;
	email?: string;
	cellphone?: number;
	password?: string;
	images?: any;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
