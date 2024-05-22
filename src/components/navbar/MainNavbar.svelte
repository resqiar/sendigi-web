<script lang="ts">
    import { Avatar, Navbar, NavBrand, Select } from "flowbite-svelte";
    import type { UserProfile } from "../../dto/dto_interface";
    import { SelectedRefreshTimeTemplate } from "../../stores/store";

    export let userProfile: UserProfile;
    let selected: number;

    SelectedRefreshTimeTemplate.subscribe((v) => (selected = v));
    $: SelectedRefreshTimeTemplate.set(selected);

    let refreshTimeTemplate = [
        { value: 1000, name: "1 Second" },
        { value: 1000 * 5, name: "5 Seconds" },
        { value: 1000 * 10, name: "10 Seconds" },
        { value: 1000 * 30, name: "30 Seconds" },
        { value: 1000 * 60, name: "1 Minute" },
        { value: 1000 * 60 * 5, name: "5 Minutes" },
    ];
</script>

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

    <div class="flex items-center gap-6 md:order-2">
        <Select
            placeholder="Refresh Time"
            items={refreshTimeTemplate}
            bind:value={selected}
        />
        <Avatar id="avatar-menu" src={userProfile.PictureURL} />
    </div>
</Navbar>
