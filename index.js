const template = require('babel-template');

const tmpl = template('SUPER.prototype.METHOD.call(this, ARGS)')

module.exports = function ({types}) {
  return {
    visitor: {
      // Put a vistor on the Program so this plugin runs before async functions are compiled.
      // See http://thejameskyle.com/babel-plugin-ordering.html
      Program(path) {
        path.traverse({
          Super(path) {
            let fn = path.getFunctionParent();

            // Check if the function parent is an async function, and this is part of a call expression
            if (fn.node.async && path.parentPath.isMemberExpression() && path.parentPath.parentPath.isCallExpression()) {
              // Find the parent class, and make sure it's extending from an identifier
              let parentClass = path.findParent(p => p.isClass());
              if (parentClass && types.isIdentifier(parentClass.node.superClass)) {
                path.parentPath.parentPath.replaceWith(tmpl({
                  SUPER: parentClass.node.superClass,
                  METHOD: path.parent.property,
                  ARGS: path.parentPath.parent.arguments
                }));
              }
            }
          }
        });
      }
    }
  };
};
