export class User implements UserInterface{
	public id: number;
	public username: string;
	public password: string;
	public email: string;
	public firstname: string;
	public lastname: string;
	public skill: string;
		
	constructor(userCfg:UserInterface)
	{	
		this.id = userCfg.id;
		this.username = userCfg.username;
		this.password = userCfg.password;
		this.email = userCfg.email;
		this.firstname= userCfg.firstname;
		this.lastname= userCfg.lastname;
		this.skill= userCfg.skill;
	}
}

export class UserRegister implements UserInterface{
	public username: string;
	public password: string;
	public password2: string;
	public email: string;
	public firstname: string;
	public lastname: string;
	public skill: string;
	
	constructor(userCfg:UserInterface)
	{	
		this.username = userCfg.username;
		this.password = userCfg.password;
		this.password2 = userCfg.password2;
		this.email = userCfg.email;
		this.firstname= userCfg.firstname;
		this.lastname= userCfg.lastname;
		this.skill= userCfg.skill;
	}

}

interface UserInterface{
	id?: number;
    username: string;
	password: string;
	password2?: string;
	email?: string;
	firstname: string;
	lastname: string;
	skill: string;

}