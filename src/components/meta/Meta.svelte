<script lang="ts">
    export let title: string;
    export let description: string = "";
    export let imageURL: string = "";
    export let url: string = "";
    export let type: string = "";

    const DEFAULT_TITLE: string = "SenDigi";
    const DEFAULT_DESC: string =
        "SenDigi allows you to monitor and control your Android device remotely from our web dashboard.";
    const DEFAULT_URL: string = "https://sendigi.id";
    const DEFAULT_TYPE: string = "website";
</script>

<svelte:head>
    <title>{title ? title : DEFAULT_TITLE}</title>
    <meta
        name="description"
        content={description ? description : DEFAULT_DESC}
    />
    <meta name="image" content={imageURL ? imageURL : "/squarelogo.png"} />
    <meta itemProp="name" content={title ? title : DEFAULT_TITLE} />
    <meta
        itemProp="description"
        content={description ? description : DEFAULT_DESC}
    />
    <meta itemProp="image" content={imageURL ? imageURL : "/squarelogo.png"} />

    <!-- OG GENERAL -->
    <meta
        name="og:title"
        property="og:title"
        content={title ? title : DEFAULT_TITLE}
    />
    <meta
        name="og:description"
        property="og:description"
        content={description ? description : DEFAULT_DESC}
    />
    <meta
        name="og:image"
        property="og:image"
        content={imageURL ? imageURL : "/squarelogo.png"}
    />
    <meta name="og:url" property="og:url" content={url ? url : DEFAULT_URL} />
    <meta
        name="og:type"
        property="og:type"
        content={type ? type : DEFAULT_TYPE}
    />

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title ? title : DEFAULT_TITLE} />
    <meta
        name="twitter:description"
        content={description ? description : DEFAULT_DESC}
    />
    <meta
        name="twitter:image:src"
        content={imageURL ? imageURL : "/squarelogo.png"}
    />

    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
    <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
    />
    <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
    />
    <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
    />
    <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
    />
    <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
    />
    <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
    />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />
</svelte:head>
