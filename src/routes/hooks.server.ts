import { PUBLIC_HTTP_SERVER } from '$env/static/public';

export async function handleFetch({ event, request, fetch }: any) {
	if (request.url.startsWith(PUBLIC_HTTP_SERVER)) {
		request.headers.set('cookie', event.request.headers.get('cookie'));
	}
	return fetch(request);
}
