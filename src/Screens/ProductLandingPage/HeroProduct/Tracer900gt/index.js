import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import "./index.css";
import { icons } from "assets";

const screenHeight = window.innerHeight < 900;
const screenWidth = window.innerWidth < 1280;

const Tracer900gt = () => (
    <div style={{ backgroundColor: "#1E1E1E", margin: "auto" }}>
        <div style={{ overflow: "hidden" }}>
            <Controller>
                <Scene triggerHook="onLeave" duration="500%" pin>
                    <Timeline
                        wrapper={
                            <div id="pinContainer" className="tracer900gt" />
                        }
                    >
                        <Tween
                            from={{ x: "-100%" }}
                            to={{ x: screenWidth ? "28%" : "28%" }}
                        >
                            <span className="wording" style={{ top: "28%" }}>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        dynamic, high quality body design
                                    </div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop:3,
                                            marginLeft:2
                                        }}
                                    />
                                </div>
                            </span>
                        </Tween>
                        <Tween from={{ x: "100%" }} to={{ x: screenWidth ? "65%" : "70%" }}>
                            <div className="wording riding">
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop:3,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>
                                        riding comfort and wind protection
                                    </div>
                                </div>
                            </div>
                        </Tween>
                        <Tween
                            from={{ x: "100%" }}
                            to={{ x: screenWidth ? "69%" : "75%" }}
                        >
                            <span
                                className="wording"
                                style={{ top: screenHeight ? "35%" : "40%" }}
                            >
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop:3,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>advanced electronics with qss</div>
                                </div>
                            </span>
                        </Tween>
                        <Tween
                            from={{ x: "100%" }}
                            to={{ x: screenWidth ? "67%" : "72%" }}
                        >
                            <span
                                className="wording"
                                style={{ top: screenHeight ? "45%" : "50%" }}
                            >
                                <div style={{ display: "flex" }}>
                                    <img
                                        alt="waves"
                                        src={icons.left_waves}
                                        style={{
                                            height: 14,
                                            marginTop:3,
                                            marginRight: 2
                                        }}
                                    />
                                    <div>fully adjustable suspension</div>
                                </div>
                            </span>
                        </Tween>

                        <Tween
                            from={{ x: "40%", y: "10000%" }}
                            to={{ x: "40%", y: "1600%" }}
                        >
                            <span
                                className="wording torque">
                                <div style={{ display: "flex" }}>
                                    <div>
                                        Torque-rich 857cc 3-cylinder engine
                                    </div>
                                    <img
                                        alt="waves"
                                        src={icons.right_waves}
                                        style={{
                                            height: 14,
                                            marginTop:3,
                                            marginLeft: 2
                                        }}
                                    />
                                </div>
                            </span>
                        </Tween>
                    </Timeline>
                </Scene>
            </Controller>
        </div>
    </div>
);

export { Tracer900gt };
