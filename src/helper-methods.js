import merge from "lodash/object/merge";
import { Chart, Style } from "victory-util";
import { Transform } from "react-art";


module.exports = {
  getStyles(props, defaultStyles) {
    const style = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    return Style.removeInvisible(Chart.evaluateStyle(style));
  },

  getContentLength(props) {
    if (props.children) {
      const child = Chart.evaluateProp(props.children);
      return `${child}`.split("\n").length;
    }
    return 1;
  },

  getDy(props, style) {
    const length = this.getContentLength(props);
    const lineHeight = 1.1; // used in art package
    const verticalAnchor = props.verticalAnchor ?
      Chart.evaluateProp(props.verticalAnchor) : "middle";
    const padding = style.padding || 0;
    switch (verticalAnchor) {
    case "end":
      return -(length * lineHeight * style.fontSize + padding);
    case "middle":
      return -(length / 2 * lineHeight * style.fontSize);
    default:
      return padding;
    }
  },

  getDx(props, style, textAnchor) {
    const verticalAnchor = props.verticalAnchor ?
      Chart.evaluateProp(props.verticalAnchor) : "middle";
    if (textAnchor === "middle" || verticalAnchor !== "middle") {
      return 0;
    }
    const padding = style.padding || 0;
    return textAnchor === "start" ? padding : -padding;
  },

  buildTransform(props, dx, dy) {
    const baseTransform = new Transform().translate(dx, dy);
    const transform =
      props.transform && Style.toTransformString(Chart.evaluateProp(props.transform));
    if (!transform) {
      return baseTransform;
    }
    const transformArray = transform.trim().split(")").filter((str) => str !== "");
    const commands = transformArray.map((str) => str.match(/^.+\(/)[0].slice(0, -1));
    const commandArgs = transformArray.map((str) => str.match(/\(.+$/)[0].slice(1));
    commands.forEach((cmd, index) => {
      const args = commandArgs[index].split(",").map((str) => +str.trim());
      baseTransform[cmd.trim()](...args);
    });
    return baseTransform;
  },

  getFont(style) {
    const {fontFamily, fontSize, fontStyle, fontVariant, fontWeight} = style;
    return style.font || {fontFamily, fontSize, fontStyle, fontVariant, fontWeight};
  }
};
