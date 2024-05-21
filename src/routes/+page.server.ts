import { PUBLIC_HTTP_SERVER } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { UserProfile } from '../dto/dto_interface';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const userReq = await fetch(`${PUBLIC_HTTP_SERVER}/user/profile`, { credentials: "include" });

		console.log(userReq);

		if (!userReq.ok) {
			throw Error();
		}

		const res: UserProfile = await userReq.json();

		return {
			user: res,
		};
	} catch (error) {
		throw redirect(307, 'https://sendigi.id/LoginPage');
	}
}

