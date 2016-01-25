import React, { PropTypes } from "react";
import Radium from "radium";
import { Chart } from "victory-util";
import { Text } from "react-art";
import Helpers from "../helper-methods";

const defaultStyles = {
  stroke: "transparent",
  fill: "#756f6a",
  fontSize: 16,
  fontFamily: "Helvetica",
  backgroundColor: "#ccc",
  padding: 2
};

@Radium
export default class VictoryLabel extends React.Component {
  static propTypes = {
    /**
     * all Victory components will pass a data prop to their label component. This can
     * be used to calculate functional styles, and determine child text
     */
    data: PropTypes.object,
    /**
     * The children of this component define the content of the label. This
     * makes using the component similar to normal HTML spans or labels.
     * Currently, only strings are supported.
     */
    children: PropTypes.oneOfType([ // TODO: Expand child support in future release
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The style prop applies CSS properties to the rendered `<text>` element.
     */
    style: PropTypes.object,
    /**
     * The textAnchor prop defines how the text is horizontally positioned
     * relative to the given `x` and `y` coordinates.
     */
    textAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end",
        "inherit"
      ]),
      PropTypes.func
    ]),
    /**
     * The verticalAnchor prop defines how the text is vertically positioned
     * relative to the given `x` and `y` coordinates.
     */
    verticalAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end"
      ]),
      PropTypes.func
    ]),
    /**
     * The transform prop applies a transform to the rendered `<text>` element.
     * In addition to being a string, it can be an object containing transform
     * definitions for easier authoring.
     */
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func
    ]),
    /**
     * The x prop defines the x coordinate to use as a basis for horizontal
     * positioning.
     */
    x: PropTypes.number,
    /**
     * The y prop defines the y coordinate to use as a basis for vertical
     * positioning.
     */
    y: PropTypes.number,
    /**
     * The dx prop defines a horizontal shift from the `x` coordinate in pixels.
     */
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The dy prop defines a vertical shift from the `y` coordinate. in px
     */
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ])
  };

  render() {
    const textAnchor = this.props.textAnchor ?
      Chart.evaluateProp(this.props.textAnchor) : "start";
    const style = Helpers.getStyles(this.props, defaultStyles);
    const dx = this.props.dx ?
      Chart.evaluateProp(this.props.dx) : Helpers.getDx(this.props, style, textAnchor);
    const dy = this.props.dy ?
      Chart.evaluateProp(this.props.dy) : Helpers.getDy(this.props, style);
    const transform = Helpers.buildTransform(this.props, dx, dy);
    return (
      <Text
        x={this.props.x}
        y={this.props.y}
        alignment={textAnchor}
        transform={transform}
        font={Helpers.getFont(style)}
        {...style}
      >
        {this.props.children}
      </Text>
    );
  }
}
