/**
 * Client tests
 */
import React from "react";
import VictoryLabel from "src/components/victory-label";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";
import {Text} from "react-art";

describe("components/victory-label", () => {
  it("has expected content with shallow render", () => {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<VictoryLabel>time (ms)</VictoryLabel>);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal(Text);
    expect(output.props.children).to.contain("time (ms)");
  });
});
