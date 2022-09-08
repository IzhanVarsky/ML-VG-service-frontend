import {optimize} from 'svgo';
import {getSVGTagFromFullSVG, JQueryToHTML} from "~/utils";

const {applyTransformsFromStr} = require("~/flatten_transforms");
export const flattenedGroups = (svg) => {
  const full_parsed = $(svg);
  let element = getSVGTagFromFullSVG(full_parsed)[0];
  // pasting transforms loop:
  let loopFn = function (parent, transformsToAdd = []) {
    let children = parent.children;
    for (let child = 0; child < children.length; child++) {
      let cur = children[child];
      if (cur.tagName === "g") {
        if (cur.hasAttribute("transform")) {
          loopFn(cur, [...transformsToAdd, cur.getAttribute("transform")]);
        }
      } else if (cur.tagName === "defs") {
        continue;
      } else if (cur.tagName === "text" || cur.children.length === 0) {
        if (transformsToAdd.length === 0) continue;
        let transform_attr = transformsToAdd.join(" ");
        if (cur.hasAttribute("transform")) {
          transform_attr += " " + cur.getAttribute("transform");
        }
        cur.setAttribute("transform", transform_attr);
      } else {
        loopFn(cur, transformsToAdd);
      }
    }
  }
  loopFn(element);
  // removing groups:
  let removingLoopFn = function (parent) {
    let children = parent.children;
    for (let child = 0; child < children.length; child++) {
      let cur = children[child];
      if (cur.tagName === "g") {
        removingLoopFn(cur);
        while (cur.children.length) {
          cur.insertAdjacentElement("beforebegin", cur.children[0]);
        }
        cur.remove();
      }
    }
  }
  removingLoopFn(element);
  return JQueryToHTML(full_parsed);
}

export function optimize_svg_pipeline(svg) {
  console.log("Flattening svg...");
  let res1 = flattenedGroups(svg);
  console.log("Applying transformations...");
  let res2 = applyTransformsFromStr(res1);
  console.log("Optimizing...");
  return optimize(res2).data;
}