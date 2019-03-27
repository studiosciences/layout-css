"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kabobToCamelCase = kabobToCamelCase;
exports.camelToKabobCase = camelToKabobCase;
exports.kabobToCamelCaseReducer = kabobToCamelCaseReducer;
exports.camelToKabobCaseReducer = camelToKabobCaseReducer;
exports.modelToArray = modelToArray;
exports.removePropFromModel = removePropFromModel;

//* STRINGS */
function kabobToCamelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

function camelToKabobCase(str) {
  return str.replace(/([A-Z])/g, function (g) {
    return '-'.concat(g[0].toLowerCase());
  });
}

function kabobToCamelCaseReducer(acc, val) {
  return acc.concat([kabobToCamelCase(val)]);
}

function camelToKabobCaseReducer(acc, val) {
  return acc.concat([camelToKabobCase(val)]);
} //* CONVERTING MODELS */

/** Moves all children to the top level */


function flattenModel(model) {
  var test = model.reduce(function (acc, node) {
    return acc.concat(node.children ? flattenModel(node.children) : [], [node]);
  }, []);
  return test;
}
/** Converts the model to a simple list of approved words. */


function modelToArray(model) {
  return flattenModel(model).reduce(function (acc, node) {
    return acc.concat([node.name]).concat(node.prefixes || []);
  }, []);
} //* MODIFYING MODELS */


function childrenAreSame(childrenA, childrenB) {
  function stringifyChildren(children) {
    return children.reduce(function (acc, node) {
      return acc.concat(node.name);
    }, []).toString();
  }

  return childrenA.length === childrenB.length && stringifyChildren(childrenA) === stringifyChildren(childrenB);
}

function evaluateNodeForRemoval(acc, removeName, node) {
  // exact match, just remove the node
  if (node.name === removeName) {
    return acc;
  } // If children, see if any need removal.


  if (node.children) {
    var nodeCopy = {
      name: node.name,
      prefixes: node.prefixes,
      children: removePropFromModel(removeName, node.children)
    }; // If children change, then the node is no longer relavant.

    if (!childrenAreSame(node.children, nodeCopy.children)) {
      return acc.concat(nodeCopy.children);
    }
  } // The node nor it's children matched for remov


  return acc.concat([node]);
}

function removePropFromModel(removeName, model) {
  return model.reduce(function (acc, node) {
    return evaluateNodeForRemoval(acc, removeName, node);
  }, []);
}