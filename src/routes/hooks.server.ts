import { PUBLIC_HTTP_SERVER } from '$env/static/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch = (async ({ event, request, fetch }) => {
	if (request.url.startsWith(PUBLIC_HTTP_SERVER)) {
		request.headers.set('cookie', event.request.headers.get('cookie') ?? "");
	}
	return fetch(request);
}) satisfies HandleFetch;
