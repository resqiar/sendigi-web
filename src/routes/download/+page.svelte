<script lang="ts">
    import { Badge, Button, Card, NavBrand, Navbar } from "flowbite-svelte";
    import Meta from "../../components/meta/Meta.svelte";
    import MainSidebar from "../../components/sidebar/MainSidebar.svelte";
</script>

<Meta title="Download Release | SenDigi" />

<Navbar class="py-6 mb-4">
    <NavBrand href="/">
        <img
            src="https://sendigi.id/logosendigi.png"
            class="me-3 h-6 sm:h-9"
            alt="SenDigi"
        />
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >SenDigi</span
        >
    </NavBrand>
</Navbar>

<main class="mt-6 mb-28 flex">
    <MainSidebar />

    <div class="flex-1 pr-24">
        <Card class="max-w-full">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">Download Release</h1>
                <p>
                    Temporarily while the state of the app is in beta, we
                    provide download section here to accommodate faster delivery
                    in beta state. When the application is available in the
                    store, this page will be removed.
                </p>
            </div>

            <div class="px-4 my-2">
                <div class="flex gap-2 items-center">
                    <h1 class="font-bold text-lg">v1.1-beta</h1>
                    <Badge color="purple">Latest Release</Badge>
                </div>

                <div class="mt-2">
                    <p class="font-semibold">What's Changed?</p>
                    <ul class="list-disc px-6 py-2">
                        <li>Refactor Lock UI by @nathanpasca in #13</li>
                        <li>Refactor English by @nathanpasca in #15 Full</li>
                    </ul>
                    <p></p>
                </div>

                <div class="mt-4">
                    <Button
                        href="https://github.com/resqiar/sendigi-app/releases/tag/v1.1-beta"
                        size="sm"
                        color="alternative">See Full Release</Button
                    >
                    <Button
                        href="https://github.com/resqiar/sendigi-app/releases/download/v1.1-beta/sendigi-release.apk"
                        size="sm">Download Release</Button
                    >
                </div>
            </div>

            <div class="px-4 my-2 mt-8">
                <div class="flex gap-2 items-center">
                    <h1 class="font-bold text-lg">v1.0-beta</h1>
                </div>

                <div class="mt-2">
                    <p class="font-semibold">What's Changed?</p>
                    <ul class="list-disc px-6 py-2">
                        <li>lock scheduler by @nathanpasca in #1</li>
                        <li>Add a basic locking feature by @resqiar in #2</li>
                        <li>
                            Add logo and change appTheme in LockScreen by
                            @Hilll19 in #3
                        </li>
                        <li>feat/refactor-ui by @nathanpasca in #4</li>
                        <li>Authentication Integrations by @resqiar in #5</li>
                        <li>refactor login ui by @nathanpasca in #6</li>
                        <li>
                            Ability to send application usage to server by
                            @resqiar in #7
                        </li>
                        <li>
                            Refactor code to match design document (booo) by
                            @resqiar in #8
                        </li>
                        <li>Add Scheduler by @resqiar in #9</li>
                        <li>
                            Implement Listening to Message Queue by @resqiar in
                            #10
                        </li>
                        <li>Refactor UI by @nathanpasca in #11</li>
                        <li>
                            Change Name, Detail, Logo and release to a new
                            proper brand (SenDigi) by @resqiar in #12
                        </li>
                    </ul>
                    <p></p>
                </div>

                <div class="mt-4">
                    <Button
                        href="https://github.com/resqiar/sendigi-app/releases/tag/v1.0-beta"
                        size="sm"
                        color="alternative">See Full Release</Button
                    >
                    <Button
                        color="light"
                        href="https://github.com/resqiar/sendigi-app/releases/download/v1.0-beta/sendigi-release.apk"
                        size="sm">Download Release</Button
                    >
                </div>
            </div>
        </Card>
    </div>
</main>
