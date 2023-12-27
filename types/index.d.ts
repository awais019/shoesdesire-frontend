import { Socket } from "socket.io-client";

declare module "@heroicons/*";
declare module "@headlessui/*";

interface Window {
  webkitSpeechRecognition: any;
}

declare module "#app" {
  interface NuxtApp {
    $socket: Socket;
  }
}
