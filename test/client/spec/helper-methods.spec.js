/* eslint no-unused-expressions: 0 */
/* global sinon */

import Helpers from "src/helper-methods";
import { Transform } from "react-art";

describe("helper-methods", () => {
  describe("getStyles", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "cleanStyle");
    });

    afterEach(() => {
      sandbox.restore();
    });

    const defaultStyles = {
      fill: "red",
      fontSize: 16
    };

    it("returns defaultStyles when styles are not defined", () => {
      const style = Helpers.getStyles({}, defaultStyles);
      expect(Helpers.cleanStyle).calledWith(defaultStyles)
        .and.returned(defaultStyles);
      expect(style).to.eql(defaultStyles);
    });

    it("merges props with default styles", () => {
      const style = Helpers.getStyles({style: {fill: "blue"}}, defaultStyles);
      expect(Helpers.cleanStyle).called.and.returned({fill: "blue", fontSize: 16});
      expect(style).to.eql({fill: "blue", fontSize: 16});
    });

    it("cleans style values", () => {
      const style = Helpers.getStyles({style: {stroke: "transparent"}}, defaultStyles);
      expect(Helpers.cleanStyle).calledWith({stroke: "transparent", fill: "red", fontSize: 16})
        .and.returned({stroke: null, fill: "red", fontSize: 16});
      expect(style).to.eql({stroke: null, fill: "red", fontSize: 16});
    });
  });

  describe("getDy", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "getContentLength");
    });

    afterEach(() => {
      sandbox.restore();
    });

    const style = {fontSize: 1};

    it("returns a value for end anchors", () => {
      const props = {verticalAnchor: "end"};
      const dy = Helpers.getDy(props, style);
      expect(Helpers.getContentLength).calledWith(props)
        .and.returned(1);
      expect(dy).to.eql(-1.1);
    });

    it("returns a value for middle anchors", () => {
      const props = {verticalAnchor: "middle"};
      const dy = Helpers.getDy(props, style);
      expect(Helpers.getContentLength).calledWith(props)
        .and.returned(1);
      expect(dy).to.eql(-0.55);
    });

    it("returns a value for start anchors", () => {
      const props = {verticalAnchor: "start"};
      const dy = Helpers.getDy(props, style);
      expect(Helpers.getContentLength).calledWith(props)
        .and.returned(1);
      expect(dy).to.eql(0);
    });
  });

  describe("getDx", () => {
    const style = {padding: 1};

    it("returns 0 if vertical anchor is not 'middle'", () => {
      const props = {verticalAnchor: "end"};
      const textAnchor = "end";
      const dx = Helpers.getDx(props, style, textAnchor);
      expect(dx).to.eql(0);
    });

    it("returns 0 if the text anchor is 'middle'", () => {
      const props = {verticalAnchor: "middle"};
      const textAnchor = "middle";
      const dx = Helpers.getDx(props, style, textAnchor);
      expect(dx).to.eql(0);
    });

    it("returns -padding if the text anchor is 'end'", () => {
      const props = {verticalAnchor: "middle"};
      const textAnchor = "end";
      const dx = Helpers.getDx(props, style, textAnchor);
      expect(dx).to.eql(-style.padding);
    });

    it("returns padding if the text anchor is 'start'", () => {
      const props = {verticalAnchor: "middle"};
      const textAnchor = "start";
      const dx = Helpers.getDx(props, style, textAnchor);
      expect(dx).to.eql(style.padding);
    });
  });

  describe("buildTransform", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Transform.prototype, "translate");
      sandbox.spy(Transform.prototype, "rotate");
    });

    afterEach(() => {
      sandbox.restore();
    });

    const dx = 10;
    const dy = 20;

    it("performs a translate transform with dx and dy", () => {
      const transform = Helpers.buildTransform({}, dx, dy);
      expect(Transform.prototype.translate).calledWith(dx, dy);
      expect(transform).to.be.an.instanceof(Transform);
    });

    it("performs a rotate transform based on props", () => {
      const props = {transform: "rotate(90)"};
      const transform = Helpers.buildTransform(props);
      expect(Transform.prototype.rotate).calledWith(90);
      expect(transform).to.be.an.instanceof(Transform);
    });

    it("performs several transforms based on props", () => {
      const props = {transform: "rotate(90) translate(50, 100)"};
      const transform = Helpers.buildTransform(props);
      expect(Transform.prototype.rotate).calledWith(90);
      expect(Transform.prototype.translate).calledWith(50, 100);
      expect(transform).to.be.an.instanceof(Transform);
    });

    it("performs several transforms based on props and dx dy", () => {
      const props = {transform: "rotate(90)"};
      const transform = Helpers.buildTransform(props, dx, dy);
      expect(Transform.prototype.translate).calledWith(dx, dy);
      expect(Transform.prototype.rotate).calledWith(90);
      expect(transform).to.be.an.instanceof(Transform);
    });
  });

  describe("getFont", () => {
    it("consolidates font attributes into a single font object", () => {
      const style = {fontSize: 20, fontWeight: "bold", fill: "red"};
      expect(Helpers.getFont(style)).to.include({fontSize: 20, fontWeight: "bold"})
        .and.not.to.include({fill: "red"});
    });
  });
});
