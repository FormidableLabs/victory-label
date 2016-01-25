import React from "react";
import {VictoryLabel} from "../src/index";
import { Surface } from "react-art";
import Circle from "react-art/shapes/circle";

export default class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <p>
          VictoryLabel demo! The little circles show the anchor points for
          each label.
        </p>
        <Surface width="600" height="1800" style={{ border: "1px solid #ccc", padding: 40}}>

          <Circle x={20} y={50} radius={2} fill="red"/>
          <VictoryLabel x={20} y={50} style={{fill: "tomato", opacity: 0.6}}>
            {"Victory is awesome.\nThis is default anchoring.\nCapisce?"}
          </VictoryLabel>

          <Circle x={300} y={150} radius={2} fill="green"/>
          <VictoryLabel x={300} y={150} textAnchor="end" verticalAnchor="start"
            style={{ fill: "blue" }}
          >
            {"Victory is awesome.\nThis is (end, start) anchoring.\nOK?"}
          </VictoryLabel>

          <Circle x={300} y={300} radius={2} fill="blue"/>
          <VictoryLabel x={300} y={300} lineHeight={2} textAnchor="middle" verticalAnchor="start">
            {"Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"}
          </VictoryLabel>

          <Circle x={300} y={450} radius={2} fill="red"/>
          <VictoryLabel x={300} y={450} textAnchor="start" verticalAnchor="start">
            {"Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"}
          </VictoryLabel>

          <Circle x={300} y={600} radius={2} fill="green"/>
          <VictoryLabel x={300} y={600} textAnchor="end" verticalAnchor="end">
            {"Victory is awesome.\nThis is (end, end) anchoring.\nOK?"}
          </VictoryLabel>

          <Circle x={300} y={750} radius={2} fill="blue"/>
          <VictoryLabel x={300} y={750} lineHeight={2}
            textAnchor="middle" verticalAnchor="end"
          >
            {"Victory is awesome.\nThis is (middle, end) anchoring.\nGot it?"}
          </VictoryLabel>

          <Circle x={300} y={900} radius={2} fill="red"/>
          <VictoryLabel x={300} y={900} textAnchor="start" verticalAnchor="end">
            {"Victory is awesome.\nThis is (start, end) anchoring.\nCapisce?"}
          </VictoryLabel>

          <Circle x={300} y={1050} radius={2} fill="green"/>
          <VictoryLabel x={300} y={1050} textAnchor="end" verticalAnchor="middle">
            {"Victory is awesome.\nThis is (end, middle) anchoring.\nOK?"}
          </VictoryLabel>

          <Circle x={300} y={1200} radius={2} fill="blue"/>
          <VictoryLabel x={300} y={1200} lineHeight={2}
            textAnchor="middle" verticalAnchor="middle"
          >
            {"Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"}
          </VictoryLabel>

          <Circle x={300} y={1350} radius={2} fill="red"/>
          <VictoryLabel x={300} y={1350} textAnchor="start" verticalAnchor="middle">
            {"Victory is awesome.\nThis is (start, middle) anchoring.\nCapisce?"}
          </VictoryLabel>

          <Circle x={300} y={1450} radius={2} fill="red"/>
          <VictoryLabel x={300} y={1450}
            transform={"rotate(50) translate(0, 50) "}
          >
            {"Victory is awesome.\nThis is ROTATED.\nCapisce?"}
          </VictoryLabel>
        </Surface>
      </div>
    );
  }
}
