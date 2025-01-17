import React from "react";
import { Vortex } from "./vortex";
import Login from "./login";

export function VortexDemo() {
    return (
        (<div
            className="w-screen mx-auto rounded-md  h-screen overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <Login/>
            </Vortex>
        </div>)
    );
}
