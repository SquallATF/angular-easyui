/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var TreeHelper = (function () {
    function TreeHelper() {
        this.cascadeCheck = true;
    }
    TreeHelper.prototype.checkNode = function (node, callback) {
        if (node.checkState != 'checked') {
            node.checkState = 'checked';
            if (this.cascadeCheck) {
                this.setChildCheckbox(node, node.checkState);
                this.setParentCheckbox(node);
            }
            callback(node);
        }
    };
    TreeHelper.prototype.uncheckNode = function (node, callback) {
        if (node.checkState != 'unchecked') {
            node.checkState = 'unchecked';
            if (this.cascadeCheck) {
                this.setChildCheckbox(node, node.checkState);
                this.setParentCheckbox(node);
            }
            callback(node);
        }
    };
    TreeHelper.prototype.uncheckAllNodes = function (nodes, callback) {
        var changed = false;
        this.forNodes(nodes, function (node) {
            if (node.checkState != 'unchecked') {
                node.checkState = 'unchecked';
                changed = true;
            }
        });
        if (changed) {
            callback();
        }
    };
    TreeHelper.prototype.setParentCheckbox = function (node) {
        var pnode = node.parent;
        if (pnode) {
            pnode.checkState = this.calcNodeState(pnode);
            this.setParentCheckbox(pnode);
        }
    };
    TreeHelper.prototype.setChildCheckbox = function (node, checkState) {
        node.checkState = checkState;
        if (node.children) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var cnode = _a[_i];
                this.setChildCheckbox(cnode, checkState);
            }
        }
    };
    TreeHelper.prototype.adjustCheck = function (node) {
        if (!this.cascadeCheck) {
            return;
        }
        if (node.checkState == 'checked') {
            this.setChildCheckbox(node, node.checkState);
            this.setParentCheckbox(node);
        }
        else if (node.checkState == 'unchecked') {
            this.setChildCheckbox(node, node.checkState);
            this.setParentCheckbox(node);
        }
        else {
            node.checkState = this.calcNodeState(node);
            this.setParentCheckbox(node);
        }
    };
    TreeHelper.prototype.calcNodeState = function (node) {
        var count = node.children ? node.children.length : 0;
        if (count) {
            var checkedCount = 0;
            var uncheckedCount = 0;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var cnode = _a[_i];
                cnode.checkState = cnode.checkState || 'unchecked';
                if (cnode.checkState == 'checked') {
                    checkedCount++;
                }
                else if (cnode.checkState == 'unchecked') {
                    uncheckedCount++;
                }
            }
            if (checkedCount == count) {
                return 'checked';
            }
            else if (uncheckedCount == count) {
                return 'unchecked';
            }
            else {
                return 'indeterminate';
            }
        }
        return 'unchecked';
    };
    TreeHelper.prototype.forNodes = function (fromNodes, callback) {
        fromNodes = fromNodes || [];
        var nodes = [];
        for (var i = 0; i < fromNodes.length; i++) {
            nodes.push(fromNodes[i]);
        }
        while (nodes.length) {
            var node = nodes.shift();
            if (callback(node) == false) {
                return;
            }
            if (node.children) {
                for (var i = node.children.length - 1; i >= 0; i--) {
                    nodes.unshift(node.children[i]);
                }
            }
        }
    };
    TreeHelper.prototype.findNode = function (nodes, field, value) {
        var node = null;
        this.forNodes(nodes, function (n) {
            if (n[field] == value) {
                node = n;
                return false;
            }
        });
        return node;
    };
    return TreeHelper;
}());
export { TreeHelper };
export var treeHelper = new TreeHelper();
//# sourceMappingURL=treehelper.js.map