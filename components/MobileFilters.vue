<script lang="ts" setup>
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import { XMarkIcon } from "@heroicons/vue/24/outline";
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";

  defineProps<{
    filters: {
      id: string;
      name: string;
      options:
        | {
            value: string;
            label: string | number;
          }[]
        | undefined;
    }[];
    mobileFiltersOpen: boolean;
  }>();

  defineEmits<{
    (e: "update:mobileFiltersOpen", value: boolean): void;
  }>();
</script>

<template>
  <TransitionRoot as="template" :show="mobileFiltersOpen">
    <Dialog
      as="div"
      class="relative z-40 lg:hidden"
      @close="() => $emit('update:mobileFiltersOpen', false)"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <DialogPanel
            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
          >
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                class="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                @click="() => $emit('update:mobileFiltersOpen', false)"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <form class="mt-4">
              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.name"
                class="border-t border-gray-200 pb-4 pt-4"
                v-slot="{ open }"
              >
                <fieldset>
                  <legend class="w-full px-2">
                    <DisclosureButton
                      class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="text-sm font-medium text-gray-900">{{
                        section.name
                      }}</span>
                      <span class="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          :class="[
                            open ? '-rotate-180' : 'rotate-0',
                            'h-5 w-5 transform',
                          ]"
                          aria-hidden="true"
                        />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel class="px-4 pb-2 pt-4">
                    <div class="space-y-6">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`${section.id}-${optionIdx}-mobile`"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          :for="`${section.id}-${optionIdx}-mobile`"
                          class="ml-3 text-sm text-gray-500"
                          >{{ option.label }}</label
                        >
                      </div>
                    </div>
                  </DisclosurePanel>
                </fieldset>
              </Disclosure>
            </form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
