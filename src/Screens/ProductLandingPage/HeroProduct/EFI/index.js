import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import "./index.css";
import { icons } from "assets";

const EFI = () => (
    <div style={{ backgroundColor: "#1E1E1E", margin: "auto" }}>
        <div style={{ overflow: "hidden" }}>
            <Controller>
                <Scene triggerHook="onLeave" duration="500%" pin>
                    <Timeline
                        wrapper={<div id="pinContainer" className="efi" />}
                    >
                        <Tween
                            from={{ x: "45%", y: "-10000%" }}
                            to={{ x: "45%", y: "30%" }}
                        >
                            <span
                                className="wording climaguard"
                            >
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>climaguard sun top</div>
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "-100%" }} to={{ x:"40%" }}>
                            <span className="wording redesign">
                                <div style={{ display: "flex" }}>
                                    <div>redesigned steering wheels</div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginLeft: 2
                                        }}
                                    />
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "-100%" }} to={{ x: "23%" }}>
                            <div
                                className="wording spacious"
                                
                            >
                                <div style={{ display: "flex" }}>
                                    <div>
                                        More Spacious
                                        <br />
                                        Sweater basket
                                    </div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginLeft: 2
                                        }}
                                    />
                                </div>
                            </div>
                        </Tween>
                        <Tween from={{ x: "-100%" }} to={{ x: "20%" }}>
                            <span
                                className="wording roomier"
                                
                            >
                                <div style={{ display: "flex" }}>
                                    <div>Roomier bagwell</div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginLeft: 2
                                        }}
                                    />
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "100%" }} to={{ x: "65%" }}>
                            <span
                                className="wording fully"
                            >
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>fully adjustable suspension</div>
                                </div>
                            </span>
                        </Tween>
                    </Timeline>
                </Scene>
            </Controller>
        </div>
    </div>
);

export { EFI };
