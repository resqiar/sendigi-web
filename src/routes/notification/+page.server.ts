import { PUBLIC_HTTP_SERVER } from '$env/static/public';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { NotificationConfig, UserProfile } from '../../dto/dto_interface';

export async function load({ fetch }: ServerLoadEvent) {
    try {
        const userReq = await fetch(`${PUBLIC_HTTP_SERVER}/user/profile`, { credentials: "include" });

        // if request status is not 200 (OK)
        // throw error, the catched error then redirect
        // user to auth page
        if (!userReq.ok) throw Error();

        const response = await fetch(
            `${PUBLIC_HTTP_SERVER}/api/notification`,
            {
                credentials: "include",
            },
        );

        if (!response.ok) return;
        const raw = await response.json();

        const configData: NotificationConfig = raw.data;
        const res: UserProfile = await userReq.json();

        return {
            data: configData,
            user: res,
        };
    } catch (error) {
        throw redirect(307, '/login');
    }
}
