/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, forwardRef, Input, Inject } from '@angular/core';
import { TreeComponent } from './tree.component';
var TreeNodeComponent = (function () {
    function TreeNodeComponent(tree) {
        this.tree = tree;
        this.pnode = null;
        this.depth = 0;
        this.checkState = 'unchecked'; // checked, unchecked, indeterminate
        this.loading = false;
    }
    Object.defineProperty(TreeNodeComponent.prototype, "indentWidth", {
        get: function () {
            if (this.isLeaf()) {
                return (this.depth + 1) * 16;
            }
            else {
                return this.depth * 16;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeComponent.prototype, "checkboxClass", {
        get: function () {
            var cc = ['unchecked', 'checked', 'indeterminate'];
            var index = cc.indexOf(this.node.checkState);
            if (index == -1) {
                index = 0;
            }
            return 'tree-checkbox' + index;
        },
        enumerable: true,
        configurable: true
    });
    TreeNodeComponent.prototype.ngOnInit = function () {
        this.node.parent = this.pnode;
    };
    TreeNodeComponent.prototype.isExpanded = function () {
        if (!this.node.state || this.node.state == 'open') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeNodeComponent.prototype.isCollapsed = function () {
        if (this.node.state && this.node.state == 'closed') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeNodeComponent.prototype.isLeaf = function () {
        if (this.node.state == 'closed') {
            return false;
        }
        else {
            if (this.node.children && this.node.children.length) {
                this.loading = false;
                return false;
            }
            else {
                if (this.loading) {
                    return false;
                }
                return true;
            }
        }
    };
    TreeNodeComponent.prototype.isSelected = function (node) {
        return node == this.tree.selection;
    };
    TreeNodeComponent.prototype.toggle = function (event) {
        event.stopPropagation();
        if (this.isExpanded()) {
            this.node.state = 'closed';
            this.tree.nodeCollapse.emit(this.node);
        }
        else {
            this.loading = true;
            this.node.state = 'open';
            this.tree.nodeExpand.emit(this.node);
        }
    };
    TreeNodeComponent.prototype.onClickNode = function (event) {
        event.stopPropagation();
        this.tree.nodeClick.emit(this.node);
        this.tree.selectNode(this.node);
    };
    TreeNodeComponent.prototype.onCheckNode = function (event) {
        event.stopPropagation();
        if (this.node.checkState == 'checked') {
            this.tree.uncheckNode(this.node);
        }
        else {
            this.tree.checkNode(this.node);
        }
    };
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
TreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-tree-node',
                template: "\n\t\t<li>\n\t\t\t<div class=\"tree-node\"\n\t\t\t\t\t[class.tree-node-hover]=\"tree.highlightNode==node\"\n\t\t\t\t\t[class.tree-node-selected]=\"isSelected(node)\"\n\t\t\t\t\t(mouseenter)=\"tree.highlightNode=node\"\n\t\t\t\t\t(mouseleave)=\"tree.highlightNode=null\"\n\t\t\t\t\t(click)=\"onClickNode($event)\">\n\t\t\t\t<span class=\"tree-indent\" [style.width.px]=\"indentWidth\"></span\n\t\t\t\t><span *ngIf=\"!isLeaf()\" class=\"tree-hit\" \n\t\t\t\t\t\t[class.tree-expanded]=\"isExpanded()\" \n\t\t\t\t\t\t[class.tree-collapsed]=\"isCollapsed()\"\n\t\t\t\t\t\t(click)=\"toggle($event)\"></span\n\t\t\t\t><span class=\"tree-icon tree-folder\" \n\t\t\t\t\t\t[ngClass]=\"node.iconCls\"\n\t\t\t\t\t\t[class.tree-folder-open]=\"isExpanded()\"\n\t\t\t\t\t\t[class.tree-file]=\"isLeaf()\"\n\t\t\t\t\t\t[class.tree-loading]=\"loading\"></span\n\t\t\t\t><span *ngIf=\"tree.checkbox\" class=\"tree-checkbox\" [ngClass]=\"checkboxClass\" (click)=\"onCheckNode($event)\"></span\n\t\t\t\t><span *ngIf=\"!tree.itemTemplate\" class=\"tree-title\">{{node.text}}</span\n\t\t\t\t><span *ngIf=\"tree.itemTemplate\" class=\"tree-title\">\n\t\t\t\t\t<ng-template [euiTreeItemTemplate]=\"tree.itemTemplate.template\" [node]=\"node\"></ng-template>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<ul *ngIf=\"isExpanded() && node.children && node.children.length\">\n\t\t\t\t<ng-container *ngFor=\"let cnode of node.children\">\n\t\t\t\t\t<eui-tree-node *ngIf=\"!cnode.hidden\" [node]=\"cnode\" [pnode]=\"node\" [depth]=\"depth+1\"></eui-tree-node>\n\t\t\t\t</ng-container>\n\t\t\t</ul>\n\t\t</li>\n\t"
            },] },
];
/** @nocollapse */
TreeNodeComponent.ctorParameters = function () { return [
    { type: TreeComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return TreeComponent; }),] },] },
]; };
TreeNodeComponent.propDecorators = {
    'node': [{ type: Input },],
    'pnode': [{ type: Input },],
    'depth': [{ type: Input },],
    'checkState': [{ type: Input },],
};
//# sourceMappingURL=tree-node.component.js.map