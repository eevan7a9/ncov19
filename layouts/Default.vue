
<template>
    <div class="flex flex-col max-h-screen">
        <navbar-top></navbar-top>

        <div class="flex-1 overflow-y-auto custom-scrollbar keep-expand-scrollbar bg-gray-50">
            <slot></slot>
        </div>
    </div>
</template>