'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroConstants
} from 'react-viro';

var createReactClass = require('create-react-class');

var NuskinAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized : false,
      text : "Initializing AR...",
    };
  },
  renderModel:(model='trgo')=>{
      return (
        <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >

            {/* Spotlight to cast light on the object and a shadow on the surface, see
                the Viro documentation for more info on lights & shadows */}
            <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

            <Viro3DObject
            source={require('./model.vrx')}
            position={[0, .15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            // lightReceivingBitMask={5}
            // shadowCastingBitMask={4}
            // transformBehaviors={['billboardY']}
            resources={[require('./texture.jpeg')]} />

            {/* <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} /> */}

        </ViroNode>
      );
  },
  render: function() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>

        {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}

        {/* <ViroBox position={[0, -.5, -1]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.3, .3, .1]} materials={["grid"]} /> */}

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <ViroSpotLight
            innerAngle={5}
            outerAngle={90}
            direction={[0,-1,-.2]}
            position={[0, 3, 1]}
            color="#aaaaaa"
            castsShadow={true}
            />

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        {this.renderModel()}

      </ViroARScene>
    );
  },
  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized : true,
        text : "Hello Bub!"
      });
    }
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

module.exports = NuskinAR;
