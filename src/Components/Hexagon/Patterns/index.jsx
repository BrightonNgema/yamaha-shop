import React from "react";
import { Pattern } from "react-hexgrid";
import { images } from "assets";

const Patterns = ({ size }) => {
    return (
        <>
            <Pattern
                id="motorbike1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.motor}
            />
            <Pattern
                id="motorbike2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.motor_grey}
            />
            <Pattern
                id="power1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.power}
            />
            <Pattern
                id="power2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.power_grey}
            />
            <Pattern
                id="proaudio1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.pro_audio}
            />
            <Pattern
                id="proaudio2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.pro_audio_grey}
            />
            <Pattern
                id="homeaudio1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.home_audio}
            />
            <Pattern
                id="homeaudio2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.home_audio_grey}
            />
            <Pattern
                id="marine1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.marine}
            />
            <Pattern
                id="marine2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.marine_grey}
            />
            <Pattern
                id="golf1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.golfcarts}
            />
            <Pattern
                id="golf2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.golfcarts_grey}
            />
            <Pattern
                id="music1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.music}
            />
            <Pattern
                id="music2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.music_grey}
            />
            <Pattern
                id="world1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.world_yamaha}
            />
            <Pattern
                id="world2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.world_yamaha_grey}
            />
            <Pattern
                id="shop1"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.yamaha_shop}
            />
            <Pattern
                id="shop2"
                patternSize={{ x: 1, y: 1 }}
                size={size}
                link={images.yamaha_shop_grey}
            />
        </>
    );
};

export default Patterns;
