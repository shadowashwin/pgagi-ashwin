import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export function ThreeDCardDemo({ title, description, imageUrl, newsUrl, author, date, source }) {
    return (
        <CardContainer className="inter-var">
            <CardBody
                className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2]  w-auto h-auto rounded-xl p-6 border"
            >
                <CardItem translateZ="100" className="w-full mt-4">
                    <img
                        src={imageUrl}
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="nature thumbnail"
                    />
                </CardItem>
                <CardItem
                    translateZ="60"
                    className="text-xl font-bold line-clamp-2 text-white"
                >
                    {title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="50"
                    className=" line-clamp-2 text-sm max-w-sm mt-2 text-neutral-300"
                >
                    {description}
                </CardItem>

                <div className="flex justify-center items-center mt-10">
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                    >
                        <a
                            href={newsUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Read more
                        </a>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}