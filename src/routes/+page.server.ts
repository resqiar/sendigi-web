import { PUBLIC_HTTP_SERVER, PUBLIC_SENDIGI_LEGACY } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { UserProfile } from '../dto/dto_interface';

export async function load({ fetch }: ServerLoadEvent) {
	try {
		const userReq = await fetch(`${PUBLIC_HTTP_SERVER}/user/profile`);

		if (!userReq.ok) {
			throw Error();
		}

		const res: UserProfile = await userReq.json();

		return {
			user: res,
		};
	} catch (error) {
		throw redirect(307, `${PUBLIC_SENDIGI_LEGACY}/login`);
	}
}

