<script lang="ts" setup>
  import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
  } from "@heroicons/vue/24/outline";
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { ref } from "vue";

  const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

  const { data } = await useCategory().getMenWomenCategories();

  const navigation = {
    categories: data.value?.data,
    pages: [
      { name: "About us", link: "/about" },
      { name: "Contact us", link: "/contact" },
    ],
  };

  const { data: _data } = await useCategory().getAll();

  const categories = _data.value?.data;

  // const collections = [
  //   {
  //     name: "Handcrafted Collection",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg",
  //     imageAlt:
  //       "Brown leather key ring with brass metal loops and rivets on wood table.",
  //     description:
  //       "Keep your phone, keys, and wallet together, so you can lose everything at once.",
  //   },
  //   {
  //     name: "Organized Desk Collection",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg",
  //     imageAlt:
  //       "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
  //     description:
  //       "The rest of the house will still be a mess, but your desk will look great.",
  //   },
  //   {
  //     name: "Focus Collection",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg",
  //     imageAlt:
  //       "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
  //     description:
  //       "Be more productive than enterprise project managers with a single piece of paper.",
  //   },
  // ];

  const mobileMenuOpen = ref(false);
</script>

<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="mobileMenuOpen = false"
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
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="mobileMenuOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      as="template"
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-12 px-4 py-6"
                  >
                    <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :src="item.imageUrl"
                            :alt="item.slug"
                            class="object-cover object-center"
                          />
                        </div>
                        <nuxt-link
                          class="mt-6 block text-sm font-medium text-gray-900"
                          to="/"
                        >
                          <span
                            class="absolute inset-0 z-10"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </nuxt-link>
                        <p
                          aria-hidden="true"
                          class="mt-1 text-sm text-gray-500"
                        >
                          Shop now
                        </p>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div
                  v-for="page in navigation.pages"
                  :key="page.name"
                  class="flow-root"
                >
                  <nuxt-link
                    :to="page.link"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >{{ page.name }}</nuxt-link
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Create an account</a
                  >
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Sign in</a
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <!-- Currency selector -->
                <form>
                  <div class="inline-block">
                    <label for="mobile-currency" class="sr-only"
                      >Currency</label
                    >
                    <div
                      class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"
                    >
                      <select
                        id="mobile-currency"
                        name="currency"
                        class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                      >
                        <option v-for="currency in currencies" :key="currency">
                          {{ currency }}
                        </option>
                      </select>
                      <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
                      >
                        <ChevronDownIcon
                          class="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Hero section -->
    <div class="relative bg-gray-900">
      <!-- Decorative image and overlay -->
      <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          alt=""
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />

      <!-- Navigation -->
      <header class="relative z-10">
        <nav aria-label="Top">
          <!-- Top navigation -->
          <div class="bg-gray-900">
            <div
              class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            >
              <!-- Currency selector -->
              <form>
                <div>
                  <label for="desktop-currency" class="sr-only">Currency</label>
                  <div
                    class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white"
                  >
                    <select
                      id="desktop-currency"
                      name="currency"
                      class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                    >
                      <option v-for="currency in currencies" :key="currency">
                        {{ currency }}
                      </option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center"
                    >
                      <ChevronDownIcon
                        class="h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <div class="flex items-center space-x-6">
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Sign in</a
                >
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Create an account</a
                >
              </div>
            </div>
          </div>

          <!-- Secondary navigation -->
          <div class="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div class="flex h-16 items-center justify-between">
                  <!-- Logo (lg+) -->
                  <div class="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="#">
                      <span class="sr-only">Your Company</span>
                      <img
                        class="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt=""
                      />
                    </a>
                  </div>

                  <div class="hidden h-full lg:flex">
                    <!-- Flyout menus -->
                    <PopoverGroup class="inset-x-0 bottom-0 px-4">
                      <div class="flex h-full justify-center space-x-8">
                        <Popover
                          v-for="category in navigation.categories"
                          :key="category.name"
                          class="flex"
                          v-slot="{ open }"
                        >
                          <div class="relative flex">
                            <PopoverButton
                              class="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out"
                            >
                              {{ category.name }}
                              <span
                                :class="[
                                  open ? 'bg-white' : '',
                                  'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out',
                                ]"
                                aria-hidden="true"
                              />
                            </PopoverButton>
                          </div>

                          <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <PopoverPanel
                              class="absolute inset-x-0 top-full text-sm text-gray-500"
                            >
                              <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                              <div
                                class="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div class="relative bg-white">
                                <div
                                  class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                                >
                                  <div
                                    class="grid grid-cols-4 gap-x-8 gap-y-10 py-16"
                                  >
                                    <div
                                      v-for="item in category.featured"
                                      :key="item.name"
                                      class="group relative"
                                    >
                                      <div
                                        class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75"
                                      >
                                        <img
                                          :src="item.imageUrl"
                                          :alt="item.slug"
                                          class="object-cover object-center"
                                        />
                                      </div>
                                      <nuxt-link
                                        to="/"
                                        class="mt-4 block font-medium text-gray-900"
                                      >
                                        <span
                                          class="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {{ item.name }}
                                      </nuxt-link>
                                      <p aria-hidden="true" class="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </transition>
                        </Popover>

                        <a
                          v-for="page in navigation.pages"
                          :key="page.name"
                          :href="page.link"
                          class="flex items-center text-sm font-medium text-white"
                          >{{ page.name }}</a
                        >
                      </div>
                    </PopoverGroup>
                  </div>

                  <!-- Mobile menu and search (lg-) -->
                  <div class="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      class="-ml-2 p-2 text-white"
                      @click="mobileMenuOpen = true"
                    >
                      <span class="sr-only">Open menu</span>
                      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Search -->
                    <a href="#" class="ml-2 p-2 text-white">
                      <span class="sr-only">Search</span>
                      <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  <!-- Logo (lg-) -->
                  <a href="#" class="lg:hidden">
                    <span class="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt=""
                      class="h-8 w-auto"
                    />
                  </a>

                  <div class="flex flex-1 items-center justify-end">
                    <a
                      href="#"
                      class="hidden text-sm font-medium text-white lg:block"
                      >Search</a
                    >

                    <div class="flex items-center lg:ml-8">
                      <!-- Help -->
                      <a href="#" class="p-2 text-white lg:hidden">
                        <span class="sr-only">Help</span>
                        <QuestionMarkCircleIcon
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href="#"
                        class="hidden text-sm font-medium text-white lg:block"
                        >Help</a
                      >

                      <!-- Cart -->
                      <div class="ml-4 flow-root lg:ml-8">
                        <a href="#" class="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            class="h-6 w-6 flex-shrink-0 text-white"
                            aria-hidden="true"
                          />
                          <span class="ml-2 text-sm font-medium text-white"
                            >0</span
                          >
                          <span class="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        class="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"
      >
        <h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <p class="mt-4 text-xl text-white">
          The new arrivals have, well, newly arrived. Check out the latest
          options from our summer small-batch release while they're still in
          stock.
        </p>
        <a
          href="#"
          class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >Shop New Arrivals</a
        >
      </div>
    </div>

    <main>
      <!-- Category section -->
      <section
        aria-labelledby="category-heading"
        class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8 mb-12"
      >
        <div
          class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0"
        >
          <h2
            id="category-heading"
            class="text-2xl font-bold tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
          <!-- <a
            href="#"
            class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a> -->
        </div>

        <div class="mt-4">
          <div class="-my-2">
            <div class="box-content overflow-x-auto py-2 xl:overflow-visible">
              <div
                class="flex flex-col justify-center items-center gap-4 sm:flex-row sm:flex-wrap mx-auto px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
              >
                <nuxt-link
                  v-for="category in categories"
                  :key="category.name"
                  to="/"
                  class="relative flex h-80 w-56 -12 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                >
                  <span aria-hidden="true" class="absolute inset-0">
                    <img
                      :src="category.imageUrl"
                      :alt="category.slug"
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span
                    class="relative mt-auto text-center text-xl font-bold text-white"
                    >{{ category.name }}</span
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="mt-6 px-4 sm:hidden">
          <a
            href="#"
            class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div> -->
      </section>

      <!-- Featured section -->
      <!-- <section
        aria-labelledby="social-impact-heading"
        class="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
      >
        <div class="relative overflow-hidden rounded-lg">
          <div class="absolute inset-0">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
              alt=""
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div
            class="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16"
          >
            <div
              class="relative mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <h2
                id="social-impact-heading"
                class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                <span class="block sm:inline">Level up</span>
                <span class="block sm:inline">your desk</span>
              </h2>
              <p class="mt-3 text-xl text-white">
                Make your desk beautiful and organized. Post a picture to social
                media and watch it get more likes than life-changing
                announcements. Reflect on the shallow nature of existence. At
                least you have a really nice desk setup.
              </p>
              <a
                href="#"
                class="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >Shop Workspace</a
              >
            </div>
          </div>
        </div>
      </section> -->

      <!-- Collection section -->
      <!-- <section
        aria-labelledby="collection-heading"`
        class="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
      >
        <h2
          id="collection-heading"
          class="text-2xl font-bold tracking-tight text-gray-900"
        >
          Shop by Collection
        </h2>
        <p class="mt-4 text-base text-gray-500">
          Each season, we collaborate with world-class designers to create a
          collection inspired by the natural world.
        </p>

        <div
          class="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0"
        >
          <a
            v-for="collection in collections"
            :key="collection.name"
            :href="collection.href"
            class="group block"
          >
            <div
              aria-hidden="true"
              class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
            >
              <img
                :src="collection.imageSrc"
                :alt="collection.imageAlt"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold text-gray-900">
              {{ collection.name }}
            </h3>
            <p class="mt-2 text-sm text-gray-500">
              {{ collection.description }}
            </p>
          </a>
        </div>
      </section> -->

      <!-- Featured section -->
      <!-- <section
        aria-labelledby="comfort-heading"
        class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div class="relative overflow-hidden rounded-lg">
          <div class="absolute inset-0">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
              alt=""
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div
            class="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16"
          >
            <div
              class="relative mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <h2
                id="comfort-heading"
                class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Simple productivity
              </h2>
              <p class="mt-3 text-xl text-white">
                Endless tasks, limited hours, a single piece of paper. Not
                really a haiku, but we're doing our best here. No kanban boards,
                burndown charts, or tangled flowcharts with our Focus system.
                Just the undeniable urge to fill empty circles.
              </p>
              <a
                href="#"
                class="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >Shop Focus</a
              >
            </div>
          </div>
        </div>
      </section> -->
    </main>
  </div>
</template>
