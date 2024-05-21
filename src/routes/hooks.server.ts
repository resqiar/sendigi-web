import { PUBLIC_HTTP_SERVER } from '$env/static/public';

export async function handleFetch({ event, request, fetch }: any) {
	console.log("WTH?", event.request.headers.get('cookie'));
	if (request.url.startsWith(PUBLIC_HTTP_SERVER)) {
		console.log("COOKIENYA MANA SIH", event.request.headers.get('cookie'));
		request.headers.set('cookie', event.request.headers.get('cookie'));
	}
	return fetch(request);
}
