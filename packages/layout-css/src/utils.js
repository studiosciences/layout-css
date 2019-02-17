//* STRINGS */

export function kabobToCamelCase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export function camelToKabobCase(str) {
  return str.replace(/([A-Z])/g, g => '-'.concat(g[0].toLowerCase()));
}

export function kabobToCamelCaseReducer(acc, val) {
  return acc.concat([kabobToCamelCase(val)]);
}

export function camelToKabobCaseReducer(acc, val) {
  return acc.concat([camelToKabobCase(val)]);
}

//* CONVERTING MODELS */

/** Moves all children to the top level */
function flattenModel(model) {
  const test = model.reduce(
    (acc, node) =>
      acc.concat(node.children ? flattenModel(node.children) : [], [node]),
    []
  );

  return test;
}

/** Converts the model to a simple list of approved words. */
export function modelToArray(model) {
  return flattenModel(model).reduce(
    (acc, node) => acc.concat([node.name]).concat(node.prefixes || []),
    []
  );
}

//* MODIFYING MODELS */

function childrenAreSame(childrenA, childrenB) {
  function stringifyChildren(children) {
    return children.reduce((acc, node) => acc.concat(node.name), []).toString();
  }

  return (
    childrenA.length === childrenB.length &&
    stringifyChildren(childrenA) === stringifyChildren(childrenB)
  );
}

function evaluateNodeForRemoval(acc, removeName, node) {
  // exact match, just remove the node
  if (node.name === removeName) {
    return acc;
  }

  // If children, see if any need removal.
  if (node.children) {
    const nodeCopy = {
      name: node.name,
      prefixes: node.prefixes,
      children: removePropFromModel(removeName, node.children),
    };

    // If children change, then the node is no longer relavant.
    if (!childrenAreSame(node.children, nodeCopy.children)) {
      return acc.concat(nodeCopy.children);
    }
  }

  // The node nor it's children matched for remov
  return acc.concat([node]);
}

export function removePropFromModel(removeName, model) {
  return model.reduce(
    (acc, node) => evaluateNodeForRemoval(acc, removeName, node),
    []
  );
}
