import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import "./index.css";
import { icons } from "assets";

const QuietechEFI = () => (
    <div style={{ backgroundColor: "#1E1E1E", margin: "auto" }}>
        <div style={{ overflow: "hidden" }}>
            <Controller>
                <Scene triggerHook="onLeave" duration="500%" pin>
                    <Timeline
                        wrapper={
                            <div id="pinContainer" className="qietech_efi" />
                        }
                    >
                        <Tween
                            from={{ x: "45%", y: "-10000%" }}
                            to={{ x: "45%", y: "30%" }}
                        >
                            <span className="wording drive2">
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
                                    <div>drive2 sun top</div>
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "100%" }} to={{ x: "45%" }}>
                            <span className="wording newly">
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 20,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>
                                        Newly redesigned <br />
                                        Padded streering wheel
                                    </div>
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "-100%" }} to={{ x: "23%" }}>
                            <div className="wording automotive">
                                <div style={{ display: "flex" }}>
                                    <div>
                                        AUTOMOTIVE-
                                        <br />
                                        style dash
                                    </div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 20,
                                            marginLeft: 2
                                        }}
                                    />
                                </div>
                            </div>
                        </Tween>
                        <Tween
                            from={{ x: "40%", y: "10000%" }}
                            to={{ x: "40%", y: "1600%" }}
                        >
                            <span className="wording qt_front">
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop: 3,
                                            marginLeft: 2
                                        }}
                                    />
                                    <div>front suspension</div>
                                </div>
                            </span>
                        </Tween>
                    </Timeline>
                </Scene>
            </Controller>
        </div>
    </div>
);

export { QuietechEFI };
