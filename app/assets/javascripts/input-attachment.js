var __glob = (map2) => (path) => {
  var fn = map2[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};

// node_modules/@stencil/core/internal/app-data/index.js
var BUILD = {
  allRenderFn: false,
  element: true,
  event: true,
  hasRenderFn: true,
  hostListener: true,
  hostListenerTargetWindow: true,
  hostListenerTargetDocument: true,
  hostListenerTargetBody: true,
  hostListenerTargetParent: false,
  hostListenerTarget: true,
  member: true,
  method: true,
  mode: true,
  observeAttribute: true,
  prop: true,
  propMutable: true,
  reflect: true,
  scoped: true,
  shadowDom: true,
  slot: true,
  cssAnnotations: true,
  state: true,
  style: true,
  formAssociated: false,
  svg: true,
  updatable: true,
  vdomAttribute: true,
  vdomXlink: true,
  vdomClass: true,
  vdomFunctional: true,
  vdomKey: true,
  vdomListener: true,
  vdomRef: true,
  vdomPropOrAttr: true,
  vdomRender: true,
  vdomStyle: true,
  vdomText: true,
  propChangeCallback: true,
  taskQueue: true,
  hotModuleReplacement: false,
  isDebug: false,
  isDev: false,
  isTesting: false,
  hydrateServerSide: false,
  hydrateClientSide: false,
  lifecycleDOMEvents: false,
  lazyLoad: false,
  profile: false,
  slotRelocation: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  appendChildSlotFix: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  cloneNodeFix: false,
  hydratedAttribute: false,
  hydratedClass: true,
  // TODO(STENCIL-1305): remove this option
  scriptDataOpts: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  scopedSlotTextContentFix: false,
  // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
  shadowDomShim: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  slotChildNodesFix: false,
  invisiblePrehydration: true,
  propBoolean: true,
  propNumber: true,
  propString: true,
  constructableCSS: true,
  devTools: false,
  shadowDelegatesFocus: true,
  initializeNextTick: false,
  asyncLoading: true,
  asyncQueue: false,
  transformTagName: false,
  attachStyles: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  experimentalSlotFixes: false
};
var NAMESPACE = (
  /* default */
  "app"
);

// node_modules/@stencil/core/internal/app-globals/index.js
var globalStyles = (
  /* default */
  ""
);

// import("./**/*.entry.js*") in node_modules/@stencil/core/internal/client/index.js
var globImport_entry_js = __glob({});

// node_modules/@stencil/core/internal/client/index.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var Build = {
  isDev: BUILD.isDev ? true : false,
  isBrowser: true,
  isServer: false,
  isTesting: BUILD.isTesting ? true : false
};
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var PrimitiveType = /* @__PURE__ */ ((PrimitiveType2) => {
  PrimitiveType2["Undefined"] = "undefined";
  PrimitiveType2["Null"] = "null";
  PrimitiveType2["String"] = "string";
  PrimitiveType2["Number"] = "number";
  PrimitiveType2["SpecialNumber"] = "number";
  PrimitiveType2["Boolean"] = "boolean";
  PrimitiveType2["BigInt"] = "bigint";
  return PrimitiveType2;
})(PrimitiveType || {});
var NonPrimitiveType = /* @__PURE__ */ ((NonPrimitiveType2) => {
  NonPrimitiveType2["Array"] = "array";
  NonPrimitiveType2["Date"] = "date";
  NonPrimitiveType2["Map"] = "map";
  NonPrimitiveType2["Object"] = "object";
  NonPrimitiveType2["RegularExpression"] = "regexp";
  NonPrimitiveType2["Set"] = "set";
  NonPrimitiveType2["Channel"] = "channel";
  NonPrimitiveType2["Symbol"] = "symbol";
  return NonPrimitiveType2;
})(NonPrimitiveType || {});
var TYPE_CONSTANT = "type";
var VALUE_CONSTANT = "value";
var SERIALIZED_PREFIX = "serialized:";
var reWireGetterSetter = (instance, hostRef) => {
  var _a;
  const cmpMeta = hostRef.$cmpMeta$;
  const members = Object.entries((_a = cmpMeta.$members$) != null ? _a : {});
  members.map(([memberName, [memberFlags]]) => {
    if ((BUILD.state || BUILD.prop) && (memberFlags & 31 || memberFlags & 32)) {
      const ogValue = instance[memberName];
      const ogDescriptor = getPropertyDescriptor(Object.getPrototypeOf(instance), memberName) || Object.getOwnPropertyDescriptor(instance, memberName);
      if (ogDescriptor) {
        Object.defineProperty(instance, memberName, {
          get() {
            return ogDescriptor.get.call(this);
          },
          set(newValue) {
            ogDescriptor.set.call(this, newValue);
          },
          configurable: true,
          enumerable: true
        });
      }
      instance[memberName] = hostRef.$instanceValues$.has(memberName) ? hostRef.$instanceValues$.get(memberName) : ogValue;
    }
  });
};
function getPropertyDescriptor(obj, memberName) {
  while (obj) {
    const desc = Object.getOwnPropertyDescriptor(obj, memberName);
    if (desc == null ? void 0 : desc.get) return desc;
    obj = Object.getPrototypeOf(obj);
  }
  return void 0;
}
var getHostRef = (ref) => {
  if (ref.__stencil__getHostRef) {
    return ref.__stencil__getHostRef();
  }
  return void 0;
};
var registerHost = (hostElement, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: hostElement,
    $cmpMeta$: cmpMeta,
    $instanceValues$: /* @__PURE__ */ new Map(),
    $serializerValues$: /* @__PURE__ */ new Map()
  };
  if (BUILD.isDev) {
    hostRef.$renderCount$ = 0;
  }
  if (BUILD.method && BUILD.lazyLoad) {
    hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
  }
  if (BUILD.asyncLoading) {
    hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
    hostElement["s-p"] = [];
    hostElement["s-rc"] = [];
  }
  if (BUILD.lazyLoad) {
    hostRef.$fetchedCbList$ = [];
  }
  const ref = hostRef;
  hostElement.__stencil__getHostRef = () => ref;
  if (!BUILD.lazyLoad && BUILD.modernPropertyDecls && (BUILD.state || BUILD.prop)) {
    reWireGetterSetter(hostElement, hostRef);
  }
  return ref;
};
var isMemberInElement = (elm, memberName) => memberName in elm;
var customError;
var consoleError = (e, el) => (customError || console.error)(e, el);
var STENCIL_DEV_MODE = BUILD.isTesting ? ["STENCIL:"] : [
  "%cstencil",
  "color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px"
];
var consoleDevError = (...m) => console.error(...STENCIL_DEV_MODE, ...m);
var consoleDevWarn = (...m) => console.warn(...STENCIL_DEV_MODE, ...m);
var cmpModules = /* @__PURE__ */ new Map();
var loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  const exportName = cmpMeta.$tagName$.replace(/-/g, "_");
  const bundleId = cmpMeta.$lazyBundleId$;
  if (BUILD.isDev && typeof bundleId !== "string") {
    consoleDevError(
      `Trying to lazily load component <${cmpMeta.$tagName$}> with style mode "${hostRef.$modeName$}", but it does not exist.`
    );
    return void 0;
  } else if (!bundleId) {
    return void 0;
  }
  const module = !BUILD.hotModuleReplacement ? cmpModules.get(bundleId) : false;
  if (module) {
    return module[exportName];
  }
  return /* @vite-ignore */ /* webpackInclude: /\.entry\.js$/ */ /* webpackExclude: /\.system\.entry\.js$/ */ /* webpackMode: "lazy" */ globImport_entry_js(`./${bundleId}.entry.js${BUILD.hotModuleReplacement && hmrVersionId ? "?s-hmr=" + hmrVersionId : ""}`).then(
    (importedModule) => {
      if (!BUILD.hotModuleReplacement) {
        cmpModules.set(bundleId, importedModule);
      }
      return importedModule[exportName];
    },
    (e) => {
      consoleError(e, hostRef.$hostElement$);
    }
  );
};
var styles = /* @__PURE__ */ new Map();
var modeResolutionChain = [];
var needsScopedSSR = () => false;
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var COMMENT_NODE_ID = "c";
var HYDRATE_ID = "s-id";
var HYDRATED_STYLE_ID = "sty-id";
var HYDRATE_CHILD_ID = "c-id";
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = [
  "formAssociatedCallback",
  "formResetCallback",
  "formDisabledCallback",
  "formStateRestoreCallback"
];
var win = typeof window !== "undefined" ? window : {};
var H = win.HTMLElement || class {
};
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts)
};
var supportsShadow = BUILD.shadowDom;
var supportsListenerOptions = /* @__PURE__ */ (() => {
  var _a;
  let supportsListenerOptions2 = false;
  try {
    (_a = win.document) == null ? void 0 : _a.addEventListener(
      "e",
      null,
      Object.defineProperty({}, "passive", {
        get() {
          supportsListenerOptions2 = true;
        }
      })
    );
  } catch (e) {
  }
  return supportsListenerOptions2;
})();
var promiseResolve = (v) => Promise.resolve(v);
var supportsConstructableStylesheets = BUILD.constructableCSS ? /* @__PURE__ */ (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
})() : false;
var supportsMutableAdoptedStyleSheets = supportsConstructableStylesheets ? /* @__PURE__ */ (() => !!win.document && Object.getOwnPropertyDescriptor(win.document.adoptedStyleSheets, "length").writable)() : false;
var queueCongestion = 0;
var queuePending = false;
var queueDomReads = [];
var queueDomWrites = [];
var queueDomWritesLow = [];
var queueTask = (queue, write) => (cb) => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
var consume = (queue) => {
  for (let i2 = 0; i2 < queue.length; i2++) {
    try {
      queue[i2](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
var consumeTimeout = (queue, timeout) => {
  let i2 = 0;
  let ts = 0;
  while (i2 < queue.length && (ts = performance.now()) < timeout) {
    try {
      queue[i2++](ts);
    } catch (e) {
      consoleError(e);
    }
  }
  if (i2 === queue.length) {
    queue.length = 0;
  } else if (i2 !== 0) {
    queue.splice(0, i2);
  }
};
var flush = () => {
  if (BUILD.asyncQueue) {
    queueCongestion++;
  }
  consume(queueDomReads);
  if (BUILD.asyncQueue) {
    const timeout = (plt.$flags$ & 6) === 2 ? performance.now() + 14 * Math.ceil(queueCongestion * (1 / 10)) : Infinity;
    consumeTimeout(queueDomWrites, timeout);
    consumeTimeout(queueDomWritesLow, timeout);
    if (queueDomWrites.length > 0) {
      queueDomWritesLow.push(...queueDomWrites);
      queueDomWrites.length = 0;
    }
    if (queuePending = queueDomReads.length + queueDomWrites.length + queueDomWritesLow.length > 0) {
      plt.raf(flush);
    } else {
      queueCongestion = 0;
    }
  } else {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
var nextTick = (cb) => promiseResolve().then(cb);
var writeTask = /* @__PURE__ */ queueTask(queueDomWrites, true);
var getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname;
};
var setAssetPath = (path) => plt.$resourcesUrl$ = path;
var isDef = (v) => v != null && v !== void 0;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
function queryNonceMetaTagContent(doc) {
  var _a, _b, _c;
  return (_c = (_b = (_a = doc.head) == null ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : _b.getAttribute("content")) != null ? _c : void 0;
}
var escapeRegExpSpecialCharacters = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var RemoteValue = class _RemoteValue {
  /**
   * Deserializes a LocalValue serialized object back to its original JavaScript representation
   *
   * @param serialized The serialized LocalValue object
   * @returns The original JavaScript value/object
   */
  static fromLocalValue(serialized) {
    const type = serialized[TYPE_CONSTANT];
    const value = VALUE_CONSTANT in serialized ? serialized[VALUE_CONSTANT] : void 0;
    switch (type) {
      case "string":
        return value;
      case "boolean":
        return value;
      case "bigint":
        return BigInt(value);
      case "undefined":
        return void 0;
      case "null":
        return null;
      case "number":
        if (value === "NaN") return NaN;
        if (value === "-0") return -0;
        if (value === "Infinity") return Infinity;
        if (value === "-Infinity") return -Infinity;
        return value;
      case "array":
        return value.map((item) => _RemoteValue.fromLocalValue(item));
      case "date":
        return new Date(value);
      case "map":
        const map2 = /* @__PURE__ */ new Map();
        for (const [key, val] of value) {
          const deserializedKey = typeof key === "object" && key !== null ? _RemoteValue.fromLocalValue(key) : key;
          const deserializedValue = _RemoteValue.fromLocalValue(val);
          map2.set(deserializedKey, deserializedValue);
        }
        return map2;
      case "object":
        const obj = {};
        for (const [key, val] of value) {
          obj[key] = _RemoteValue.fromLocalValue(val);
        }
        return obj;
      case "regexp":
        const { pattern, flags } = value;
        return new RegExp(pattern, flags);
      case "set":
        const set = /* @__PURE__ */ new Set();
        for (const item of value) {
          set.add(_RemoteValue.fromLocalValue(item));
        }
        return set;
      case "symbol":
        return Symbol(value);
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
  /**
   * Utility method to deserialize multiple LocalValues at once
   *
   * @param serializedValues Array of serialized LocalValue objects
   * @returns Array of deserialized JavaScript values
   */
  static fromLocalValueArray(serializedValues) {
    return serializedValues.map((value) => _RemoteValue.fromLocalValue(value));
  }
  /**
   * Verifies if the given object matches the structure of a serialized LocalValue
   *
   * @param obj Object to verify
   * @returns boolean indicating if the object has LocalValue structure
   */
  static isLocalValueObject(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    if (!obj.hasOwnProperty(TYPE_CONSTANT)) {
      return false;
    }
    const type = obj[TYPE_CONSTANT];
    const hasTypeProperty = Object.values({ ...PrimitiveType, ...NonPrimitiveType }).includes(type);
    if (!hasTypeProperty) {
      return false;
    }
    if (type !== "null" && type !== "undefined") {
      return obj.hasOwnProperty(VALUE_CONSTANT);
    }
    return true;
  }
};
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
function deserializeProperty(value) {
  if (typeof value !== "string" || !value.startsWith(SERIALIZED_PREFIX)) {
    return value;
  }
  return RemoteValue.fromLocalValue(JSON.parse(atob(value.slice(SERIALIZED_PREFIX.length))));
}
function createStyleSheetIfNeededAndSupported(styles2) {
  if (!styles2 || !supportsConstructableStylesheets) return void 0;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styles2);
  return sheet;
}
var globalStyleSheet;
function createShadowRoot(cmpMeta) {
  var _a;
  const shadowRoot = BUILD.shadowDelegatesFocus ? this.attachShadow({
    mode: "open",
    delegatesFocus: !!(cmpMeta.$flags$ & 16)
  }) : this.attachShadow({ mode: "open" });
  if (globalStyleSheet === void 0) globalStyleSheet = (_a = createStyleSheetIfNeededAndSupported(globalStyles)) != null ? _a : null;
  if (globalStyleSheet) {
    if (supportsMutableAdoptedStyleSheets) {
      shadowRoot.adoptedStyleSheets.push(globalStyleSheet);
    } else {
      shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, globalStyleSheet];
    }
  }
}
var lowerPathParam = (fn) => (p) => fn(p.toLowerCase());
var isDtsFile = lowerPathParam((p) => p.endsWith(".d.ts") || p.endsWith(".d.mts") || p.endsWith(".d.cts"));
var isTsFile = lowerPathParam(
  (p) => !isDtsFile(p) && (p.endsWith(".ts") || p.endsWith(".mts") || p.endsWith(".cts"))
);
var isTsxFile = lowerPathParam(
  (p) => p.endsWith(".tsx") || p.endsWith(".mtsx") || p.endsWith(".ctsx")
);
var isJsxFile = lowerPathParam(
  (p) => p.endsWith(".jsx") || p.endsWith(".mjsx") || p.endsWith(".cjsx")
);
var isJsFile = lowerPathParam((p) => p.endsWith(".js") || p.endsWith(".mjs") || p.endsWith(".cjs"));
var updateFallbackSlotVisibility = (elm) => {
  const childNodes = internalCall(elm, "childNodes");
  if (elm.tagName && elm.tagName.includes("-") && elm["s-cr"] && elm.tagName !== "SLOT-FB") {
    getHostSlotNodes(childNodes, elm.tagName).forEach((slotNode) => {
      if (slotNode.nodeType === 1 && slotNode.tagName === "SLOT-FB") {
        if (getSlotChildSiblings(slotNode, getSlotName(slotNode), false).length) {
          slotNode.hidden = true;
        } else {
          slotNode.hidden = false;
        }
      }
    });
  }
  let i2 = 0;
  for (i2 = 0; i2 < childNodes.length; i2++) {
    const childNode = childNodes[i2];
    if (childNode.nodeType === 1 && internalCall(childNode, "childNodes").length) {
      updateFallbackSlotVisibility(childNode);
    }
  }
};
var getSlottedChildNodes = (childNodes) => {
  const result = [];
  for (let i2 = 0; i2 < childNodes.length; i2++) {
    const slottedNode = childNodes[i2]["s-nr"] || void 0;
    if (slottedNode && slottedNode.isConnected) {
      result.push(slottedNode);
    }
  }
  return result;
};
function getHostSlotNodes(childNodes, hostName, slotName) {
  let i2 = 0;
  let slottedNodes = [];
  let childNode;
  for (; i2 < childNodes.length; i2++) {
    childNode = childNodes[i2];
    if (childNode["s-sr"] && (!hostName || childNode["s-hn"] === hostName) && (slotName === void 0 || getSlotName(childNode) === slotName)) {
      slottedNodes.push(childNode);
      if (typeof slotName !== "undefined") return slottedNodes;
    }
    slottedNodes = [...slottedNodes, ...getHostSlotNodes(childNode.childNodes, hostName, slotName)];
  }
  return slottedNodes;
}
var getSlotChildSiblings = (slot, slotName, includeSlot = true) => {
  const childNodes = [];
  if (includeSlot && slot["s-sr"] || !slot["s-sr"]) childNodes.push(slot);
  let node = slot;
  while (node = node.nextSibling) {
    if (getSlotName(node) === slotName && (includeSlot || !node["s-sr"])) childNodes.push(node);
  }
  return childNodes;
};
var isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
  if (nodeToRelocate.nodeType === 1) {
    if (nodeToRelocate.getAttribute("slot") === null && slotName === "") {
      return true;
    }
    if (nodeToRelocate.getAttribute("slot") === slotName) {
      return true;
    }
    return false;
  }
  if (nodeToRelocate["s-sn"] === slotName) {
    return true;
  }
  return slotName === "";
};
var addSlotRelocateNode = (newChild, slotNode, prepend, position) => {
  if (newChild["s-ol"] && newChild["s-ol"].isConnected) {
    return;
  }
  const slottedNodeLocation = document.createTextNode("");
  slottedNodeLocation["s-nr"] = newChild;
  if (!slotNode["s-cr"] || !slotNode["s-cr"].parentNode) return;
  const parent = slotNode["s-cr"].parentNode;
  const appendMethod = prepend ? internalCall(parent, "prepend") : internalCall(parent, "appendChild");
  if (BUILD.hydrateClientSide && typeof position !== "undefined") {
    slottedNodeLocation["s-oo"] = position;
    const childNodes = internalCall(parent, "childNodes");
    const slotRelocateNodes = [slottedNodeLocation];
    childNodes.forEach((n) => {
      if (n["s-nr"]) slotRelocateNodes.push(n);
    });
    slotRelocateNodes.sort((a, b) => {
      if (!a["s-oo"] || a["s-oo"] < (b["s-oo"] || 0)) return -1;
      else if (!b["s-oo"] || b["s-oo"] < a["s-oo"]) return 1;
      return 0;
    });
    slotRelocateNodes.forEach((n) => appendMethod.call(parent, n));
  } else {
    appendMethod.call(parent, slottedNodeLocation);
  }
  newChild["s-ol"] = slottedNodeLocation;
  newChild["s-sh"] = slotNode["s-hn"];
};
var getSlotName = (node) => typeof node["s-sn"] === "string" ? node["s-sn"] : node.nodeType === 1 && node.getAttribute("slot") || void 0;
function patchSlotNode(node) {
  if (node.assignedElements || node.assignedNodes || !node["s-sr"]) return;
  const assignedFactory = (elementsOnly) => (function(opts) {
    const toReturn = [];
    const slotName = this["s-sn"];
    if (opts == null ? void 0 : opts.flatten) {
      console.error(`
          Flattening is not supported for Stencil non-shadow slots.
          You can use \`.childNodes\` to nested slot fallback content.
          If you have a particular use case, please open an issue on the Stencil repo.
        `);
    }
    const parent = this["s-cr"].parentElement;
    const slottedNodes = parent.__childNodes ? parent.childNodes : getSlottedChildNodes(parent.childNodes);
    slottedNodes.forEach((n) => {
      if (slotName === getSlotName(n)) {
        toReturn.push(n);
      }
    });
    if (elementsOnly) {
      return toReturn.filter(
        (n) => n.nodeType === 1
        /* ElementNode */
      );
    }
    return toReturn;
  }).bind(node);
  node.assignedElements = assignedFactory(true);
  node.assignedNodes = assignedFactory(false);
}
function dispatchSlotChangeEvent(elm) {
  elm.dispatchEvent(new CustomEvent("slotchange", { bubbles: false, cancelable: false, composed: false }));
}
function findSlotFromSlottedNode(slottedNode, parentHost) {
  var _a;
  parentHost = parentHost || ((_a = slottedNode["s-ol"]) == null ? void 0 : _a.parentElement);
  if (!parentHost) return { slotNode: null, slotName: "" };
  const slotName = slottedNode["s-sn"] = getSlotName(slottedNode) || "";
  const childNodes = internalCall(parentHost, "childNodes");
  const slotNode = getHostSlotNodes(childNodes, parentHost.tagName, slotName)[0];
  return { slotNode, slotName };
}
var patchPseudoShadowDom = (hostElementPrototype) => {
  patchCloneNode(hostElementPrototype);
  patchSlotAppendChild(hostElementPrototype);
  patchSlotAppend(hostElementPrototype);
  patchSlotPrepend(hostElementPrototype);
  patchSlotInsertAdjacentElement(hostElementPrototype);
  patchSlotInsertAdjacentHTML(hostElementPrototype);
  patchSlotInsertAdjacentText(hostElementPrototype);
  patchInsertBefore(hostElementPrototype);
  patchTextContent(hostElementPrototype);
  patchChildSlotNodes(hostElementPrototype);
  patchSlotRemoveChild(hostElementPrototype);
};
var patchCloneNode = (HostElementPrototype) => {
  const orgCloneNode = HostElementPrototype.cloneNode;
  HostElementPrototype.cloneNode = function(deep) {
    const srcNode = this;
    const isShadowDom = BUILD.shadowDom ? srcNode.shadowRoot && supportsShadow : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (BUILD.slot && !isShadowDom && deep) {
      let i2 = 0;
      let slotted, nonStencilNode;
      const stencilPrivates = [
        "s-id",
        "s-cr",
        "s-lr",
        "s-rc",
        "s-sc",
        "s-p",
        "s-cn",
        "s-sr",
        "s-sn",
        "s-hn",
        "s-ol",
        "s-nr",
        "s-si",
        "s-rf",
        "s-scs"
      ];
      const childNodes = this.__childNodes || this.childNodes;
      for (; i2 < childNodes.length; i2++) {
        slotted = childNodes[i2]["s-nr"];
        nonStencilNode = stencilPrivates.every((privateField) => !childNodes[i2][privateField]);
        if (slotted) {
          if (BUILD.appendChildSlotFix && clonedNode.__appendChild) {
            clonedNode.__appendChild(slotted.cloneNode(true));
          } else {
            clonedNode.appendChild(slotted.cloneNode(true));
          }
        }
        if (nonStencilNode) {
          clonedNode.appendChild(childNodes[i2].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};
var patchSlotAppendChild = (HostElementPrototype) => {
  HostElementPrototype.__appendChild = HostElementPrototype.appendChild;
  HostElementPrototype.appendChild = function(newChild) {
    const { slotName, slotNode } = findSlotFromSlottedNode(newChild, this);
    if (slotNode) {
      addSlotRelocateNode(newChild, slotNode);
      const slotChildNodes = getSlotChildSiblings(slotNode, slotName);
      const appendAfter = slotChildNodes[slotChildNodes.length - 1];
      const parent = internalCall(appendAfter, "parentNode");
      const insertedNode = internalCall(parent, "insertBefore")(newChild, appendAfter.nextSibling);
      dispatchSlotChangeEvent(slotNode);
      updateFallbackSlotVisibility(this);
      return insertedNode;
    }
    return this.__appendChild(newChild);
  };
};
var patchSlotRemoveChild = (ElementPrototype) => {
  ElementPrototype.__removeChild = ElementPrototype.removeChild;
  ElementPrototype.removeChild = function(toRemove) {
    if (toRemove && typeof toRemove["s-sn"] !== "undefined") {
      const childNodes = this.__childNodes || this.childNodes;
      const slotNode = getHostSlotNodes(childNodes, this.tagName, toRemove["s-sn"]);
      if (slotNode && toRemove.isConnected) {
        toRemove.remove();
        updateFallbackSlotVisibility(this);
        return;
      }
    }
    return this.__removeChild(toRemove);
  };
};
var patchSlotPrepend = (HostElementPrototype) => {
  HostElementPrototype.__prepend = HostElementPrototype.prepend;
  HostElementPrototype.prepend = function(...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      const slotName = (newChild["s-sn"] = getSlotName(newChild)) || "";
      const childNodes = internalCall(this, "childNodes");
      const slotNode = getHostSlotNodes(childNodes, this.tagName, slotName)[0];
      if (slotNode) {
        addSlotRelocateNode(newChild, slotNode, true);
        const slotChildNodes = getSlotChildSiblings(slotNode, slotName);
        const appendAfter = slotChildNodes[0];
        const parent = internalCall(appendAfter, "parentNode");
        const toReturn = internalCall(parent, "insertBefore")(newChild, internalCall(appendAfter, "nextSibling"));
        dispatchSlotChangeEvent(slotNode);
        return toReturn;
      }
      if (newChild.nodeType === 1 && !!newChild.getAttribute("slot")) {
        newChild.hidden = true;
      }
      return HostElementPrototype.__prepend(newChild);
    });
  };
};
var patchSlotAppend = (HostElementPrototype) => {
  HostElementPrototype.__append = HostElementPrototype.append;
  HostElementPrototype.append = function(...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      this.appendChild(newChild);
    });
  };
};
var patchSlotInsertAdjacentHTML = (HostElementPrototype) => {
  const originalInsertAdjacentHtml = HostElementPrototype.insertAdjacentHTML;
  HostElementPrototype.insertAdjacentHTML = function(position, text) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentHtml.call(this, position, text);
    }
    const container = this.ownerDocument.createElement("_");
    let node;
    container.innerHTML = text;
    if (position === "afterbegin") {
      while (node = container.firstChild) {
        this.prepend(node);
      }
    } else if (position === "beforeend") {
      while (node = container.firstChild) {
        this.append(node);
      }
    }
  };
};
var patchSlotInsertAdjacentText = (HostElementPrototype) => {
  HostElementPrototype.insertAdjacentText = function(position, text) {
    this.insertAdjacentHTML(position, text);
  };
};
var patchInsertBefore = (HostElementPrototype) => {
  const eleProto = HostElementPrototype;
  if (eleProto.__insertBefore) return;
  eleProto.__insertBefore = HostElementPrototype.insertBefore;
  HostElementPrototype.insertBefore = function(newChild, currentChild) {
    const { slotName, slotNode } = findSlotFromSlottedNode(newChild, this);
    const slottedNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
    if (slotNode) {
      let found = false;
      slottedNodes.forEach((childNode) => {
        if (childNode === currentChild || currentChild === null) {
          found = true;
          if (currentChild === null || slotName !== currentChild["s-sn"]) {
            this.appendChild(newChild);
            return;
          }
          if (slotName === currentChild["s-sn"]) {
            addSlotRelocateNode(newChild, slotNode);
            const parent = internalCall(currentChild, "parentNode");
            internalCall(parent, "insertBefore")(newChild, currentChild);
            dispatchSlotChangeEvent(slotNode);
          }
          return;
        }
      });
      if (found) return newChild;
    }
    const parentNode = currentChild == null ? void 0 : currentChild.__parentNode;
    if (parentNode && !this.isSameNode(parentNode)) {
      return this.appendChild(newChild);
    }
    return this.__insertBefore(newChild, currentChild);
  };
};
var patchSlotInsertAdjacentElement = (HostElementPrototype) => {
  const originalInsertAdjacentElement = HostElementPrototype.insertAdjacentElement;
  HostElementPrototype.insertAdjacentElement = function(position, element) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentElement.call(this, position, element);
    }
    if (position === "afterbegin") {
      this.prepend(element);
      return element;
    } else if (position === "beforeend") {
      this.append(element);
      return element;
    }
    return element;
  };
};
var patchTextContent = (hostElementPrototype) => {
  patchHostOriginalAccessor("textContent", hostElementPrototype);
  Object.defineProperty(hostElementPrototype, "textContent", {
    get: function() {
      let text = "";
      const childNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
      childNodes.forEach((node) => text += node.textContent || "");
      return text;
    },
    set: function(value) {
      const childNodes = this.__childNodes ? this.childNodes : getSlottedChildNodes(this.childNodes);
      childNodes.forEach((node) => {
        if (node["s-ol"]) node["s-ol"].remove();
        node.remove();
      });
      this.insertAdjacentHTML("beforeend", value);
    }
  });
};
var patchChildSlotNodes = (elm) => {
  class FakeNodeList extends Array {
    item(n) {
      return this[n];
    }
  }
  patchHostOriginalAccessor("children", elm);
  Object.defineProperty(elm, "children", {
    get() {
      return this.childNodes.filter((n) => n.nodeType === 1);
    }
  });
  Object.defineProperty(elm, "childElementCount", {
    get() {
      return this.children.length;
    }
  });
  patchHostOriginalAccessor("firstChild", elm);
  Object.defineProperty(elm, "firstChild", {
    get() {
      return this.childNodes[0];
    }
  });
  patchHostOriginalAccessor("lastChild", elm);
  Object.defineProperty(elm, "lastChild", {
    get() {
      return this.childNodes[this.childNodes.length - 1];
    }
  });
  patchHostOriginalAccessor("childNodes", elm);
  Object.defineProperty(elm, "childNodes", {
    get() {
      const result = new FakeNodeList();
      result.push(...getSlottedChildNodes(this.__childNodes));
      return result;
    }
  });
};
var patchSlottedNode = (node) => {
  if (!node || node.__nextSibling !== void 0 || !globalThis.Node) return;
  patchNextSibling(node);
  patchPreviousSibling(node);
  patchParentNode(node);
  if (node.nodeType === Node.ELEMENT_NODE) {
    patchNextElementSibling(node);
    patchPreviousElementSibling(node);
  }
};
var patchNextSibling = (node) => {
  if (!node || node.__nextSibling) return;
  patchHostOriginalAccessor("nextSibling", node);
  Object.defineProperty(node, "nextSibling", {
    get: function() {
      var _a;
      const parentNodes = (_a = this["s-ol"]) == null ? void 0 : _a.parentNode.childNodes;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index + 1];
      }
      return this.__nextSibling;
    }
  });
};
var patchNextElementSibling = (element) => {
  if (!element || element.__nextElementSibling) return;
  patchHostOriginalAccessor("nextElementSibling", element);
  Object.defineProperty(element, "nextElementSibling", {
    get: function() {
      var _a;
      const parentEles = (_a = this["s-ol"]) == null ? void 0 : _a.parentNode.children;
      const index = parentEles == null ? void 0 : parentEles.indexOf(this);
      if (parentEles && index > -1) {
        return parentEles[index + 1];
      }
      return this.__nextElementSibling;
    }
  });
};
var patchPreviousSibling = (node) => {
  if (!node || node.__previousSibling) return;
  patchHostOriginalAccessor("previousSibling", node);
  Object.defineProperty(node, "previousSibling", {
    get: function() {
      var _a;
      const parentNodes = (_a = this["s-ol"]) == null ? void 0 : _a.parentNode.childNodes;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index - 1];
      }
      return this.__previousSibling;
    }
  });
};
var patchPreviousElementSibling = (element) => {
  if (!element || element.__previousElementSibling) return;
  patchHostOriginalAccessor("previousElementSibling", element);
  Object.defineProperty(element, "previousElementSibling", {
    get: function() {
      var _a;
      const parentNodes = (_a = this["s-ol"]) == null ? void 0 : _a.parentNode.children;
      const index = parentNodes == null ? void 0 : parentNodes.indexOf(this);
      if (parentNodes && index > -1) {
        return parentNodes[index - 1];
      }
      return this.__previousElementSibling;
    }
  });
};
var patchParentNode = (node) => {
  if (!node || node.__parentNode) return;
  patchHostOriginalAccessor("parentNode", node);
  Object.defineProperty(node, "parentNode", {
    get: function() {
      var _a;
      return ((_a = this["s-ol"]) == null ? void 0 : _a.parentNode) || this.__parentNode;
    },
    set: function(value) {
      this.__parentNode = value;
    }
  });
};
var validElementPatches = ["children", "nextElementSibling", "previousElementSibling"];
var validNodesPatches = [
  "childNodes",
  "firstChild",
  "lastChild",
  "nextSibling",
  "previousSibling",
  "textContent",
  "parentNode"
];
function patchHostOriginalAccessor(accessorName, node) {
  if (!globalThis.Node || !globalThis.Element) {
    return;
  }
  let accessor;
  if (validElementPatches.includes(accessorName)) {
    accessor = Object.getOwnPropertyDescriptor(Element.prototype, accessorName);
  } else if (validNodesPatches.includes(accessorName)) {
    accessor = Object.getOwnPropertyDescriptor(Node.prototype, accessorName);
  }
  if (!accessor) {
    accessor = Object.getOwnPropertyDescriptor(node, accessorName);
  }
  if (accessor) Object.defineProperty(node, "__" + accessorName, accessor);
}
function internalCall(node, method) {
  if ("__" + method in node) {
    const toReturn = node["__" + method];
    if (typeof toReturn !== "function") return toReturn;
    return toReturn.bind(node);
  } else {
    if (typeof node[method] !== "function") return node[method];
    return node[method].bind(node);
  }
}
var i = 0;
var createTime = (fnName, tagName = "") => {
  if (BUILD.profile && performance.mark) {
    const key = `st:${fnName}:${tagName}:${i++}`;
    performance.mark(key);
    return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key);
  } else {
    return () => {
      return;
    };
  }
};
var uniqueTime = (key, measureText) => {
  if (BUILD.profile && performance.mark) {
    if (performance.getEntriesByName(key, "mark").length === 0) {
      performance.mark(key);
    }
    return () => {
      if (performance.getEntriesByName(measureText, "measure").length === 0) {
        performance.measure(measureText, key);
      }
    };
  } else {
    return () => {
      return;
    };
  }
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === "string") {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId2 = getScopeId(cmpMeta, mode);
  const style = styles.get(scopeId2);
  if (!BUILD.attachStyles || !win.document) {
    return scopeId2;
  }
  styleContainerNode = styleContainerNode.nodeType === 11 ? styleContainerNode : win.document;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      if (!appliedStyles.has(scopeId2)) {
        if (BUILD.hydrateClientSide && styleContainerNode.host && (styleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId2}"]`))) {
          styleElm.innerHTML = style;
        } else {
          styleElm = win.document.createElement("style");
          styleElm.innerHTML = style;
          const nonce = (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(win.document);
          if (nonce != null) {
            styleElm.setAttribute("nonce", nonce);
          }
          if ((BUILD.hydrateServerSide || BUILD.hotModuleReplacement) && (cmpMeta.$flags$ & 2 || cmpMeta.$flags$ & 128)) {
            styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId2);
          }
          if (!(cmpMeta.$flags$ & 1)) {
            if (styleContainerNode.nodeName === "HEAD") {
              const preconnectLinks = styleContainerNode.querySelectorAll("link[rel=preconnect]");
              const referenceNode2 = preconnectLinks.length > 0 ? preconnectLinks[preconnectLinks.length - 1].nextSibling : styleContainerNode.querySelector("style");
              styleContainerNode.insertBefore(
                styleElm,
                (referenceNode2 == null ? void 0 : referenceNode2.parentNode) === styleContainerNode ? referenceNode2 : null
              );
            } else if ("host" in styleContainerNode) {
              if (supportsConstructableStylesheets) {
                const stylesheet = new CSSStyleSheet();
                stylesheet.replaceSync(style);
                if (supportsMutableAdoptedStyleSheets) {
                  styleContainerNode.adoptedStyleSheets.unshift(stylesheet);
                } else {
                  styleContainerNode.adoptedStyleSheets = [stylesheet, ...styleContainerNode.adoptedStyleSheets];
                }
              } else {
                const existingStyleContainer = styleContainerNode.querySelector("style");
                if (existingStyleContainer) {
                  existingStyleContainer.innerHTML = style + existingStyleContainer.innerHTML;
                } else {
                  styleContainerNode.prepend(styleElm);
                }
              }
            } else {
              styleContainerNode.append(styleElm);
            }
          }
          if (cmpMeta.$flags$ & 1) {
            styleContainerNode.insertBefore(styleElm, null);
          }
        }
        if (cmpMeta.$flags$ & 4) {
          styleElm.innerHTML += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (BUILD.constructableCSS && !styleContainerNode.adoptedStyleSheets.includes(style)) {
      if (supportsMutableAdoptedStyleSheets) {
        styleContainerNode.adoptedStyleSheets.push(style);
      } else {
        styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
      }
    }
  }
  return scopeId2;
};
var attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(
    BUILD.shadowDom && supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$
  );
  if ((BUILD.shadowDom || BUILD.scoped) && BUILD.cssAnnotations && flags & 10) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) => "sc-" + (BUILD.mode && mode && cmp.$flags$ & 32 ? cmp.$tagName$ + "-" + mode : cmp.$tagName$);
var convertScopedToShadow = (css) => css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
var hydrateScopedToShadow = () => {
  if (!win.document) {
    return;
  }
  const styles2 = win.document.querySelectorAll(`[${HYDRATED_STYLE_ID}]`);
  let i2 = 0;
  for (; i2 < styles2.length; i2++) {
    registerStyle(styles2[i2].getAttribute(HYDRATED_STYLE_ID), convertScopedToShadow(styles2[i2].innerHTML), true);
  }
};
var h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
          child = String(child);
        } else if (BUILD.isDev && typeof nodeName !== "function" && child.$flags$ === void 0) {
          consoleDevError(`vNode passed as children has unexpected type.
Make sure it's using the correct h() function.
Empty objects can also be the cause, look for JSX comments that became objects.`);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  if (vnodeData) {
    if (BUILD.isDev && nodeName === "input") {
      validateInputProperties(vnodeData);
    }
    if (BUILD.vdomKey && vnodeData.key) {
      key = vnodeData.key;
    }
    if (BUILD.slotRelocation && vnodeData.name) {
      slotName = vnodeData.name;
    }
    if (BUILD.vdomClass) {
      const classData = vnodeData.className || vnodeData.class;
      if (classData) {
        vnodeData.class = typeof classData !== "object" ? classData : Object.keys(classData).filter((k) => classData[k]).join(" ");
      }
    }
  }
  if (BUILD.isDev && vNodeChildren.some(isHost)) {
    consoleDevError(`The <Host> must be the single root component. Make sure:
- You are NOT using hostData() and <Host> in the same component.
- <Host> is used once, and it's the single root component of the render() function.`);
  }
  if (BUILD.vdomFunctional && typeof nodeName === "function") {
    return nodeName(
      vnodeData === null ? {} : vnodeData,
      vNodeChildren,
      vdomFnUtils
    );
  }
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  if (BUILD.vdomKey) {
    vnode.$key$ = key;
  }
  if (BUILD.slotRelocation) {
    vnode.$name$ = slotName;
  }
  return vnode;
};
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null
  };
  if (BUILD.vdomAttribute) {
    vnode.$attrs$ = null;
  }
  if (BUILD.vdomKey) {
    vnode.$key$ = null;
  }
  if (BUILD.slotRelocation) {
    vnode.$name$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = (node) => node && node.$tag$ === Host;
var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate)
};
var convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$
});
var convertToPrivate = (node) => {
  if (typeof node.vtag === "function") {
    const vnodeData = { ...node.vattrs };
    if (node.vkey) {
      vnodeData.key = node.vkey;
    }
    if (node.vname) {
      vnodeData.name = node.vname;
    }
    return h(node.vtag, vnodeData, ...node.vchildren || []);
  }
  const vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};
var validateInputProperties = (inputElm) => {
  const props = Object.keys(inputElm);
  const value = props.indexOf("value");
  if (value === -1) {
    return;
  }
  const typeIndex = props.indexOf("type");
  const minIndex = props.indexOf("min");
  const maxIndex = props.indexOf("max");
  const stepIndex = props.indexOf("step");
  if (value < typeIndex || value < minIndex || value < maxIndex || value < stepIndex) {
    consoleDevWarn(`The "value" prop of <input> should be set after "min", "max", "type" and "step"`);
  }
};
var initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  var _a, _b;
  const endHydrate = createTime("hydrateClient", tagName);
  const shadowRoot = hostElm.shadowRoot;
  const childRenderNodes = [];
  const slotNodes = [];
  const slottedNodes = [];
  const shadowRootNodes = BUILD.shadowDom && shadowRoot ? [] : null;
  const vnode = newVNode(tagName, null);
  vnode.$elm$ = hostElm;
  let scopeId2;
  if (BUILD.scoped) {
    const cmpMeta = hostRef.$cmpMeta$;
    if (cmpMeta && cmpMeta.$flags$ & 10 && hostElm["s-sc"]) {
      scopeId2 = hostElm["s-sc"];
      hostElm.classList.add(scopeId2 + "-h");
    } else if (hostElm["s-sc"]) {
      delete hostElm["s-sc"];
    }
  }
  if (win.document && (!plt.$orgLocNodes$ || !plt.$orgLocNodes$.size)) {
    initializeDocumentHydrate(win.document.body, plt.$orgLocNodes$ = /* @__PURE__ */ new Map());
  }
  hostElm[HYDRATE_ID] = hostId;
  hostElm.removeAttribute(HYDRATE_ID);
  hostRef.$vnode$ = clientHydrate(
    vnode,
    childRenderNodes,
    slotNodes,
    shadowRootNodes,
    hostElm,
    hostElm,
    hostId,
    slottedNodes
  );
  let crIndex = 0;
  const crLength = childRenderNodes.length;
  let childRenderNode;
  for (crIndex; crIndex < crLength; crIndex++) {
    childRenderNode = childRenderNodes[crIndex];
    const orgLocationId = childRenderNode.$hostId$ + "." + childRenderNode.$nodeId$;
    const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
    const node = childRenderNode.$elm$;
    if (!shadowRoot) {
      node["s-hn"] = tagName.toUpperCase();
      if (childRenderNode.$tag$ === "slot") {
        node["s-cr"] = hostElm["s-cr"];
      }
    } else if (((_a = childRenderNode.$tag$) == null ? void 0 : _a.toString().includes("-")) && childRenderNode.$tag$ !== "slot-fb" && !childRenderNode.$elm$.shadowRoot) {
      const cmpMeta = getHostRef(childRenderNode.$elm$);
      if (cmpMeta) {
        const scopeId3 = getScopeId(
          cmpMeta.$cmpMeta$,
          BUILD.mode ? childRenderNode.$elm$.getAttribute("s-mode") : void 0
        );
        const styleSheet = win.document.querySelector(`style[sty-id="${scopeId3}"]`);
        if (styleSheet) {
          hostElm.shadowRoot.append(styleSheet.cloneNode(true));
        }
      }
    }
    if (childRenderNode.$tag$ === "slot") {
      childRenderNode.$name$ = childRenderNode.$elm$["s-sn"] || childRenderNode.$elm$["name"] || null;
      if (childRenderNode.$children$) {
        childRenderNode.$flags$ |= 2;
        if (!childRenderNode.$elm$.childNodes.length) {
          childRenderNode.$children$.forEach((c) => {
            childRenderNode.$elm$.appendChild(c.$elm$);
          });
        }
      } else {
        childRenderNode.$flags$ |= 1;
      }
    }
    if (orgLocationNode && orgLocationNode.isConnected) {
      if (orgLocationNode.parentElement.shadowRoot && orgLocationNode["s-en"] === "") {
        orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
      }
      orgLocationNode.parentNode.removeChild(orgLocationNode);
      if (!shadowRoot) {
        node["s-oo"] = parseInt(childRenderNode.$nodeId$);
      }
    }
    if (orgLocationNode && !orgLocationNode["s-id"]) {
      plt.$orgLocNodes$.delete(orgLocationId);
    }
  }
  const hosts = [];
  const snLen = slottedNodes.length;
  let snIndex = 0;
  let slotGroup;
  let snGroupIdx;
  let snGroupLen;
  let slottedItem;
  for (snIndex; snIndex < snLen; snIndex++) {
    slotGroup = slottedNodes[snIndex];
    if (!slotGroup || !slotGroup.length) continue;
    snGroupLen = slotGroup.length;
    snGroupIdx = 0;
    for (snGroupIdx; snGroupIdx < snGroupLen; snGroupIdx++) {
      slottedItem = slotGroup[snGroupIdx];
      if (!hosts[slottedItem.hostId]) {
        hosts[slottedItem.hostId] = plt.$orgLocNodes$.get(slottedItem.hostId);
      }
      if (!hosts[slottedItem.hostId]) continue;
      const hostEle = hosts[slottedItem.hostId];
      if (hostEle.shadowRoot && slottedItem.node.parentElement !== hostEle) {
        hostEle.appendChild(slottedItem.node);
      }
      if (!hostEle.shadowRoot || !shadowRoot) {
        if (!slottedItem.slot["s-cr"]) {
          slottedItem.slot["s-cr"] = hostEle["s-cr"];
          if (!slottedItem.slot["s-cr"] && hostEle.shadowRoot) {
            slottedItem.slot["s-cr"] = hostEle;
          } else {
            slottedItem.slot["s-cr"] = (hostEle.__childNodes || hostEle.childNodes)[0];
          }
        }
        addSlotRelocateNode(slottedItem.node, slottedItem.slot, false, slottedItem.node["s-oo"]);
        if (((_b = slottedItem.node.parentElement) == null ? void 0 : _b.shadowRoot) && slottedItem.node["getAttribute"] && slottedItem.node.getAttribute("slot")) {
          slottedItem.node.removeAttribute("slot");
        }
        if (BUILD.experimentalSlotFixes) {
          patchSlottedNode(slottedItem.node);
        }
      }
    }
  }
  if (BUILD.scoped && scopeId2 && slotNodes.length) {
    slotNodes.forEach((slot) => {
      slot.$elm$.parentElement.classList.add(scopeId2 + "-s");
    });
  }
  if (BUILD.shadowDom && shadowRoot) {
    let rnIdex = 0;
    const rnLen = shadowRootNodes.length;
    if (rnLen) {
      for (rnIdex; rnIdex < rnLen; rnIdex++) {
        const node = shadowRootNodes[rnIdex];
        if (node) {
          shadowRoot.appendChild(node);
        }
      }
      Array.from(hostElm.childNodes).forEach((node) => {
        if (typeof node["s-en"] !== "string" && typeof node["s-sn"] !== "string") {
          if (node.nodeType === 1 && node.slot && node.hidden) {
            node.removeAttribute("hidden");
          } else if (node.nodeType === 8 && !node.nodeValue || node.nodeType === 3 && !node.wholeText.trim()) {
            node.parentNode.removeChild(node);
          }
        }
      });
    }
  }
  hostRef.$hostElement$ = hostElm;
  endHydrate();
};
var clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId, slottedNodes = []) => {
  let childNodeType;
  let childIdSplt;
  let childVNode;
  let i2;
  const scopeId2 = hostElm["s-sc"];
  if (node.nodeType === 1) {
    childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
    if (childNodeType) {
      childIdSplt = childNodeType.split(".");
      if (childIdSplt[0] === hostId || childIdSplt[0] === "0") {
        childVNode = createSimpleVNode({
          $flags$: 0,
          $hostId$: childIdSplt[0],
          $nodeId$: childIdSplt[1],
          $depth$: childIdSplt[2],
          $index$: childIdSplt[3],
          $tag$: node.tagName.toLowerCase(),
          $elm$: node,
          // If we don't add the initial classes to the VNode, the first `vdom-render.ts` patch
          // won't try to reconcile them. Classes set on the node will be blown away.
          $attrs$: { class: node.className || "" }
        });
        childRenderNodes.push(childVNode);
        node.removeAttribute(HYDRATE_CHILD_ID);
        if (!parentVNode.$children$) {
          parentVNode.$children$ = [];
        }
        if (BUILD.scoped && scopeId2 && childIdSplt[0] === hostId) {
          node["s-si"] = scopeId2;
          childVNode.$attrs$.class += " " + scopeId2;
        }
        const slotName = childVNode.$elm$.getAttribute("s-sn");
        if (typeof slotName === "string") {
          if (childVNode.$tag$ === "slot-fb") {
            addSlot(
              slotName,
              childIdSplt[2],
              childVNode,
              node,
              parentVNode,
              childRenderNodes,
              slotNodes,
              shadowRootNodes,
              slottedNodes
            );
            if (BUILD.scoped && scopeId2) {
              node.classList.add(scopeId2);
            }
          }
          childVNode.$elm$["s-sn"] = slotName;
          childVNode.$elm$.removeAttribute("s-sn");
        }
        if (childVNode.$index$ !== void 0) {
          parentVNode.$children$[childVNode.$index$] = childVNode;
        }
        parentVNode = childVNode;
        if (shadowRootNodes && childVNode.$depth$ === "0") {
          shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
        }
      }
    }
    if (node.shadowRoot) {
      for (i2 = node.shadowRoot.childNodes.length - 1; i2 >= 0; i2--) {
        clientHydrate(
          parentVNode,
          childRenderNodes,
          slotNodes,
          shadowRootNodes,
          hostElm,
          node.shadowRoot.childNodes[i2],
          hostId,
          slottedNodes
        );
      }
    }
    const nonShadowNodes = node.__childNodes || node.childNodes;
    for (i2 = nonShadowNodes.length - 1; i2 >= 0; i2--) {
      clientHydrate(
        parentVNode,
        childRenderNodes,
        slotNodes,
        shadowRootNodes,
        hostElm,
        nonShadowNodes[i2],
        hostId,
        slottedNodes
      );
    }
  } else if (node.nodeType === 8) {
    childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[1] === hostId || childIdSplt[1] === "0") {
      childNodeType = childIdSplt[0];
      childVNode = createSimpleVNode({
        $hostId$: childIdSplt[1],
        $nodeId$: childIdSplt[2],
        $depth$: childIdSplt[3],
        $index$: childIdSplt[4] || "0",
        $elm$: node,
        $attrs$: null,
        $children$: null,
        $key$: null,
        $name$: null,
        $tag$: null,
        $text$: null
      });
      if (childNodeType === TEXT_NODE_ID) {
        childVNode.$elm$ = findCorrespondingNode(
          node,
          3
          /* TextNode */
        );
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3) {
          childVNode.$text$ = childVNode.$elm$.textContent;
          childRenderNodes.push(childVNode);
          node.remove();
          if (hostId === childVNode.$hostId$) {
            if (!parentVNode.$children$) {
              parentVNode.$children$ = [];
            }
            parentVNode.$children$[childVNode.$index$] = childVNode;
          }
          if (shadowRootNodes && childVNode.$depth$ === "0") {
            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
          }
        }
      } else if (childNodeType === COMMENT_NODE_ID) {
        childVNode.$elm$ = findCorrespondingNode(
          node,
          8
          /* CommentNode */
        );
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 8) {
          childRenderNodes.push(childVNode);
          node.remove();
        }
      } else if (childVNode.$hostId$ === hostId) {
        if (childNodeType === SLOT_NODE_ID) {
          const slotName = node["s-sn"] = childIdSplt[5] || "";
          addSlot(
            slotName,
            childIdSplt[2],
            childVNode,
            node,
            parentVNode,
            childRenderNodes,
            slotNodes,
            shadowRootNodes,
            slottedNodes
          );
        } else if (childNodeType === CONTENT_REF_ID) {
          if (BUILD.shadowDom && shadowRootNodes) {
            node.remove();
          } else if (BUILD.slotRelocation) {
            hostElm["s-cr"] = node;
            node["s-cn"] = true;
          }
        }
      }
    }
  } else if (parentVNode && parentVNode.$tag$ === "style") {
    const vnode = newVNode(null, node.textContent);
    vnode.$elm$ = node;
    vnode.$index$ = "0";
    parentVNode.$children$ = [vnode];
  } else {
    if (node.nodeType === 3 && !node.wholeText.trim() && !node["s-nr"]) {
      node.remove();
    }
  }
  return parentVNode;
};
var initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1) {
    const componentId = node[HYDRATE_ID] || node.getAttribute(HYDRATE_ID);
    if (componentId) {
      orgLocNodes.set(componentId, node);
    }
    let i2 = 0;
    if (node.shadowRoot) {
      for (; i2 < node.shadowRoot.childNodes.length; i2++) {
        initializeDocumentHydrate(node.shadowRoot.childNodes[i2], orgLocNodes);
      }
    }
    const nonShadowNodes = node.__childNodes || node.childNodes;
    for (i2 = 0; i2 < nonShadowNodes.length; i2++) {
      initializeDocumentHydrate(nonShadowNodes[i2], orgLocNodes);
    }
  } else if (node.nodeType === 8) {
    const childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[0] === ORG_LOCATION_ID) {
      orgLocNodes.set(childIdSplt[1] + "." + childIdSplt[2], node);
      node.nodeValue = "";
      node["s-en"] = childIdSplt[3];
    }
  }
};
var createSimpleVNode = (vnode) => {
  const defaultVNode = {
    $flags$: 0,
    $hostId$: null,
    $nodeId$: null,
    $depth$: null,
    $index$: "0",
    $elm$: null,
    $attrs$: null,
    $children$: null,
    $key$: null,
    $name$: null,
    $tag$: null,
    $text$: null
  };
  return { ...defaultVNode, ...vnode };
};
function addSlot(slotName, slotId, childVNode, node, parentVNode, childRenderNodes, slotNodes, shadowRootNodes, slottedNodes) {
  node["s-sr"] = true;
  childVNode.$name$ = slotName || null;
  childVNode.$tag$ = "slot";
  const parentNodeId = (parentVNode == null ? void 0 : parentVNode.$elm$) ? parentVNode.$elm$["s-id"] || parentVNode.$elm$.getAttribute("s-id") : "";
  if (BUILD.shadowDom && shadowRootNodes && win.document) {
    const slot = childVNode.$elm$ = win.document.createElement(childVNode.$tag$);
    if (childVNode.$name$) {
      childVNode.$elm$.setAttribute("name", slotName);
    }
    if (parentVNode.$elm$.shadowRoot && parentNodeId && parentNodeId !== childVNode.$hostId$) {
      internalCall(parentVNode.$elm$, "insertBefore")(slot, internalCall(parentVNode.$elm$, "children")[0]);
    } else {
      internalCall(internalCall(node, "parentNode"), "insertBefore")(slot, node);
    }
    addSlottedNodes(slottedNodes, slotId, slotName, node, childVNode.$hostId$);
    node.remove();
    if (childVNode.$depth$ === "0") {
      shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
    }
  } else {
    const slot = childVNode.$elm$;
    const shouldMove = parentNodeId && parentNodeId !== childVNode.$hostId$ && parentVNode.$elm$.shadowRoot;
    addSlottedNodes(slottedNodes, slotId, slotName, node, shouldMove ? parentNodeId : childVNode.$hostId$);
    patchSlotNode(node);
    if (shouldMove) {
      parentVNode.$elm$.insertBefore(slot, parentVNode.$elm$.children[0]);
    }
  }
  childRenderNodes.push(childVNode);
  slotNodes.push(childVNode);
  if (!parentVNode.$children$) {
    parentVNode.$children$ = [];
  }
  parentVNode.$children$[childVNode.$index$] = childVNode;
}
var addSlottedNodes = (slottedNodes, slotNodeId, slotName, slotNode, hostId) => {
  var _a, _b;
  let slottedNode = slotNode.nextSibling;
  slottedNodes[slotNodeId] = slottedNodes[slotNodeId] || [];
  if (!slottedNode || ((_a = slottedNode.nodeValue) == null ? void 0 : _a.startsWith(SLOT_NODE_ID + "."))) return;
  do {
    if (slottedNode && ((slottedNode["getAttribute"] && slottedNode.getAttribute("slot") || slottedNode["s-sn"]) === slotName || slotName === "" && !slottedNode["s-sn"] && (!slottedNode["getAttribute"] || !slottedNode.getAttribute("slot")) && (slottedNode.nodeType === 8 || slottedNode.nodeType === 3))) {
      slottedNode["s-sn"] = slotName;
      slottedNodes[slotNodeId].push({ slot: slotNode, node: slottedNode, hostId });
    }
    slottedNode = slottedNode == null ? void 0 : slottedNode.nextSibling;
  } while (slottedNode && !((_b = slottedNode.nodeValue) == null ? void 0 : _b.startsWith(SLOT_NODE_ID + ".")));
};
var findCorrespondingNode = (node, type) => {
  let sibling = node;
  do {
    sibling = sibling.nextSibling;
  } while (sibling && (sibling.nodeType !== type || !sibling.nodeValue));
  return sibling;
};
var safeSelector = (selector) => {
  const placeholders = [];
  let index = 0;
  selector = selector.replace(/(\[\s*part~=\s*("[^"]*"|'[^']*')\s*\])/g, (_, keep) => {
    const replaceBy = `__part-${index}__`;
    placeholders.push(keep);
    index++;
    return replaceBy;
  });
  selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
    const replaceBy = `__ph-${index}__`;
    placeholders.push(keep);
    index++;
    return replaceBy;
  });
  const content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
    const replaceBy = `__ph-${index}__`;
    placeholders.push(exp);
    index++;
    return pseudo + replaceBy;
  });
  const ss = {
    content,
    placeholders
  };
  return ss;
};
var restoreSafeSelector = (placeholders, content) => {
  content = content.replace(/__part-(\d+)__/g, (_, index) => placeholders[+index]);
  return content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
};
var _polyfillHost = "-shadowcsshost";
var _polyfillSlotted = "-shadowcssslotted";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp("(" + _polyfillHostContext + _parenSuffix, "gim");
var _cssColonSlottedRe = new RegExp("(" + _polyfillSlotted + _parenSuffix, "gim");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
var _safePartRe = /__part-(\d+)__/g;
var _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
var _polyfillHostRe = /-shadowcsshost/gim;
var createSupportsRuleRe = (selector) => {
  const safeSelector2 = escapeRegExpSpecialCharacters(selector);
  return new RegExp(
    // First capture group: match any context before the selector that's not inside @supports selector()
    // Using negative lookahead to avoid matching inside @supports selector(...) condition
    `(^|[^@]|@(?!supports\\s+selector\\s*\\([^{]*?${safeSelector2}))(${safeSelector2}\\b)`,
    "g"
  );
};
var _colonSlottedRe = createSupportsRuleRe("::slotted");
var _colonHostRe = createSupportsRuleRe(":host");
var _colonHostContextRe = createSupportsRuleRe(":host-context");
var _commentRe = /\/\*\s*[\s\S]*?\*\//g;
var stripComments = (input) => {
  return input.replace(_commentRe, "");
};
var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
var extractCommentsWithHash = (input) => {
  return input.match(_commentWithHashRe) || [];
};
var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var _curlyRe = /([{}])/g;
var _selectorPartsRe = /(^.*?[^\\])??((:+)(.*)|$)/;
var OPEN_CURLY = "{";
var CLOSE_CURLY = "}";
var BLOCK_PLACEHOLDER = "%BLOCK%";
var processRules = (input, ruleCallback) => {
  const inputWithEscapedBlocks = escapeBlocks(input);
  let nextBlockIndex = 0;
  return inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
    const selector = m[2];
    let content = "";
    let suffix = m[4];
    let contentPrefix = "";
    if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
      content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
      suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
      contentPrefix = "{";
    }
    const cssRule = {
      selector,
      content
    };
    const rule = ruleCallback(cssRule);
    return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
  });
};
var escapeBlocks = (input) => {
  const inputParts = input.split(_curlyRe);
  const resultParts = [];
  const escapedBlocks = [];
  let bracketCount = 0;
  let currentBlockParts = [];
  for (let partIndex = 0; partIndex < inputParts.length; partIndex++) {
    const part = inputParts[partIndex];
    if (part === CLOSE_CURLY) {
      bracketCount--;
    }
    if (bracketCount > 0) {
      currentBlockParts.push(part);
    } else {
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(""));
        resultParts.push(BLOCK_PLACEHOLDER);
        currentBlockParts = [];
      }
      resultParts.push(part);
    }
    if (part === OPEN_CURLY) {
      bracketCount++;
    }
  }
  if (currentBlockParts.length > 0) {
    escapedBlocks.push(currentBlockParts.join(""));
    resultParts.push(BLOCK_PLACEHOLDER);
  }
  const strEscapedBlocks = {
    escapedString: resultParts.join(""),
    blocks: escapedBlocks
  };
  return strEscapedBlocks;
};
var insertPolyfillHostInCssText = (cssText) => {
  const supportsBlocks = [];
  cssText = cssText.replace(/@supports\s+selector\s*\(\s*([^)]*)\s*\)/g, (_, selectorContent) => {
    const placeholder = `__supports_${supportsBlocks.length}__`;
    supportsBlocks.push(selectorContent);
    return `@supports selector(${placeholder})`;
  });
  cssText = cssText.replace(_colonHostContextRe, `$1${_polyfillHostContext}`).replace(_colonHostRe, `$1${_polyfillHost}`).replace(_colonSlottedRe, `$1${_polyfillSlotted}`);
  supportsBlocks.forEach((originalSelector, index) => {
    cssText = cssText.replace(`__supports_${index}__`, originalSelector);
  });
  return cssText;
};
var convertColonRule = (cssText, regExp, partReplacer) => {
  return cssText.replace(regExp, (...m) => {
    if (m[2]) {
      const parts = m[2].split(",");
      const r = [];
      for (let i2 = 0; i2 < parts.length; i2++) {
        const p = parts[i2].trim();
        if (!p) break;
        r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
      }
      return r.join(",");
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
};
var colonHostPartReplacer = (host, part, suffix) => {
  return host + part.replace(_polyfillHost, "") + suffix;
};
var convertColonHost = (cssText) => {
  return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
};
var colonHostContextPartReplacer = (host, part, suffix) => {
  if (part.indexOf(_polyfillHost) > -1) {
    return colonHostPartReplacer(host, part, suffix);
  } else {
    return host + part + suffix + ", " + part + " " + host + suffix;
  }
};
var convertColonSlotted = (cssText, slotScopeId) => {
  const slotClass = "." + slotScopeId + " > ";
  const selectors = [];
  cssText = cssText.replace(_cssColonSlottedRe, (...m) => {
    if (m[2]) {
      const compound = m[2].trim();
      const suffix = m[3];
      const slottedSelector = slotClass + compound + suffix;
      let prefixSelector = "";
      for (let i2 = m[4] - 1; i2 >= 0; i2--) {
        const char = m[5][i2];
        if (char === "}" || char === ",") {
          break;
        }
        prefixSelector = char + prefixSelector;
      }
      const orgSelector = (prefixSelector + slottedSelector).trim();
      const addedSelector = `${prefixSelector.trimEnd()}${slottedSelector.trim()}`.trim();
      if (orgSelector !== addedSelector) {
        const updatedSelector = `${addedSelector}, ${orgSelector}`;
        selectors.push({
          orgSelector,
          updatedSelector
        });
      }
      return slottedSelector;
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
  return {
    selectors,
    cssText
  };
};
var convertColonHostContext = (cssText) => {
  return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
};
var convertShadowDOMSelectors = (cssText) => {
  return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, " "), cssText);
};
var makeScopeMatcher = (scopeSelector2) => {
  const lre = /\[/g;
  const rre = /\]/g;
  scopeSelector2 = scopeSelector2.replace(lre, "\\[").replace(rre, "\\]");
  return new RegExp("^(" + scopeSelector2 + ")" + _selectorReSuffix, "m");
};
var selectorNeedsScoping = (selector, scopeSelector2) => {
  const re = makeScopeMatcher(scopeSelector2);
  return !re.test(selector);
};
var injectScopingSelector = (selector, scopingSelector) => {
  return selector.replace(_selectorPartsRe, (_, before = "", _colonGroup, colon = "", after = "") => {
    return before + scopingSelector + colon + after;
  });
};
var applySimpleSelectorScope = (selector, scopeSelector2, hostSelector) => {
  _polyfillHostRe.lastIndex = 0;
  if (_polyfillHostRe.test(selector)) {
    const replaceBy = `.${hostSelector}`;
    return selector.replace(_polyfillHostNoCombinatorRe, (_, selector2) => injectScopingSelector(selector2, replaceBy)).replace(_polyfillHostRe, replaceBy + " ");
  }
  return scopeSelector2 + " " + selector;
};
var applyStrictSelectorScope = (selector, scopeSelector2, hostSelector) => {
  const isRe = /\[is=([^\]]*)\]/g;
  scopeSelector2 = scopeSelector2.replace(isRe, (_, ...parts) => parts[0]);
  const className = "." + scopeSelector2;
  const _scopeSelectorPart = (p) => {
    let scopedP = p.trim();
    if (!scopedP) {
      return "";
    }
    if (p.indexOf(_polyfillHostNoCombinator) > -1) {
      scopedP = applySimpleSelectorScope(p, scopeSelector2, hostSelector);
    } else {
      const t = p.replace(_polyfillHostRe, "");
      if (t.length > 0) {
        scopedP = injectScopingSelector(t, className);
      }
    }
    return scopedP;
  };
  const safeContent = safeSelector(selector);
  selector = safeContent.content;
  let scopedSelector = "";
  let startIndex = 0;
  let res;
  const sep = /( |>|\+|~(?!=))(?=(?:[^()]*\([^()]*\))*[^()]*$)\s*/g;
  const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
  let shouldScope = !hasHost;
  while ((res = sep.exec(selector)) !== null) {
    const separator = res[1];
    const part2 = selector.slice(startIndex, res.index).trim();
    shouldScope = shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
    const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
    scopedSelector += `${scopedPart} ${separator} `;
    startIndex = sep.lastIndex;
  }
  const part = selector.substring(startIndex);
  shouldScope = !part.match(_safePartRe) && (shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1);
  scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
  return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};
var scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) => {
  return selector.split(",").map((shallowPart) => {
    if (slotSelector && shallowPart.indexOf("." + slotSelector) > -1) {
      return shallowPart.trim();
    }
    if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
      return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
    } else {
      return shallowPart.trim();
    }
  }).join(", ");
};
var scopeSelectors = (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) => {
  return processRules(cssText, (rule) => {
    let selector = rule.selector;
    let content = rule.content;
    if (rule.selector[0] !== "@") {
      selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
    } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
      content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector);
    }
    const cssRule = {
      selector: selector.replace(/\s{2,}/g, " ").trim(),
      content
    };
    return cssRule;
  });
};
var scopeCssText = (cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector) => {
  cssText = insertPolyfillHostInCssText(cssText);
  cssText = convertColonHost(cssText);
  cssText = convertColonHostContext(cssText);
  const slotted = convertColonSlotted(cssText, slotScopeId);
  cssText = slotted.cssText;
  cssText = convertShadowDOMSelectors(cssText);
  if (scopeId2) {
    cssText = scopeSelectors(cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector);
  }
  cssText = replaceShadowCssHost(cssText, hostScopeId);
  cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ");
  return {
    cssText: cssText.trim(),
    // We need to replace the shadow CSS host string in each of these selectors since we created
    // them prior to the replacement happening in the components CSS text.
    slottedSelectors: slotted.selectors.map((ref) => ({
      orgSelector: replaceShadowCssHost(ref.orgSelector, hostScopeId),
      updatedSelector: replaceShadowCssHost(ref.updatedSelector, hostScopeId)
    }))
  };
};
var replaceShadowCssHost = (cssText, hostScopeId) => {
  return cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
};
var expandPartSelectors = (cssText) => {
  const partSelectorRe = /([^\s,{][^,{]*?)::part\(\s*([^)]+?)\s*\)((?:[:.][^,{]*)*)/g;
  return processRules(cssText, (rule) => {
    if (rule.selector[0] === "@") {
      return rule;
    }
    const selectors = rule.selector.split(",").map((sel) => {
      const out = [sel.trim()];
      let m;
      while ((m = partSelectorRe.exec(sel)) !== null) {
        const before = m[1].trimEnd();
        const partNames = m[2].trim().split(/\s+/);
        const after = m[3] || "";
        const partAttr = partNames.flatMap((p) => {
          if (!rule.selector.includes(`[part~="${p}"]`)) {
            return [`[part~="${p}"]`];
          }
          return [];
        }).join("");
        const expanded = `${before} ${partAttr}${after}`;
        if (!!partAttr && expanded !== sel.trim()) {
          out.push(expanded);
        }
      }
      return out.join(", ");
    });
    rule.selector = selectors.join(", ");
    return rule;
  });
};
var scopeCss = (cssText, scopeId2, commentOriginalSelector) => {
  const hostScopeId = scopeId2 + "-h";
  const slotScopeId = scopeId2 + "-s";
  const commentsWithHash = extractCommentsWithHash(cssText);
  cssText = stripComments(cssText);
  const orgSelectors = [];
  if (commentOriginalSelector) {
    const processCommentedSelector = (rule) => {
      const placeholder = `/*!@___${orgSelectors.length}___*/`;
      const comment = `/*!@${rule.selector}*/`;
      orgSelectors.push({ placeholder, comment });
      rule.selector = placeholder + rule.selector;
      return rule;
    };
    cssText = processRules(cssText, (rule) => {
      if (rule.selector[0] !== "@") {
        return processCommentedSelector(rule);
      } else if (rule.selector.startsWith("@media") || rule.selector.startsWith("@supports") || rule.selector.startsWith("@page") || rule.selector.startsWith("@document")) {
        rule.content = processRules(rule.content, processCommentedSelector);
        return rule;
      }
      return rule;
    });
  }
  const scoped = scopeCssText(cssText, scopeId2, hostScopeId, slotScopeId, commentOriginalSelector);
  cssText = [scoped.cssText, ...commentsWithHash].join("\n");
  if (commentOriginalSelector) {
    orgSelectors.forEach(({ placeholder, comment }) => {
      cssText = cssText.replace(placeholder, comment);
    });
  }
  scoped.slottedSelectors.forEach((slottedSelector) => {
    const regex = new RegExp(escapeRegExpSpecialCharacters(slottedSelector.orgSelector), "g");
    cssText = cssText.replace(regex, slottedSelector.updatedSelector);
  });
  cssText = expandPartSelectors(cssText);
  return cssText;
};
var computeMode = (elm) => modeResolutionChain.map((h2) => h2(elm)).find((m) => !!m);
var parsePropertyValue = (propValue, propType, isFormAssociated) => {
  if ((BUILD.hydrateClientSide || BUILD.hydrateServerSide) && typeof propValue === "string" && propValue.startsWith(SERIALIZED_PREFIX)) {
    propValue = deserializeProperty(propValue);
    return propValue;
  }
  if (propValue != null && !isComplexType(propValue)) {
    if (BUILD.propBoolean && propType & 4) {
      if (BUILD.formAssociated && isFormAssociated && typeof propValue === "string") {
        return propValue === "" || !!propValue;
      } else {
        return propValue === "false" ? false : propValue === "" || !!propValue;
      }
    }
    if (BUILD.propNumber && propType & 2) {
      return typeof propValue === "string" ? parseFloat(propValue) : typeof propValue === "number" ? propValue : NaN;
    }
    if (BUILD.propString && propType & 1) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
var getElement = (ref) => {
  var _a;
  return BUILD.lazyLoad ? (_a = getHostRef(ref)) == null ? void 0 : _a.$hostElement$ : ref;
};
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      if (BUILD.isDev && !elm.isConnected) {
        consoleDevWarn(`The "${name}" event was emitted, but the dispatcher node is no longer connected to the dom.`);
      }
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4),
        composed: !!(flags & 2),
        cancelable: !!(flags & 1),
        detail
      });
    }
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags, initialRender) => {
  if (oldValue === newValue) {
    return;
  }
  let isProp = isMemberInElement(elm, memberName);
  let ln = memberName.toLowerCase();
  if (BUILD.vdomClass && memberName === "class") {
    const classList = elm.classList;
    const oldClasses = parseClassList(oldValue);
    let newClasses = parseClassList(newValue);
    if (BUILD.hydrateClientSide && (elm["s-si"] || elm["s-sc"]) && initialRender) {
      const scopeId2 = elm["s-sc"] || elm["s-si"];
      newClasses.push(scopeId2);
      oldClasses.forEach((c) => {
        if (c.startsWith(scopeId2)) newClasses.push(c);
      });
      newClasses = [...new Set(newClasses)].filter((c) => c);
      classList.add(...newClasses);
    } else {
      classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    }
  } else if (BUILD.vdomStyle && memberName === "style") {
    if (BUILD.updatable) {
      for (const prop in oldValue) {
        if (!newValue || newValue[prop] == null) {
          if (!BUILD.hydrateServerSide && prop.includes("-")) {
            elm.style.removeProperty(prop);
          } else {
            elm.style[prop] = "";
          }
        }
      }
    }
    for (const prop in newValue) {
      if (!oldValue || newValue[prop] !== oldValue[prop]) {
        if (!BUILD.hydrateServerSide && prop.includes("-")) {
          elm.style.setProperty(prop, newValue[prop]);
        } else {
          elm.style[prop] = newValue[prop];
        }
      }
    }
  } else if (BUILD.vdomKey && memberName === "key") {
  } else if (BUILD.vdomRef && memberName === "ref") {
    if (newValue) {
      newValue(elm);
    }
  } else if (BUILD.vdomListener && (BUILD.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) && memberName[0] === "o" && memberName[1] === "n") {
    if (memberName[2] === "-") {
      memberName = memberName.slice(3);
    } else if (isMemberInElement(win, ln)) {
      memberName = ln.slice(2);
    } else {
      memberName = ln[2] + memberName.slice(3);
    }
    if (oldValue || newValue) {
      const capture = memberName.endsWith(CAPTURE_EVENT_SUFFIX);
      memberName = memberName.replace(CAPTURE_EVENT_REGEX, "");
      if (oldValue) {
        plt.rel(elm, memberName, oldValue, capture);
      }
      if (newValue) {
        plt.ael(elm, memberName, newValue, capture);
      }
    }
  } else if (BUILD.vdomPropOrAttr) {
    const isComplex = isComplexType(newValue);
    if ((isProp || isComplex && newValue !== null) && !isSvg) {
      try {
        if (!elm.tagName.includes("-")) {
          const n = newValue == null ? "" : newValue;
          if (memberName === "list") {
            isProp = false;
          } else if (oldValue == null || elm[memberName] != n) {
            if (typeof elm.__lookupSetter__(memberName) === "function") {
              elm[memberName] = n;
            } else {
              elm.setAttribute(memberName, n);
            }
          }
        } else if (elm[memberName] !== newValue) {
          elm[memberName] = newValue;
        }
      } catch (e) {
      }
    }
    let xlink = false;
    if (BUILD.vdomXlink) {
      if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
        memberName = ln;
        xlink = true;
      }
    }
    if (newValue == null || newValue === false) {
      if (newValue !== false || elm.getAttribute(memberName) === "") {
        if (BUILD.vdomXlink && xlink) {
          elm.removeAttributeNS(XLINK_NS, memberName);
        } else {
          elm.removeAttribute(memberName);
        }
      }
    } else if ((!isProp || flags & 4 || isSvg) && !isComplex && elm.nodeType === 1) {
      newValue = newValue === true ? "" : newValue;
      if (BUILD.vdomXlink && xlink) {
        elm.setAttributeNS(XLINK_NS, memberName, newValue);
      } else {
        elm.setAttribute(memberName, newValue);
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = (value) => {
  if (typeof value === "object" && value && "baseVal" in value) {
    value = value.baseVal;
  }
  if (!value || typeof value !== "string") {
    return [];
  }
  return value.split(parseClassListRegex);
};
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");
var updateElement = (oldVnode, newVnode, isSvgMode2, isInitialRender) => {
  const elm = newVnode.$elm$.nodeType === 11 && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || {};
  const newVnodeAttrs = newVnode.$attrs$ || {};
  if (BUILD.updatable) {
    for (const memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(
          elm,
          memberName,
          oldVnodeAttrs[memberName],
          void 0,
          isSvgMode2,
          newVnode.$flags$,
          isInitialRender
        );
      }
    }
  }
  for (const memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
    setAccessor(
      elm,
      memberName,
      oldVnodeAttrs[memberName],
      newVnodeAttrs[memberName],
      isSvgMode2,
      newVnode.$flags$,
      isInitialRender
    );
  }
};
function sortedAttrNames(attrNames) {
  return attrNames.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...attrNames.filter((attr) => attr !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    attrNames
  );
}
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex) => {
  var _a;
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (BUILD.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === "slot") {
      newVNode2.$flags$ |= newVNode2.$children$ ? (
        // slot element has fallback content
        // still create an element that "mocks" the slot element
        2
      ) : (
        // slot element does not have fallback content
        // create an html comment we'll use to always reference
        // where actual slot content should sit next to
        1
      );
    }
  }
  if (BUILD.isDev && newVNode2.$elm$) {
    consoleDevError(
      `The JSX ${newVNode2.$text$ !== null ? `"${newVNode2.$text$}" text` : `"${newVNode2.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`
    );
  }
  if (BUILD.vdomText && newVNode2.$text$ !== null) {
    elm = newVNode2.$elm$ = win.document.createTextNode(newVNode2.$text$);
  } else if (BUILD.slotRelocation && newVNode2.$flags$ & 1) {
    elm = newVNode2.$elm$ = BUILD.isDebug || BUILD.hydrateServerSide ? slotReferenceDebugNode(newVNode2) : win.document.createTextNode("");
    if (BUILD.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
  } else {
    if (BUILD.svg && !isSvgMode) {
      isSvgMode = newVNode2.$tag$ === "svg";
    }
    if (!win.document) {
      throw new Error(
        "You are trying to render a Stencil component in an environment that doesn't support the DOM. Make sure to populate the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window/window) object before rendering a component."
      );
    }
    elm = newVNode2.$elm$ = BUILD.svg ? win.document.createElementNS(
      isSvgMode ? SVG_NS : HTML_NS,
      !useNativeShadowDom && BUILD.slotRelocation && newVNode2.$flags$ & 2 ? "slot-fb" : newVNode2.$tag$
    ) : win.document.createElement(
      !useNativeShadowDom && BUILD.slotRelocation && newVNode2.$flags$ & 2 ? "slot-fb" : newVNode2.$tag$
    );
    if (BUILD.svg && isSvgMode && newVNode2.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (BUILD.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
    if ((BUILD.scoped || BUILD.hydrateServerSide && 128) && isDef(scopeId) && elm["s-si"] !== scopeId) {
      elm.classList.add(elm["s-si"] = scopeId);
    }
    if (newVNode2.$children$) {
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
    if (BUILD.svg) {
      if (newVNode2.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (BUILD.slotRelocation) {
    if (newVNode2.$flags$ & (2 | 1)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode2.$name$ || "";
      elm["s-rf"] = (_a = newVNode2.$attrs$) == null ? void 0 : _a.ref;
      patchSlotNode(elm);
      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
      if (oldVNode && oldVNode.$tag$ === newVNode2.$tag$ && oldParentVNode.$elm$) {
        if (BUILD.experimentalSlotFixes) {
          relocateToHostRoot(oldParentVNode.$elm$);
        } else {
          putBackInOriginalLocation(oldParentVNode.$elm$, false);
        }
      }
      if (BUILD.scoped || BUILD.hydrateServerSide && 128) {
        addRemoveSlotScopedClass(contentRef, elm, newParentVNode.$elm$, oldParentVNode == null ? void 0 : oldParentVNode.$elm$);
      }
    }
  }
  return elm;
};
var relocateToHostRoot = (parentElm) => {
  plt.$flags$ |= 1;
  const host = parentElm.closest(hostTagName.toLowerCase());
  if (host != null) {
    const contentRefNode = Array.from(host.__childNodes || host.childNodes).find(
      (ref) => ref["s-cr"]
    );
    const childNodeArray = Array.from(
      parentElm.__childNodes || parentElm.childNodes
    );
    for (const childNode of contentRefNode ? childNodeArray.reverse() : childNodeArray) {
      if (childNode["s-sh"] != null) {
        insertBefore(host, childNode, contentRefNode != null ? contentRefNode : null);
        childNode["s-sh"] = void 0;
        checkSlotRelocate = true;
      }
    }
  }
  plt.$flags$ &= ~1;
};
var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1;
  const oldSlotChildNodes = Array.from(parentElm.__childNodes || parentElm.childNodes);
  if (parentElm["s-sr"] && BUILD.experimentalSlotFixes) {
    let node = parentElm;
    while (node = node.nextSibling) {
      if (node && node["s-sn"] === parentElm["s-sn"] && node["s-sh"] === hostTagName) {
        oldSlotChildNodes.push(node);
      }
    }
  }
  for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
    const childNode = oldSlotChildNodes[i2];
    if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
      insertBefore(referenceNode(childNode).parentNode, childNode, referenceNode(childNode));
      childNode["s-ol"].remove();
      childNode["s-ol"] = void 0;
      childNode["s-sh"] = void 0;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= ~1;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = BUILD.slotRelocation && parentElm["s-cr"] && parentElm["s-cr"].parentNode || parentElm;
  let childNode;
  if (BUILD.shadowDom && containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        insertBefore(containerElm, childNode, BUILD.slotRelocation ? referenceNode(before) : before);
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      nullifyVNodeRefs(vnode);
      if (elm) {
        if (BUILD.slotRelocation) {
          checkSlotFallbackVisibility = true;
          if (elm["s-ol"]) {
            elm["s-ol"].remove();
          } else {
            putBackInOriginalLocation(elm, true);
          }
        }
        elm.remove();
      }
    }
  }
};
var updateChildren = (parentElm, oldCh, newVNode2, newCh, isInitialRender = false) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i2 = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  let elmToMove;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      if (BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }
      patch(oldStartVnode, newEndVnode, isInitialRender);
      insertBefore(parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      if (BUILD.slotRelocation && (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")) {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }
      patch(oldEndVnode, newStartVnode, isInitialRender);
      insertBefore(parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      idxInOld = -1;
      if (BUILD.vdomKey) {
        for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
          if (oldCh[i2] && oldCh[i2].$key$ !== null && oldCh[i2].$key$ === newStartVnode.$key$) {
            idxInOld = i2;
            break;
          }
        }
      }
      if (BUILD.vdomKey && idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode2, idxInOld);
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = void 0;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        if (BUILD.slotRelocation) {
          insertBefore(
            referenceNode(oldStartVnode.$elm$).parentNode,
            node,
            referenceNode(oldStartVnode.$elm$)
          );
        } else {
          insertBefore(oldStartVnode.$elm$.parentNode, node, oldStartVnode.$elm$);
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode2,
      newCh,
      newStartIdx,
      newEndIdx
    );
  } else if (BUILD.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (BUILD.slotRelocation && leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (BUILD.vdomKey && !isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    if (isInitialRender && !leftVNode.$key$ && rightVNode.$key$) {
      leftVNode.$key$ = rightVNode.$key$;
    }
    return true;
  }
  return false;
};
var referenceNode = (node) => node && node["s-ol"] || node;
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = newVNode2.$elm$ = oldVNode.$elm$;
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  const tag = newVNode2.$tag$;
  const text = newVNode2.$text$;
  let defaultHolder;
  if (!BUILD.vdomText || text === null) {
    if (BUILD.svg) {
      isSvgMode = tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (BUILD.vdomAttribute || BUILD.reflect) {
      if (BUILD.slot && tag === "slot" && !useNativeShadowDom) {
        if (BUILD.experimentalSlotFixes && oldVNode.$name$ !== newVNode2.$name$) {
          newVNode2.$elm$["s-sn"] = newVNode2.$name$ || "";
          relocateToHostRoot(newVNode2.$elm$.parentElement);
        }
      }
      updateElement(oldVNode, newVNode2, isSvgMode, isInitialRender);
    }
    if (BUILD.updatable && oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (BUILD.updatable && BUILD.vdomText && oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (
      // don't do this on initial render as it can cause non-hydrated content to be removed
      !isInitialRender && BUILD.updatable && oldChildren !== null
    ) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    } else if (BUILD.hydrateClientSide && isInitialRender && BUILD.updatable && oldChildren !== null && newChildren === null) {
      newVNode2.$children$ = oldChildren;
    }
    if (BUILD.svg && isSvgMode && tag === "svg") {
      isSvgMode = false;
    }
  } else if (BUILD.vdomText && BUILD.slotRelocation && (defaultHolder = elm["s-cr"])) {
    defaultHolder.parentNode.textContent = text;
  } else if (BUILD.vdomText && oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = (elm) => {
  let node;
  let hostContentNodes;
  let j;
  const children = elm.__childNodes || elm.childNodes;
  for (const childNode of children) {
    if (childNode["s-sr"] && (node = childNode["s-cr"]) && node.parentNode) {
      hostContentNodes = node.parentNode.__childNodes || node.parentNode.childNodes;
      const slotName = childNode["s-sn"];
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];
        if (!node["s-cn"] && !node["s-nr"] && node["s-hn"] !== childNode["s-hn"] && (!BUILD.experimentalSlotFixes || !node["s-sh"] || node["s-sh"] !== childNode["s-hn"])) {
          if (isNodeLocatedInSlot(node, slotName)) {
            let relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
            checkSlotFallbackVisibility = true;
            node["s-sn"] = node["s-sn"] || slotName;
            if (relocateNodeData) {
              relocateNodeData.$nodeToRelocate$["s-sh"] = childNode["s-hn"];
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              node["s-sh"] = childNode["s-hn"];
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node
              });
            }
            if (node["s-sr"]) {
              relocateNodes.map((relocateNode) => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node["s-sn"])) {
                  relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
            relocateNodes.push({
              $nodeToRelocate$: node
            });
          }
        }
      }
    }
    if (childNode.nodeType === 1) {
      markSlotContentForRelocation(childNode);
    }
  }
};
var nullifyVNodeRefs = (vNode) => {
  if (BUILD.vdomRef) {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
    vNode.$children$ && vNode.$children$.map(nullifyVNodeRefs);
  }
};
var insertBefore = (parent, newNode, reference) => {
  if (BUILD.scoped && typeof newNode["s-sn"] === "string" && !!newNode["s-sr"] && !!newNode["s-cr"]) {
    addRemoveSlotScopedClass(newNode["s-cr"], newNode, parent, newNode.parentElement);
  } else if (BUILD.experimentalSlotFixes && typeof newNode["s-sn"] === "string") {
    if (parent.getRootNode().nodeType !== 11) {
      patchParentNode(newNode);
    }
    parent.insertBefore(newNode, reference);
    const { slotNode } = findSlotFromSlottedNode(newNode);
    if (slotNode) dispatchSlotChangeEvent(slotNode);
    return newNode;
  }
  if (BUILD.experimentalSlotFixes && parent.__insertBefore) {
    return parent.__insertBefore(newNode, reference);
  } else {
    return parent == null ? void 0 : parent.insertBefore(newNode, reference);
  }
};
function addRemoveSlotScopedClass(reference, slotNode, newParent, oldParent) {
  var _a, _b;
  let scopeId2;
  if (reference && typeof slotNode["s-sn"] === "string" && !!slotNode["s-sr"] && reference.parentNode && reference.parentNode["s-sc"] && (scopeId2 = slotNode["s-si"] || reference.parentNode["s-sc"])) {
    const scopeName = slotNode["s-sn"];
    const hostName = slotNode["s-hn"];
    (_a = newParent.classList) == null ? void 0 : _a.add(scopeId2 + "-s");
    if (oldParent && ((_b = oldParent.classList) == null ? void 0 : _b.contains(scopeId2 + "-s"))) {
      let child = (oldParent.__childNodes || oldParent.childNodes)[0];
      let found = false;
      while (child) {
        if (child["s-sn"] !== scopeName && child["s-hn"] === hostName && !!child["s-sr"]) {
          found = true;
          break;
        }
        child = child.nextSibling;
      }
      if (!found) oldParent.classList.remove(scopeId2 + "-s");
    }
  }
}
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a, _b, _c, _d, _e;
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const isHostElement = isHost(renderFnResults);
  const rootVnode = isHostElement ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (BUILD.isDev && Array.isArray(renderFnResults) && renderFnResults.some(isHost)) {
    throw new Error(`The <Host> must be the single root component.
Looks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.

The render() function should look like this instead:

render() {
  // Do not return an array
  return (
    <Host>{content}</Host>
  );
}
  `);
  }
  if (BUILD.reflect && cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.forEach(([propName, attribute]) => {
      if (BUILD.serializer && hostRef.$serializerValues$.has(propName)) {
        rootVnode.$attrs$[attribute] = hostRef.$serializerValues$.get(propName);
      } else {
        rootVnode.$attrs$[attribute] = hostElm[propName];
      }
    });
  }
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (hostElm.hasAttribute(key) && !["key", "ref", "style", "class"].includes(key)) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = BUILD.shadowDom ? hostElm.shadowRoot || hostElm : hostElm;
  if (BUILD.scoped || BUILD.shadowDom) {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = supportsShadow && !!(cmpMeta.$flags$ & 1) && !(cmpMeta.$flags$ & 128);
  if (BUILD.slotRelocation) {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  if (BUILD.slotRelocation) {
    plt.$flags$ |= 1;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"] && win.document) {
          const orgLocationNode = BUILD.isDebug || BUILD.hydrateServerSide ? originalLocationDebugNode(nodeToRelocate) : win.document.createTextNode("");
          orgLocationNode["s-nr"] = nodeToRelocate;
          insertBefore(nodeToRelocate.parentNode, nodeToRelocate["s-ol"] = orgLocationNode, nodeToRelocate);
        }
      }
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        const slotRefNode = relocateData.$slotRefNode$;
        if (slotRefNode) {
          const parentNodeRef = slotRefNode.parentNode;
          let insertBeforeNode = slotRefNode.nextSibling;
          if (!BUILD.hydrateServerSide && (!BUILD.experimentalSlotFixes || insertBeforeNode && insertBeforeNode.nodeType === 1)) {
            let orgLocationNode = (_a = nodeToRelocate["s-ol"]) == null ? void 0 : _a.previousSibling;
            while (orgLocationNode) {
              let refNode = (_b = orgLocationNode["s-nr"]) != null ? _b : null;
              if (refNode && refNode["s-sn"] === nodeToRelocate["s-sn"] && parentNodeRef === (refNode.__parentNode || refNode.parentNode)) {
                refNode = refNode.nextSibling;
                while (refNode === nodeToRelocate || (refNode == null ? void 0 : refNode["s-sr"])) {
                  refNode = refNode == null ? void 0 : refNode.nextSibling;
                }
                if (!refNode || !refNode["s-nr"]) {
                  insertBeforeNode = refNode;
                  break;
                }
              }
              orgLocationNode = orgLocationNode.previousSibling;
            }
          }
          const parent = nodeToRelocate.__parentNode || nodeToRelocate.parentNode;
          const nextSibling = nodeToRelocate.__nextSibling || nodeToRelocate.nextSibling;
          if (!insertBeforeNode && parentNodeRef !== parent || nextSibling !== insertBeforeNode) {
            if (nodeToRelocate !== insertBeforeNode) {
              if (!BUILD.experimentalSlotFixes && !nodeToRelocate["s-hn"] && nodeToRelocate["s-ol"]) {
                nodeToRelocate["s-hn"] = nodeToRelocate["s-ol"].parentNode.nodeName;
              }
              insertBefore(parentNodeRef, nodeToRelocate, insertBeforeNode);
              if (nodeToRelocate.nodeType === 1 && nodeToRelocate.tagName !== "SLOT-FB") {
                nodeToRelocate.hidden = (_c = nodeToRelocate["s-ih"]) != null ? _c : false;
              }
            }
          }
          nodeToRelocate && typeof slotRefNode["s-rf"] === "function" && slotRefNode["s-rf"](slotRefNode);
        } else {
          if (nodeToRelocate.nodeType === 1) {
            if (isInitialLoad) {
              nodeToRelocate["s-ih"] = (_d = nodeToRelocate.hidden) != null ? _d : false;
            }
            nodeToRelocate.hidden = true;
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    }
    plt.$flags$ &= ~1;
    relocateNodes.length = 0;
  }
  if (BUILD.experimentalScopedSlotChanges && cmpMeta.$flags$ & 2) {
    const children = rootVnode.$elm$.__childNodes || rootVnode.$elm$.childNodes;
    for (const childNode of children) {
      if (childNode["s-hn"] !== hostTagName && !childNode["s-sh"]) {
        if (isInitialLoad && childNode["s-ih"] == null) {
          childNode["s-ih"] = (_e = childNode.hidden) != null ? _e : false;
        }
        childNode.hidden = true;
      }
    }
  }
  contentRef = void 0;
};
var slotReferenceDebugNode = (slotVNode) => {
  var _a;
  return (_a = win.document) == null ? void 0 : _a.createComment(
    `<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`
  );
};
var originalLocationDebugNode = (nodeToRelocate) => {
  var _a;
  return (_a = win.document) == null ? void 0 : _a.createComment(
    `org-location for ` + (nodeToRelocate.localName ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})` : `[${nodeToRelocate.textContent}]`)
  );
};
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (BUILD.asyncLoading && ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
    const index = ancestorComponent["s-p"].push(
      new Promise(
        (r) => hostRef.$onRenderResolve$ = () => {
          ancestorComponent["s-p"].splice(index - 1, 1);
          r();
        }
      )
    );
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  if (BUILD.taskQueue && BUILD.updatable) {
    hostRef.$flags$ |= 16;
  }
  if (BUILD.asyncLoading && hostRef.$flags$ & 4) {
    hostRef.$flags$ |= 512;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  if (isInitialLoad) {
    queueMicrotask(() => {
      dispatch();
    });
    return;
  }
  return BUILD.taskQueue ? writeTask(dispatch) : dispatch();
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  if (!instance) {
    throw new Error(
      `Can't render component <${elm.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`
    );
  }
  let maybePromise;
  if (isInitialLoad) {
    if (BUILD.lazyLoad) {
      if (BUILD.hostListener) {
        hostRef.$flags$ |= 256;
        if (hostRef.$queuedListeners$) {
          hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event, elm));
          hostRef.$queuedListeners$ = void 0;
        }
      }
      if (hostRef.$fetchedCbList$.length) {
        hostRef.$fetchedCbList$.forEach((cb) => cb(elm));
      }
    }
    emitLifecycleEvent(elm, "componentWillLoad");
    maybePromise = safeCall(instance, "componentWillLoad", void 0, elm);
  } else {
    emitLifecycleEvent(elm, "componentWillUpdate");
    maybePromise = safeCall(instance, "componentWillUpdate", void 0, elm);
  }
  emitLifecycleEvent(elm, "componentWillRender");
  maybePromise = enqueue(maybePromise, () => safeCall(instance, "componentWillRender", void 0, elm));
  endSchedule();
  return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
var enqueue = (maybePromise, fn) => isPromisey(maybePromise) ? maybePromise.then(fn).catch((err2) => {
  console.error(err2);
  fn();
}) : fn();
var isPromisey = (maybePromise) => maybePromise instanceof Promise || maybePromise && maybePromise.then && typeof maybePromise.then === "function";
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (BUILD.style && isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  if (BUILD.isDev) {
    hostRef.$flags$ |= 1024;
  }
  if (BUILD.hydrateServerSide) {
    await callRender(hostRef, instance, elm, isInitialLoad);
  } else {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (BUILD.isDev) {
    hostRef.$renderCount$ = hostRef.$renderCount$ === void 0 ? 1 : hostRef.$renderCount$ + 1;
    hostRef.$flags$ &= ~1024;
  }
  if (BUILD.hydrateServerSide) {
    try {
      serverSideConnected(elm);
      if (isInitialLoad) {
        if (hostRef.$cmpMeta$.$flags$ & 1) {
          elm["s-en"] = "";
        } else if (hostRef.$cmpMeta$.$flags$ & 2) {
          elm["s-en"] = "c";
        }
      }
    } catch (e) {
      consoleError(e, elm);
    }
  }
  if (BUILD.asyncLoading && rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  if (BUILD.asyncLoading) {
    const childrenPromises = (_a = elm["s-p"]) != null ? _a : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4;
      childrenPromises.length = 0;
    }
  } else {
    postUpdateComponent(hostRef);
  }
};
var renderingRef = null;
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  const allRenderFn = BUILD.allRenderFn ? true : false;
  const lazyLoad = BUILD.lazyLoad ? true : false;
  const taskQueue = BUILD.taskQueue ? true : false;
  const updatable = BUILD.updatable ? true : false;
  try {
    renderingRef = instance;
    instance = allRenderFn ? instance.render() : instance.render && instance.render();
    if (updatable && taskQueue) {
      hostRef.$flags$ &= ~16;
    }
    if (updatable || lazyLoad) {
      hostRef.$flags$ |= 2;
    }
    if (BUILD.hasRenderFn || BUILD.reflect) {
      if (BUILD.vdomRender || BUILD.reflect) {
        if (BUILD.hydrateServerSide) {
          return Promise.resolve(instance).then((value) => renderVdom(hostRef, value, isInitialLoad));
        } else {
          renderVdom(hostRef, instance, isInitialLoad);
        }
      } else {
        const shadowRoot = elm.shadowRoot;
        if (hostRef.$cmpMeta$.$flags$ & 1) {
          shadowRoot.textContent = instance;
        } else {
          elm.textContent = instance;
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  renderingRef = null;
  return null;
};
var postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (BUILD.isDev) {
    hostRef.$flags$ |= 1024;
  }
  safeCall(instance, "componentDidRender", void 0, elm);
  if (BUILD.isDev) {
    hostRef.$flags$ &= ~1024;
  }
  emitLifecycleEvent(elm, "componentDidRender");
  if (!(hostRef.$flags$ & 64)) {
    hostRef.$flags$ |= 64;
    if (BUILD.asyncLoading && BUILD.cssAnnotations) {
      addHydratedFlag(elm);
    }
    if (BUILD.isDev) {
      hostRef.$flags$ |= 2048;
    }
    safeCall(instance, "componentDidLoad", void 0, elm);
    if (BUILD.isDev) {
      hostRef.$flags$ &= ~2048;
    }
    emitLifecycleEvent(elm, "componentDidLoad");
    endPostUpdate();
    if (BUILD.asyncLoading) {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad(tagName);
      }
    }
  } else {
    if (BUILD.isDev) {
      hostRef.$flags$ |= 1024;
    }
    safeCall(instance, "componentDidUpdate", void 0, elm);
    if (BUILD.isDev) {
      hostRef.$flags$ &= ~1024;
    }
    emitLifecycleEvent(elm, "componentDidUpdate");
    endPostUpdate();
  }
  if (BUILD.method && BUILD.lazyLoad) {
    hostRef.$onInstanceResolve$(elm);
  }
  if (BUILD.asyncLoading) {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 | 512);
  }
};
var forceUpdate = (ref) => {
  var _a;
  if (BUILD.updatable && (Build.isBrowser || Build.isTesting)) {
    const hostRef = getHostRef(ref);
    const isConnected = (_a = hostRef == null ? void 0 : hostRef.$hostElement$) == null ? void 0 : _a.isConnected;
    if (isConnected && (hostRef.$flags$ & (2 | 16)) === 2) {
      scheduleUpdate(hostRef, false);
    }
    return isConnected;
  }
  return false;
};
var appDidLoad = (who) => {
  var _a;
  if (BUILD.asyncQueue) {
    plt.$flags$ |= 2;
  }
  nextTick(() => emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }));
  if (BUILD.hydrateClientSide) {
    if ((_a = plt.$orgLocNodes$) == null ? void 0 : _a.size) {
      plt.$orgLocNodes$.clear();
    }
  }
  if (BUILD.profile && performance.measure) {
    performance.measure(`[Stencil] ${NAMESPACE} initial load (by ${who})`, "st:app:start");
  }
};
var safeCall = (instance, method, arg, elm) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e, elm);
    }
  }
  return void 0;
};
var emitLifecycleEvent = (elm, lifecycleName) => {
  if (BUILD.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: {
        namespace: NAMESPACE
      }
    });
  }
};
var addHydratedFlag = (elm) => {
  var _a, _b;
  return BUILD.hydratedClass ? elm.classList.add((_a = BUILD.hydratedSelectorName) != null ? _a : "hydrated") : BUILD.hydratedAttribute ? elm.setAttribute((_b = BUILD.hydratedSelectorName) != null ? _b : "hydrated", "") : void 0;
};
var serverSideConnected = (elm) => {
  const children = elm.children;
  if (children != null) {
    for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
      const childElm = children[i2];
      if (typeof childElm.connectedCallback === "function") {
        childElm.connectedCallback();
      }
      serverSideConnected(childElm);
    }
  }
};
var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    return;
  }
  if (BUILD.lazyLoad && !hostRef) {
    throw new Error(
      `Couldn't find host element for "${cmpMeta.$tagName$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/stenciljs/core/issues/5457).`
    );
  }
  if (BUILD.serializer && hostRef.$serializerValues$.has(propName) && hostRef.$serializerValues$.get(propName) === newVal) {
    return;
  }
  const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(
    newVal,
    cmpMeta.$members$[propName][0],
    BUILD.formAssociated && !!(cmpMeta.$flags$ & 64)
  );
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if ((!BUILD.lazyLoad || !(flags & 8) || oldVal === void 0) && didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (BUILD.serializer && BUILD.reflect && cmpMeta.$attrsToReflect$) {
      if (instance && cmpMeta.$serializers$ && cmpMeta.$serializers$[propName]) {
        let attrVal = newVal;
        for (const methodName of cmpMeta.$serializers$[propName]) {
          attrVal = instance[methodName](attrVal, propName);
        }
        hostRef.$serializerValues$.set(propName, attrVal);
      }
    }
    if (BUILD.isDev) {
      if (hostRef.$flags$ & 1024) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal
        );
      } else if (hostRef.$flags$ & 2048) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal
        );
      }
    }
    if (!BUILD.lazyLoad || instance) {
      if (BUILD.propChangeCallback && cmpMeta.$watchers$ && flags & 128) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map((watchMethodName) => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if (BUILD.updatable && (flags & (2 | 16)) === 2) {
        if (instance.componentShouldUpdate) {
          if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
            return;
          }
        }
        scheduleUpdate(hostRef, false);
      }
    }
  }
};
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a, _b;
  const prototype = Cstr.prototype;
  if (BUILD.isTesting) {
    if (prototype.__stencilAugmented) {
      return;
    }
    prototype.__stencilAugmented = true;
  }
  if (BUILD.formAssociated && cmpMeta.$flags$ & 64 && flags & 1) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((cbName) => {
      const originalFormAssociatedCallback = prototype[cbName];
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          var _a2;
          const hostRef = getHostRef(this);
          const instance = BUILD.lazyLoad ? hostRef == null ? void 0 : hostRef.$lazyInstance$ : this;
          if (!instance) {
            (_a2 = hostRef == null ? void 0 : hostRef.$onReadyPromise$) == null ? void 0 : _a2.then((asyncInstance) => {
              const cb = asyncInstance[cbName];
              typeof cb === "function" && cb.call(asyncInstance, ...args);
            });
          } else {
            const cb = BUILD.lazyLoad ? instance[cbName] : originalFormAssociatedCallback;
            typeof cb === "function" && cb.call(instance, ...args);
          }
        }
      });
    });
  }
  if (BUILD.member && cmpMeta.$members$ || BUILD.propChangeCallback) {
    if (BUILD.propChangeCallback) {
      if (Cstr.watchers && !cmpMeta.$watchers$) {
        cmpMeta.$watchers$ = Cstr.watchers;
      }
      if (Cstr.deserializers && !cmpMeta.$deserializers$) {
        cmpMeta.$deserializers$ = Cstr.deserializers;
      }
      if (Cstr.serializers && !cmpMeta.$serializers$) {
        cmpMeta.$serializers$ = Cstr.serializers;
      }
    }
    const members = Object.entries((_a = cmpMeta.$members$) != null ? _a : {});
    members.map(([memberName, [memberFlags]]) => {
      if ((BUILD.prop || BUILD.state) && (memberFlags & 31 || (!BUILD.lazyLoad || flags & 2) && memberFlags & 32)) {
        const { get: origGetter, set: origSetter } = Object.getOwnPropertyDescriptor(prototype, memberName) || {};
        if (origGetter) cmpMeta.$members$[memberName][0] |= 2048;
        if (origSetter) cmpMeta.$members$[memberName][0] |= 4096;
        if (flags & 1 || !origGetter) {
          Object.defineProperty(prototype, memberName, {
            get() {
              if (BUILD.lazyLoad) {
                if ((cmpMeta.$members$[memberName][0] & 2048) === 0) {
                  return getValue(this, memberName);
                }
                const ref = getHostRef(this);
                const instance = ref ? ref.$lazyInstance$ : prototype;
                if (!instance) return;
                return instance[memberName];
              }
              if (!BUILD.lazyLoad) {
                return origGetter ? origGetter.apply(this) : getValue(this, memberName);
              }
            },
            configurable: true,
            enumerable: true
          });
        }
        Object.defineProperty(prototype, memberName, {
          set(newValue) {
            const ref = getHostRef(this);
            if (!ref) {
              return;
            }
            if (BUILD.isDev) {
              if (
                // we are proxying the instance (not element)
                (flags & 1) === 0 && // if the class has a setter, then the Element can update instance values, so ignore
                (cmpMeta.$members$[memberName][0] & 4096) === 0 && // the element is not constructing
                (ref && ref.$flags$ & 8) === 0 && // the member is a prop
                (memberFlags & 31) !== 0 && // the member is not mutable
                (memberFlags & 1024) === 0
              ) {
                consoleDevWarn(
                  `@Prop() "${memberName}" on <${cmpMeta.$tagName$}> is immutable but was modified from within the component.
More information: https://stenciljs.com/docs/properties#prop-mutability`
                );
              }
            }
            if (origSetter) {
              const currentValue = memberFlags & 32 ? this[memberName] : ref.$hostElement$[memberName];
              if (typeof currentValue === "undefined" && ref.$instanceValues$.get(memberName)) {
                newValue = ref.$instanceValues$.get(memberName);
              }
              origSetter.apply(this, [
                parsePropertyValue(
                  newValue,
                  memberFlags,
                  BUILD.formAssociated && !!(cmpMeta.$flags$ & 64)
                )
              ]);
              newValue = memberFlags & 32 ? this[memberName] : ref.$hostElement$[memberName];
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
            if (!BUILD.lazyLoad) {
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
            if (BUILD.lazyLoad) {
              if ((flags & 1) === 0 || (cmpMeta.$members$[memberName][0] & 4096) === 0) {
                setValue(this, memberName, newValue, cmpMeta);
                if (flags & 1 && !ref.$lazyInstance$) {
                  ref.$fetchedCbList$.push(() => {
                    if (cmpMeta.$members$[memberName][0] & 4096 && ref.$lazyInstance$[memberName] !== ref.$instanceValues$.get(memberName)) {
                      ref.$lazyInstance$[memberName] = newValue;
                    }
                  });
                }
                return;
              }
              const setterSetVal = () => {
                const currentValue = ref.$lazyInstance$[memberName];
                if (!ref.$instanceValues$.get(memberName) && currentValue) {
                  ref.$instanceValues$.set(memberName, currentValue);
                }
                ref.$lazyInstance$[memberName] = parsePropertyValue(
                  newValue,
                  memberFlags,
                  BUILD.formAssociated && !!(cmpMeta.$flags$ & 64)
                );
                setValue(this, memberName, ref.$lazyInstance$[memberName], cmpMeta);
              };
              if (ref.$lazyInstance$) {
                setterSetVal();
              } else {
                ref.$fetchedCbList$.push(() => {
                  setterSetVal();
                });
              }
            }
          }
        });
      } else if (BUILD.lazyLoad && BUILD.method && flags & 1 && memberFlags & 64) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            var _a2;
            const ref = getHostRef(this);
            return (_a2 = ref == null ? void 0 : ref.$onInstancePromise$) == null ? void 0 : _a2.then(() => {
              var _a3;
              return (_a3 = ref.$lazyInstance$) == null ? void 0 : _a3[memberName](...args);
            });
          }
        });
      }
    });
    if (BUILD.observeAttribute && (!BUILD.lazyLoad || flags & 1)) {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {
        plt.jmp(() => {
          var _a2;
          const propName = attrNameToPropName.get(attrName);
          const hostRef = getHostRef(this);
          if (BUILD.serializer && hostRef.$serializerValues$.has(propName) && hostRef.$serializerValues$.get(propName) === newValue) {
            return;
          }
          if (this.hasOwnProperty(propName) && BUILD.lazyLoad) {
            newValue = this[propName];
            delete this[propName];
          }
          if (BUILD.deserializer && cmpMeta.$deserializers$ && cmpMeta.$deserializers$[propName]) {
            const setVal = (methodName, instance) => {
              const deserializeVal = instance == null ? void 0 : instance[methodName](newValue, propName);
              if (deserializeVal !== this[propName]) {
                this[propName] = deserializeVal;
              }
            };
            for (const methodName of cmpMeta.$deserializers$[propName]) {
              if (BUILD.lazyLoad) {
                if (hostRef.$lazyInstance$) {
                  setVal(methodName, hostRef.$lazyInstance$);
                } else {
                  hostRef.$fetchedCbList$.push(() => {
                    setVal(methodName, hostRef.$lazyInstance$);
                  });
                }
              } else {
                setVal(methodName, this);
              }
            }
            return;
          } else if (prototype.hasOwnProperty(propName) && typeof this[propName] === "number" && // cast type to number to avoid TS compiler issues
          this[propName] == newValue) {
            return;
          } else if (propName == null) {
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (hostRef && flags2 && !(flags2 & 8) && flags2 & 128 && newValue !== oldValue) {
              const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
              const entry = (_a2 = cmpMeta.$watchers$) == null ? void 0 : _a2[attrName];
              entry == null ? void 0 : entry.forEach((callbackName) => {
                if (instance[callbackName] != null) {
                  instance[callbackName].call(instance, newValue, oldValue, attrName);
                }
              });
            }
            return;
          }
          const propFlags = members.find(([m]) => m === propName);
          if (propFlags && propFlags[1][0] & 4) {
            newValue = newValue === null || newValue === "false" ? false : true;
          }
          const propDesc = Object.getOwnPropertyDescriptor(prototype, propName);
          if (newValue != this[propName] && (!propDesc.get || !!propDesc.set)) {
            this[propName] = newValue;
          }
        });
      };
      Cstr.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((_b = cmpMeta.$watchers$) != null ? _b : {}),
          ...members.filter(
            ([_, m]) => m[0] & 31
            /* HasAttribute */
          ).map(([propName, m]) => {
            var _a2;
            const attrName = m[1] || propName;
            attrNameToPropName.set(attrName, propName);
            if (BUILD.reflect && m[0] & 512) {
              (_a2 = cmpMeta.$attrsToReflect$) == null ? void 0 : _a2.push([propName, attrName]);
            }
            return attrName;
          })
        ])
      );
    }
  }
  return Cstr;
};
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32) === 0) {
    hostRef.$flags$ |= 32;
    const bundleId = cmpMeta.$lazyBundleId$;
    if (BUILD.lazyLoad && bundleId) {
      const CstrImport = loadModule(cmpMeta, hostRef, hmrVersionId);
      if (CstrImport && "then" in CstrImport) {
        const endLoad = uniqueTime(
          `st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`,
          `[Stencil] Load module for <${cmpMeta.$tagName$}>`
        );
        Cstr = await CstrImport;
        endLoad();
      } else {
        Cstr = CstrImport;
      }
      if (!Cstr) {
        throw new Error(`Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`);
      }
      if (BUILD.member && !Cstr.isProxied) {
        if (BUILD.propChangeCallback) {
          cmpMeta.$watchers$ = Cstr.watchers;
          cmpMeta.$serializers$ = Cstr.serializers;
          cmpMeta.$deserializers$ = Cstr.deserializers;
        }
        proxyComponent(
          Cstr,
          cmpMeta,
          2
          /* proxyState */
        );
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      if (BUILD.member) {
        hostRef.$flags$ |= 8;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e, elm);
      }
      if (BUILD.member) {
        hostRef.$flags$ &= ~8;
      }
      if (BUILD.propChangeCallback) {
        hostRef.$flags$ |= 128;
      }
      endNewInstance();
      fireConnectedCallback(hostRef.$lazyInstance$, elm);
    } else {
      Cstr = elm.constructor;
      const cmpTag = elm.localName;
      customElements.whenDefined(cmpTag).then(
        () => hostRef.$flags$ |= 128
        /* isWatchReady */
      );
    }
    if (BUILD.style && Cstr && Cstr.style) {
      let style;
      if (typeof Cstr.style === "string") {
        style = Cstr.style;
      } else if (BUILD.mode && typeof Cstr.style !== "string") {
        hostRef.$modeName$ = computeMode(elm);
        if (hostRef.$modeName$) {
          style = Cstr.style[hostRef.$modeName$];
        }
        if (BUILD.hydrateServerSide && hostRef.$modeName$) {
          elm.setAttribute("s-mode", hostRef.$modeName$);
        }
      }
      const scopeId2 = getScopeId(cmpMeta, hostRef.$modeName$);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
        if (BUILD.hydrateServerSide && BUILD.shadowDom) {
          if (cmpMeta.$flags$ & 128) {
            style = scopeCss(style, scopeId2, true);
          } else if (needsScopedSSR()) {
            style = expandPartSelectors(style);
          }
        }
        registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (BUILD.asyncLoading && ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance, elm) => {
  if (BUILD.lazyLoad) {
    safeCall(instance, "connectedCallback", void 0, elm);
  }
};
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (!hostRef) {
      return;
    }
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (BUILD.hostListenerTargetParent) {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
    }
    if (!(hostRef.$flags$ & 1)) {
      hostRef.$flags$ |= 1;
      let hostId;
      if (BUILD.hydrateClientSide) {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          if (BUILD.shadowDom && supportsShadow && cmpMeta.$flags$ & 1) {
            const scopeId2 = BUILD.mode ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode")) : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId2 + "-h", scopeId2 + "-s");
          } else if (BUILD.scoped && cmpMeta.$flags$ & 2) {
            const scopeId2 = getScopeId(cmpMeta, BUILD.mode ? elm.getAttribute("s-mode") : void 0);
            elm["s-sc"] = scopeId2;
          }
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (BUILD.slotRelocation && !hostId) {
        if (BUILD.hydrateServerSide || (BUILD.slot || BUILD.shadowDom) && // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
        cmpMeta.$flags$ & (4 | 8)) {
          setContentReference(elm);
        }
      }
      if (BUILD.asyncLoading) {
        let ancestorComponent = elm;
        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          if (BUILD.hydrateClientSide && ancestorComponent.nodeType === 1 && ancestorComponent.hasAttribute("s-id") && ancestorComponent["s-p"] || ancestorComponent["s-p"]) {
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      }
      if (BUILD.prop && !BUILD.hydrateServerSide && cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 && memberName in elm && elm[memberName] !== Object.prototype[memberName]) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (BUILD.initializeNextTick) {
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      } else {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
        fireConnectedCallback(hostRef.$lazyInstance$, elm);
      } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() => fireConnectedCallback(hostRef.$lazyInstance$, elm));
      }
    }
    endConnected();
  }
};
var setContentReference = (elm) => {
  if (!win.document) {
    return;
  }
  const contentRefElm = elm["s-cr"] = win.document.createComment(
    BUILD.isDebug ? `content-ref (host=${elm.localName})` : ""
  );
  contentRefElm["s-cn"] = true;
  insertBefore(elm, contentRefElm, elm.firstChild);
};
var disconnectInstance = (instance, elm) => {
  if (BUILD.lazyLoad) {
    safeCall(instance, "disconnectedCallback", void 0, elm || instance);
  }
};
var disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (BUILD.hostListener) {
      if (hostRef == null ? void 0 : hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = void 0;
      }
    }
    if (!BUILD.lazyLoad) {
      disconnectInstance(elm);
    } else if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
      disconnectInstance(hostRef.$lazyInstance$, elm);
    } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
      hostRef.$onReadyPromise$.then(() => disconnectInstance(hostRef.$lazyInstance$, elm));
    }
  }
  if (rootAppliedStyles.has(elm)) {
    rootAppliedStyles.delete(elm);
  }
  if (elm.shadowRoot && rootAppliedStyles.has(elm.shadowRoot)) {
    rootAppliedStyles.delete(elm.shadowRoot);
  }
};
var proxyCustomElement = (Cstr, compactMeta) => {
  const cmpMeta = {
    $flags$: compactMeta[0],
    $tagName$: compactMeta[1]
  };
  if (BUILD.member) {
    cmpMeta.$members$ = compactMeta[2];
  }
  if (BUILD.hostListener) {
    cmpMeta.$listeners$ = compactMeta[3];
  }
  if (BUILD.propChangeCallback) {
    cmpMeta.$watchers$ = Cstr.$watchers$;
    cmpMeta.$deserializers$ = Cstr.$deserializers$;
    cmpMeta.$serializers$ = Cstr.$serializers$;
  }
  if (BUILD.reflect) {
    cmpMeta.$attrsToReflect$ = [];
  }
  if (BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
    cmpMeta.$flags$ |= 8;
  }
  if (!(cmpMeta.$flags$ & 1) && cmpMeta.$flags$ & 256) {
    if (BUILD.experimentalSlotFixes) {
      patchPseudoShadowDom(Cstr.prototype);
    } else {
      if (BUILD.slotChildNodesFix) {
        patchChildSlotNodes(Cstr.prototype);
      }
      if (BUILD.cloneNodeFix) {
        patchCloneNode(Cstr.prototype);
      }
      if (BUILD.appendChildSlotFix) {
        patchSlotAppendChild(Cstr.prototype);
      }
      if (BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
        patchTextContent(Cstr.prototype);
      }
    }
  }
  if (BUILD.hydrateClientSide && BUILD.shadowDom) {
    hydrateScopedToShadow();
  }
  const originalConnectedCallback = Cstr.prototype.connectedCallback;
  const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
  Object.assign(Cstr.prototype, {
    __hasHostListenerAttached: false,
    __registerHost() {
      registerHost(this, cmpMeta);
    },
    connectedCallback() {
      if (!this.__hasHostListenerAttached) {
        const hostRef = getHostRef(this);
        if (!hostRef) {
          return;
        }
        addHostEventListeners(this, hostRef, cmpMeta.$listeners$, false);
        this.__hasHostListenerAttached = true;
      }
      connectedCallback(this);
      if (originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    },
    disconnectedCallback() {
      disconnectedCallback(this);
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    },
    __attachShadow() {
      if (supportsShadow) {
        if (!this.shadowRoot) {
          createShadowRoot.call(this, cmpMeta);
        } else {
          if (this.shadowRoot.mode !== "open") {
            throw new Error(
              `Unable to re-use existing shadow root for ${cmpMeta.$tagName$}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`
            );
          }
        }
      } else {
        this.shadowRoot = this;
      }
    }
  });
  Cstr.is = cmpMeta.$tagName$;
  return proxyComponent(
    Cstr,
    cmpMeta,
    1 | 2
    /* proxyState */
  );
};
var addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
  if (BUILD.hostListener && listeners && win.document) {
    if (BUILD.hostListenerTargetParent) {
      if (attachParentListeners) {
        listeners = listeners.filter(
          ([flags]) => flags & 32
          /* TargetParent */
        );
      } else {
        listeners = listeners.filter(([flags]) => !(flags & 32));
      }
    }
    listeners.map(([flags, name, method]) => {
      const target = BUILD.hostListenerTarget ? getHostListenerTarget(win.document, elm, flags) : elm;
      const handler = hostListenerProxy(hostRef, method);
      const opts = hostListenerOpts(flags);
      plt.ael(target, name, handler, opts);
      (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
    });
  }
};
var hostListenerProxy = (hostRef, methodName) => (ev) => {
  var _a;
  try {
    if (BUILD.lazyLoad) {
      if (hostRef.$flags$ & 256) {
        (_a = hostRef.$lazyInstance$) == null ? void 0 : _a[methodName](ev);
      } else {
        (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
      }
    } else {
      hostRef.$hostElement$[methodName](ev);
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
};
var getHostListenerTarget = (doc, elm, flags) => {
  if (BUILD.hostListenerTargetDocument && flags & 4) {
    return doc;
  }
  if (BUILD.hostListenerTargetWindow && flags & 8) {
    return win;
  }
  if (BUILD.hostListenerTargetBody && flags & 16) {
    return doc.body;
  }
  if (BUILD.hostListenerTargetParent && flags & 32 && elm.parentElement) {
    return elm.parentElement;
  }
  return elm;
};
var hostListenerOpts = (flags) => supportsListenerOptions ? {
  passive: (flags & 1) !== 0,
  capture: (flags & 2) !== 0
} : (flags & 2) !== 0;
var baseClass = BUILD.lazyLoad ? class {
} : globalThis.HTMLElement || class {
};
var setNonce = (nonce) => plt.$nonce$ = nonce;
var setPlatformOptions = (opts) => Object.assign(plt, opts);
function render(vnode, container) {
  const cmpMeta = {
    $flags$: 0,
    $tagName$: container.tagName
  };
  const ref = {
    $flags$: 0,
    $cmpMeta$: cmpMeta,
    $hostElement$: container
  };
  renderVdom(ref, vnode);
}

// dist/components/attachment-preview2.js
var attachmentPreviewCss = ":host{display:block;font-size:13px}img,video{max-width:100%;margin-top:10px}";
var AttachmentPreview = /* @__PURE__ */ proxyCustomElement(class AttachmentPreview2 extends H {
  constructor(registerHost2) {
    super();
    if (registerHost2 !== false) {
      this.__registerHost();
    }
    this.__attachShadow();
  }
  src;
  filetype;
  render() {
    return h(Host, { key: "429f17fda03ded975255da6335ba23a663ee662e", class: this.computeClass() }, this.isImage() && h("img", { key: "daa4e38cb1375db7d8852ab1cb401f048efbbdc7", src: this.src }), this.isVideo() && h("video", { key: "1b7860bc3edf2f4ba4951dd0bd8a88f14db078a0", src: this.src, onClick: toggle }), this.isOther() && "This file does not offer a preview", h("slot", { key: "b8a894bcc9ae11619d543b20f2bd2ee9167616d8" }));
  }
  computeClass() {
    if (this.isImage())
      return "image";
    if (this.isVideo())
      return "video";
    return "other";
  }
  isImage() {
    return this.filetype == "image";
  }
  isVideo() {
    return this.filetype == "video";
  }
  isOther() {
    return !this.isImage() && !this.isVideo();
  }
  static get style() {
    return attachmentPreviewCss;
  }
}, [257, "attachment-preview", {
  "src": [513],
  "filetype": [513]
}]);
var toggle = function() {
  this.paused ? this.play() : this.pause();
  return false;
};

// dist/components/attachment-file2.js
var sparkMd5 = {
  exports: {}
};
(function(module, exports) {
  (function(factory) {
    {
      module.exports = factory();
    }
  })((function(undefined$1) {
    var hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function md5cycle(x, k) {
      var a = x[0], b = x[1], c = x[2], d = x[3];
      a += (b & c | ~b & d) + k[0] - 680876936 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c) + k[1] - 389564586 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c += (d & a | ~d & b) + k[2] + 606105819 | 0;
      c = (c << 17 | c >>> 15) + d | 0;
      b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
      b = (b << 22 | b >>> 10) + c | 0;
      a += (b & c | ~b & d) + k[4] - 176418897 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
      c = (c << 17 | c >>> 15) + d | 0;
      b += (c & d | ~c & a) + k[7] - 45705983 | 0;
      b = (b << 22 | b >>> 10) + c | 0;
      a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c += (d & a | ~d & b) + k[10] - 42063 | 0;
      c = (c << 17 | c >>> 15) + d | 0;
      b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
      b = (b << 22 | b >>> 10) + c | 0;
      a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
      a = (a << 7 | a >>> 25) + b | 0;
      d += (a & b | ~a & c) + k[13] - 40341101 | 0;
      d = (d << 12 | d >>> 20) + a | 0;
      c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
      c = (c << 17 | c >>> 15) + d | 0;
      b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
      b = (b << 22 | b >>> 10) + c | 0;
      a += (b & d | c & ~d) + k[1] - 165796510 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c += (d & b | a & ~b) + k[11] + 643717713 | 0;
      c = (c << 14 | c >>> 18) + d | 0;
      b += (c & a | d & ~a) + k[0] - 373897302 | 0;
      b = (b << 20 | b >>> 12) + c | 0;
      a += (b & d | c & ~d) + k[5] - 701558691 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c | b & ~c) + k[10] + 38016083 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c += (d & b | a & ~b) + k[15] - 660478335 | 0;
      c = (c << 14 | c >>> 18) + d | 0;
      b += (c & a | d & ~a) + k[4] - 405537848 | 0;
      b = (b << 20 | b >>> 12) + c | 0;
      a += (b & d | c & ~d) + k[9] + 568446438 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c += (d & b | a & ~b) + k[3] - 187363961 | 0;
      c = (c << 14 | c >>> 18) + d | 0;
      b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
      b = (b << 20 | b >>> 12) + c | 0;
      a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
      a = (a << 5 | a >>> 27) + b | 0;
      d += (a & c | b & ~c) + k[2] - 51403784 | 0;
      d = (d << 9 | d >>> 23) + a | 0;
      c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
      c = (c << 14 | c >>> 18) + d | 0;
      b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
      b = (b << 20 | b >>> 12) + c | 0;
      a += (b ^ c ^ d) + k[5] - 378558 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
      c = (c << 16 | c >>> 16) + d | 0;
      b += (c ^ d ^ a) + k[14] - 35309556 | 0;
      b = (b << 23 | b >>> 9) + c | 0;
      a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c += (d ^ a ^ b) + k[7] - 155497632 | 0;
      c = (c << 16 | c >>> 16) + d | 0;
      b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
      b = (b << 23 | b >>> 9) + c | 0;
      a += (b ^ c ^ d) + k[13] + 681279174 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c) + k[0] - 358537222 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c += (d ^ a ^ b) + k[3] - 722521979 | 0;
      c = (c << 16 | c >>> 16) + d | 0;
      b += (c ^ d ^ a) + k[6] + 76029189 | 0;
      b = (b << 23 | b >>> 9) + c | 0;
      a += (b ^ c ^ d) + k[9] - 640364487 | 0;
      a = (a << 4 | a >>> 28) + b | 0;
      d += (a ^ b ^ c) + k[12] - 421815835 | 0;
      d = (d << 11 | d >>> 21) + a | 0;
      c += (d ^ a ^ b) + k[15] + 530742520 | 0;
      c = (c << 16 | c >>> 16) + d | 0;
      b += (c ^ d ^ a) + k[2] - 995338651 | 0;
      b = (b << 23 | b >>> 9) + c | 0;
      a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
      c = (c << 15 | c >>> 17) + d | 0;
      b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
      b = (b << 21 | b >>> 11) + c | 0;
      a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
      c = (c << 15 | c >>> 17) + d | 0;
      b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
      b = (b << 21 | b >>> 11) + c | 0;
      a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
      c = (c << 15 | c >>> 17) + d | 0;
      b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
      b = (b << 21 | b >>> 11) + c | 0;
      a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
      a = (a << 6 | a >>> 26) + b | 0;
      d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
      d = (d << 10 | d >>> 22) + a | 0;
      c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
      c = (c << 15 | c >>> 17) + d | 0;
      b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
      b = (b << 21 | b >>> 11) + c | 0;
      x[0] = a + x[0] | 0;
      x[1] = b + x[1] | 0;
      x[2] = c + x[2] | 0;
      x[3] = d + x[3] | 0;
    }
    function md5blk(s) {
      var md5blks = [], i2;
      for (i2 = 0; i2 < 64; i2 += 4) {
        md5blks[i2 >> 2] = s.charCodeAt(i2) + (s.charCodeAt(i2 + 1) << 8) + (s.charCodeAt(i2 + 2) << 16) + (s.charCodeAt(i2 + 3) << 24);
      }
      return md5blks;
    }
    function md5blk_array(a) {
      var md5blks = [], i2;
      for (i2 = 0; i2 < 64; i2 += 4) {
        md5blks[i2 >> 2] = a[i2] + (a[i2 + 1] << 8) + (a[i2 + 2] << 16) + (a[i2 + 3] << 24);
      }
      return md5blks;
    }
    function md51(s) {
      var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i2, length, tail, tmp, lo, hi;
      for (i2 = 64; i2 <= n; i2 += 64) {
        md5cycle(state, md5blk(s.substring(i2 - 64, i2)));
      }
      s = s.substring(i2 - 64);
      length = s.length;
      tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i2 = 0; i2 < length; i2 += 1) {
        tail[i2 >> 2] |= s.charCodeAt(i2) << (i2 % 4 << 3);
      }
      tail[i2 >> 2] |= 128 << (i2 % 4 << 3);
      if (i2 > 55) {
        md5cycle(state, tail);
        for (i2 = 0; i2 < 16; i2 += 1) {
          tail[i2] = 0;
        }
      }
      tmp = n * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(state, tail);
      return state;
    }
    function md51_array(a) {
      var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i2, length, tail, tmp, lo, hi;
      for (i2 = 64; i2 <= n; i2 += 64) {
        md5cycle(state, md5blk_array(a.subarray(i2 - 64, i2)));
      }
      a = i2 - 64 < n ? a.subarray(i2 - 64) : new Uint8Array(0);
      length = a.length;
      tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i2 = 0; i2 < length; i2 += 1) {
        tail[i2 >> 2] |= a[i2] << (i2 % 4 << 3);
      }
      tail[i2 >> 2] |= 128 << (i2 % 4 << 3);
      if (i2 > 55) {
        md5cycle(state, tail);
        for (i2 = 0; i2 < 16; i2 += 1) {
          tail[i2] = 0;
        }
      }
      tmp = n * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(state, tail);
      return state;
    }
    function rhex(n) {
      var s = "", j;
      for (j = 0; j < 4; j += 1) {
        s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
      }
      return s;
    }
    function hex(x) {
      var i2;
      for (i2 = 0; i2 < x.length; i2 += 1) {
        x[i2] = rhex(x[i2]);
      }
      return x.join("");
    }
    if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") ;
    if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
      (function() {
        function clamp(val, length) {
          val = val | 0 || 0;
          if (val < 0) {
            return Math.max(val + length, 0);
          }
          return Math.min(val, length);
        }
        ArrayBuffer.prototype.slice = function(from, to) {
          var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
          if (to !== undefined$1) {
            end = clamp(to, length);
          }
          if (begin > end) {
            return new ArrayBuffer(0);
          }
          num = end - begin;
          target = new ArrayBuffer(num);
          targetArray = new Uint8Array(target);
          sourceArray = new Uint8Array(this, begin, num);
          targetArray.set(sourceArray);
          return target;
        };
      })();
    }
    function toUtf8(str) {
      if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
      }
      return str;
    }
    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
      var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i2;
      for (i2 = 0; i2 < length; i2 += 1) {
        arr[i2] = str.charCodeAt(i2);
      }
      return returnUInt8Array ? arr : buff;
    }
    function arrayBuffer2Utf8Str(buff) {
      return String.fromCharCode.apply(null, new Uint8Array(buff));
    }
    function concatenateArrayBuffers(first, second, returnUInt8Array) {
      var result = new Uint8Array(first.byteLength + second.byteLength);
      result.set(new Uint8Array(first));
      result.set(new Uint8Array(second), first.byteLength);
      return result;
    }
    function hexToBinaryString(hex2) {
      var bytes = [], length = hex2.length, x;
      for (x = 0; x < length - 1; x += 2) {
        bytes.push(parseInt(hex2.substr(x, 2), 16));
      }
      return String.fromCharCode.apply(String, bytes);
    }
    function SparkMD52() {
      this.reset();
    }
    SparkMD52.prototype.append = function(str) {
      this.appendBinary(toUtf8(str));
      return this;
    };
    SparkMD52.prototype.appendBinary = function(contents) {
      this._buff += contents;
      this._length += contents.length;
      var length = this._buff.length, i2;
      for (i2 = 64; i2 <= length; i2 += 64) {
        md5cycle(this._hash, md5blk(this._buff.substring(i2 - 64, i2)));
      }
      this._buff = this._buff.substring(i2 - 64);
      return this;
    };
    SparkMD52.prototype.end = function(raw) {
      var buff = this._buff, length = buff.length, i2, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
      for (i2 = 0; i2 < length; i2 += 1) {
        tail[i2 >> 2] |= buff.charCodeAt(i2) << (i2 % 4 << 3);
      }
      this._finish(tail, length);
      ret = hex(this._hash);
      if (raw) {
        ret = hexToBinaryString(ret);
      }
      this.reset();
      return ret;
    };
    SparkMD52.prototype.reset = function() {
      this._buff = "";
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD52.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    };
    SparkMD52.prototype.setState = function(state) {
      this._buff = state.buff;
      this._length = state.length;
      this._hash = state.hash;
      return this;
    };
    SparkMD52.prototype.destroy = function() {
      delete this._hash;
      delete this._buff;
      delete this._length;
    };
    SparkMD52.prototype._finish = function(tail, length) {
      var i2 = length, tmp, lo, hi;
      tail[i2 >> 2] |= 128 << (i2 % 4 << 3);
      if (i2 > 55) {
        md5cycle(this._hash, tail);
        for (i2 = 0; i2 < 16; i2 += 1) {
          tail[i2] = 0;
        }
      }
      tmp = this._length * 8;
      tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
      lo = parseInt(tmp[2], 16);
      hi = parseInt(tmp[1], 16) || 0;
      tail[14] = lo;
      tail[15] = hi;
      md5cycle(this._hash, tail);
    };
    SparkMD52.hash = function(str, raw) {
      return SparkMD52.hashBinary(toUtf8(str), raw);
    };
    SparkMD52.hashBinary = function(content, raw) {
      var hash = md51(content), ret = hex(hash);
      return raw ? hexToBinaryString(ret) : ret;
    };
    SparkMD52.ArrayBuffer = function() {
      this.reset();
    };
    SparkMD52.ArrayBuffer.prototype.append = function(arr) {
      var buff = concatenateArrayBuffers(this._buff.buffer, arr), length = buff.length, i2;
      this._length += arr.byteLength;
      for (i2 = 64; i2 <= length; i2 += 64) {
        md5cycle(this._hash, md5blk_array(buff.subarray(i2 - 64, i2)));
      }
      this._buff = i2 - 64 < length ? new Uint8Array(buff.buffer.slice(i2 - 64)) : new Uint8Array(0);
      return this;
    };
    SparkMD52.ArrayBuffer.prototype.end = function(raw) {
      var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i2, ret;
      for (i2 = 0; i2 < length; i2 += 1) {
        tail[i2 >> 2] |= buff[i2] << (i2 % 4 << 3);
      }
      this._finish(tail, length);
      ret = hex(this._hash);
      if (raw) {
        ret = hexToBinaryString(ret);
      }
      this.reset();
      return ret;
    };
    SparkMD52.ArrayBuffer.prototype.reset = function() {
      this._buff = new Uint8Array(0);
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD52.ArrayBuffer.prototype.getState = function() {
      var state = SparkMD52.prototype.getState.call(this);
      state.buff = arrayBuffer2Utf8Str(state.buff);
      return state;
    };
    SparkMD52.ArrayBuffer.prototype.setState = function(state) {
      state.buff = utf8Str2ArrayBuffer(state.buff, true);
      return SparkMD52.prototype.setState.call(this, state);
    };
    SparkMD52.ArrayBuffer.prototype.destroy = SparkMD52.prototype.destroy;
    SparkMD52.ArrayBuffer.prototype._finish = SparkMD52.prototype._finish;
    SparkMD52.ArrayBuffer.hash = function(arr, raw) {
      var hash = md51_array(new Uint8Array(arr)), ret = hex(hash);
      return raw ? hexToBinaryString(ret) : ret;
    };
    return SparkMD52;
  }));
})(sparkMd5);
var SparkMD5 = sparkMd5.exports;
var fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
var FileChecksum = class _FileChecksum {
  static create(file, callback) {
    const instance = new _FileChecksum(file);
    instance.create(callback);
  }
  constructor(file) {
    this.file = file;
    this.chunkSize = 2097152;
    this.chunkCount = Math.ceil(this.file.size / this.chunkSize);
    this.chunkIndex = 0;
  }
  create(callback) {
    this.callback = callback;
    this.md5Buffer = new SparkMD5.ArrayBuffer();
    this.fileReader = new FileReader();
    this.fileReader.addEventListener("load", ((event) => this.fileReaderDidLoad(event)));
    this.fileReader.addEventListener("error", ((event) => this.fileReaderDidError(event)));
    this.readNextChunk();
  }
  fileReaderDidLoad(event) {
    this.md5Buffer.append(event.target.result);
    if (!this.readNextChunk()) {
      const binaryDigest = this.md5Buffer.end(true);
      const base64digest = btoa(binaryDigest);
      this.callback(null, base64digest);
    }
  }
  fileReaderDidError(event) {
    this.callback(`Error reading ${this.file.name}`);
  }
  readNextChunk() {
    if (this.chunkIndex < this.chunkCount || this.chunkIndex == 0 && this.chunkCount == 0) {
      const start2 = this.chunkIndex * this.chunkSize;
      const end = Math.min(start2 + this.chunkSize, this.file.size);
      const bytes = fileSlice.call(this.file, start2, end);
      this.fileReader.readAsArrayBuffer(bytes);
      this.chunkIndex++;
      return true;
    } else {
      return false;
    }
  }
};
function getMetaValue(name) {
  const element = findElement(document.head, `meta[name="${name}"]`);
  if (element) {
    return element.getAttribute("content");
  }
}
function findElements(root, selector) {
  if (typeof root == "string") {
    selector = root;
    root = document;
  }
  const elements = root.querySelectorAll(selector);
  return toArray(elements);
}
function findElement(root, selector) {
  if (typeof root == "string") {
    selector = root;
    root = document;
  }
  return root.querySelector(selector);
}
function dispatchEvent$1(element, type, eventInit = {}) {
  const { disabled } = element;
  const { bubbles, cancelable, detail } = eventInit;
  const event = document.createEvent("Event");
  event.initEvent(type, bubbles || true, cancelable || true);
  event.detail = detail || {};
  try {
    element.disabled = false;
    element.dispatchEvent(event);
  } finally {
    element.disabled = disabled;
  }
  return event;
}
function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (Array.from) {
    return Array.from(value);
  } else {
    return [].slice.call(value);
  }
}
var BlobRecord = class {
  constructor(file, checksum, url, customHeaders = {}) {
    this.file = file;
    this.attributes = {
      filename: file.name,
      content_type: file.type || "application/octet-stream",
      byte_size: file.size,
      checksum
    };
    this.xhr = new XMLHttpRequest();
    this.xhr.open("POST", url, true);
    this.xhr.responseType = "json";
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader("Accept", "application/json");
    this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    Object.keys(customHeaders).forEach(((headerKey) => {
      this.xhr.setRequestHeader(headerKey, customHeaders[headerKey]);
    }));
    const csrfToken = getMetaValue("csrf-token");
    if (csrfToken != void 0) {
      this.xhr.setRequestHeader("X-CSRF-Token", csrfToken);
    }
    this.xhr.addEventListener("load", ((event) => this.requestDidLoad(event)));
    this.xhr.addEventListener("error", ((event) => this.requestDidError(event)));
  }
  get status() {
    return this.xhr.status;
  }
  get response() {
    const { responseType, response } = this.xhr;
    if (responseType == "json") {
      return response;
    } else {
      return JSON.parse(response);
    }
  }
  create(callback) {
    this.callback = callback;
    this.xhr.send(JSON.stringify({
      blob: this.attributes
    }));
  }
  requestDidLoad(event) {
    if (this.status >= 200 && this.status < 300) {
      const { response } = this;
      const { direct_upload } = response;
      delete response.direct_upload;
      this.attributes = response;
      this.directUploadData = direct_upload;
      this.callback(null, this.toJSON());
    } else {
      this.requestDidError(event);
    }
  }
  requestDidError(event) {
    this.callback(`Error creating Blob for "${this.file.name}". Status: ${this.status}`);
  }
  toJSON() {
    const result = {};
    for (const key in this.attributes) {
      result[key] = this.attributes[key];
    }
    return result;
  }
};
var BlobUpload = class {
  constructor(blob) {
    this.blob = blob;
    this.file = blob.file;
    const { url, headers } = blob.directUploadData;
    this.xhr = new XMLHttpRequest();
    this.xhr.open("PUT", url, true);
    this.xhr.responseType = "text";
    for (const key in headers) {
      this.xhr.setRequestHeader(key, headers[key]);
    }
    this.xhr.addEventListener("load", ((event) => this.requestDidLoad(event)));
    this.xhr.addEventListener("error", ((event) => this.requestDidError(event)));
  }
  create(callback) {
    this.callback = callback;
    this.xhr.send(this.file.slice());
  }
  requestDidLoad(event) {
    const { status, response } = this.xhr;
    if (status >= 200 && status < 300) {
      this.callback(null, response);
    } else {
      this.requestDidError(event);
    }
  }
  requestDidError(event) {
    this.callback(`Error storing "${this.file.name}". Status: ${this.xhr.status}`);
  }
};
var id = 0;
var DirectUpload = class {
  constructor(file, url, delegate, customHeaders = {}) {
    this.id = ++id;
    this.file = file;
    this.url = url;
    this.delegate = delegate;
    this.customHeaders = customHeaders;
  }
  create(callback) {
    FileChecksum.create(this.file, ((error, checksum) => {
      if (error) {
        callback(error);
        return;
      }
      const blob = new BlobRecord(this.file, checksum, this.url, this.customHeaders);
      notify(this.delegate, "directUploadWillCreateBlobWithXHR", blob.xhr);
      blob.create(((error2) => {
        if (error2) {
          callback(error2);
        } else {
          const upload = new BlobUpload(blob);
          notify(this.delegate, "directUploadWillStoreFileWithXHR", upload.xhr);
          upload.create(((error3) => {
            if (error3) {
              callback(error3);
            } else {
              callback(null, blob.toJSON());
            }
          }));
        }
      }));
    }));
  }
};
function notify(object, methodName, ...messages) {
  if (object && typeof object[methodName] == "function") {
    return object[methodName](...messages);
  }
}
var DirectUploadController$1 = class DirectUploadController {
  constructor(input, file) {
    this.input = input;
    this.file = file;
    this.directUpload = new DirectUpload(this.file, this.url, this);
    this.dispatch("initialize");
  }
  start(callback) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = this.input.name;
    this.input.insertAdjacentElement("beforebegin", hiddenInput);
    this.dispatch("start");
    this.directUpload.create(((error, attributes) => {
      if (error) {
        hiddenInput.parentNode.removeChild(hiddenInput);
        this.dispatchError(error);
      } else {
        hiddenInput.value = attributes.signed_id;
      }
      this.dispatch("end");
      callback(error);
    }));
  }
  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 90;
    if (progress) {
      this.dispatch("progress", {
        progress
      });
    }
  }
  get url() {
    return this.input.getAttribute("data-direct-upload-url");
  }
  dispatch(name, detail = {}) {
    detail.file = this.file;
    detail.id = this.directUpload.id;
    return dispatchEvent$1(this.input, `direct-upload:${name}`, {
      detail
    });
  }
  dispatchError(error) {
    const event = this.dispatch("error", {
      error
    });
    if (!event.defaultPrevented) {
      alert(error);
    }
  }
  directUploadWillCreateBlobWithXHR(xhr) {
    this.dispatch("before-blob-request", {
      xhr
    });
  }
  directUploadWillStoreFileWithXHR(xhr) {
    this.dispatch("before-storage-request", {
      xhr
    });
    xhr.upload.addEventListener("progress", ((event) => this.uploadRequestDidProgress(event)));
    xhr.upload.addEventListener("loadend", (() => {
      this.simulateResponseProgress(xhr);
    }));
  }
  simulateResponseProgress(xhr) {
    let progress = 90;
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const estimatedResponseTime = this.estimateResponseTime();
      const responseProgress = Math.min(elapsed / estimatedResponseTime, 1);
      progress = 90 + responseProgress * 9;
      this.dispatch("progress", {
        progress
      });
      if (xhr.readyState !== XMLHttpRequest.DONE && progress < 99) {
        requestAnimationFrame(updateProgress);
      }
    };
    xhr.addEventListener("loadend", (() => {
      this.dispatch("progress", {
        progress: 100
      });
    }));
    requestAnimationFrame(updateProgress);
  }
  estimateResponseTime() {
    const fileSize = this.file.size;
    const MB = 1024 * 1024;
    if (fileSize < MB) {
      return 1e3;
    } else if (fileSize < 10 * MB) {
      return 2e3;
    } else {
      return 3e3 + fileSize / MB * 50;
    }
  }
};
var inputSelector = "input[type=file][data-direct-upload-url]:not([disabled])";
var DirectUploadsController = class {
  constructor(form) {
    this.form = form;
    this.inputs = findElements(form, inputSelector).filter(((input) => input.files.length));
  }
  start(callback) {
    const controllers = this.createDirectUploadControllers();
    const startNextController = () => {
      const controller = controllers.shift();
      if (controller) {
        controller.start(((error) => {
          if (error) {
            callback(error);
            this.dispatch("end");
          } else {
            startNextController();
          }
        }));
      } else {
        callback();
        this.dispatch("end");
      }
    };
    this.dispatch("start");
    startNextController();
  }
  createDirectUploadControllers() {
    const controllers = [];
    this.inputs.forEach(((input) => {
      toArray(input.files).forEach(((file) => {
        const controller = new DirectUploadController$1(input, file);
        controllers.push(controller);
      }));
    }));
    return controllers;
  }
  dispatch(name, detail = {}) {
    return dispatchEvent$1(this.form, `direct-uploads:${name}`, {
      detail
    });
  }
};
var processingAttribute = "data-direct-uploads-processing";
var submitButtonsByForm = /* @__PURE__ */ new WeakMap();
var started = false;
function start() {
  if (!started) {
    started = true;
    document.addEventListener("click", didClick, true);
    document.addEventListener("submit", didSubmitForm, true);
    document.addEventListener("ajax:before", didSubmitRemoteElement);
  }
}
function didClick(event) {
  const button = event.target.closest("button, input");
  if (button && button.type === "submit" && button.form) {
    submitButtonsByForm.set(button.form, button);
  }
}
function didSubmitForm(event) {
  handleFormSubmissionEvent(event);
}
function didSubmitRemoteElement(event) {
  if (event.target.tagName == "FORM") {
    handleFormSubmissionEvent(event);
  }
}
function handleFormSubmissionEvent(event) {
  const form = event.target;
  if (form.hasAttribute(processingAttribute)) {
    event.preventDefault();
    return;
  }
  const controller = new DirectUploadsController(form);
  const { inputs } = controller;
  if (inputs.length) {
    event.preventDefault();
    form.setAttribute(processingAttribute, "");
    inputs.forEach(disable);
    controller.start(((error) => {
      form.removeAttribute(processingAttribute);
      if (error) {
        inputs.forEach(enable);
      } else {
        submitForm(form);
      }
    }));
  }
}
function submitForm(form) {
  let button = submitButtonsByForm.get(form) || findElement(form, "input[type=submit], button[type=submit]");
  if (button) {
    const { disabled } = button;
    button.disabled = false;
    button.focus();
    button.click();
    button.disabled = disabled;
  } else {
    button = document.createElement("input");
    button.type = "submit";
    button.style.display = "none";
    form.appendChild(button);
    button.click();
    form.removeChild(button);
  }
  submitButtonsByForm.delete(form);
}
function disable(input) {
  input.disabled = true;
}
function enable(input) {
  input.disabled = false;
}
function autostart() {
  if (window.ActiveStorage) {
    start();
  }
}
setTimeout(autostart, 1);
var DirectUploadController2 = class {
  uploadedFile;
  file;
  directUpload;
  recordXHR;
  uploadXHR;
  callback = null;
  cancelled = false;
  completed = false;
  constructor(uploadedFile, file) {
    this.uploadedFile = uploadedFile;
    this.file = file;
    this.directUpload = new DirectUpload(this.file, this.uploadedFile.url, this);
  }
  cancel() {
    this.cancelled = true;
    this.abortXHR(this.recordXHR);
    this.abortXHR(this.uploadXHR);
    this.complete("aborted", {});
  }
  abortXHR(xhr) {
    if (!xhr)
      return;
    xhr.abort();
  }
  start(callback) {
    this.callback = callback;
    this.dispatch("start");
    this.directUpload.create((error, attributes) => {
      this.complete(error, attributes);
    });
  }
  complete(error, _attributes) {
    if (this.completed)
      return;
    this.completed = true;
    if (error) {
      this.dispatchError(error);
    }
    this.dispatch("end");
    this.callback(error);
  }
  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100;
    if (progress) {
      this.dispatch("progress", {
        progress
      });
    }
  }
  dispatch(name, detail = {}) {
    return dispatchEvent(this.uploadedFile, `direct-upload:${name}`, {
      detail: {
        ...detail,
        file: this.file,
        id: this.directUpload.id
      }
    });
  }
  dispatchError(error) {
    this.dispatch("error", {
      error
    });
  }
  directUploadWillCreateBlobWithXHR(xhr) {
    this.recordXHR = xhr;
    if (this.cancelled) {
      xhr.send = () => {
      };
      return;
    }
    this.dispatch("before-blob-request", {
      xhr
    });
  }
  directUploadWillStoreFileWithXHR(xhr) {
    this.uploadXHR = xhr;
    if (this.cancelled) {
      xhr.send = () => {
      };
      return;
    }
    this.uploadedFile.value = this.recordXHR.response.signed_id;
    this.dispatch("before-storage-request", {
      xhr
    });
    xhr.upload.addEventListener("progress", ((event) => this.uploadRequestDidProgress(event)));
  }
};
function dispatchEvent(element, type, eventInit = {}) {
  const { disabled } = element;
  const { bubbles, cancelable, detail } = eventInit;
  const event = document.createEvent("Event");
  event.initEvent(type, bubbles || true, cancelable || true);
  event.detail = detail || {};
  try {
    element.disabled = false;
    element.dispatchEvent(event);
  } finally {
    element.disabled = disabled;
  }
  return event;
}
var Max = class {
  uploadedFile;
  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile;
  }
  get errors() {
    if (this.#errors)
      return this.#errors;
    this.#errors = [];
    if (!this.checkValidity()) {
      this.#errors.push(this.errorMessage);
    }
    return this.#errors;
  }
  #errors;
  checkValidity() {
    if (!this.uploadedFile.max)
      return true;
    return this.uploadedFile.size <= this.uploadedFile.max;
  }
  get errorMessage() {
    return [
      `Must be smaller than ${this.formatBytes(this.uploadedFile.max)},`,
      `and "${this.uploadedFile.filename}" is ${this.formatBytes(this.uploadedFile.size)}.`,
      `Please attach a smaller file.`
    ].join(" ");
  }
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i2 = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i2)).toFixed(dm)) + sizes[i2];
  }
};
var Accepts = class {
  uploadedFile;
  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile;
  }
  get errors() {
    if (this.#errors)
      return this.#errors;
    this.#errors = [];
    const accepts = this.uploadedFile.accepts ? this.uploadedFile.accepts.split(/,\s*/) : [];
    if (accepts.length > 0 && !accepts.includes(this.uploadedFile.filetype)) {
      this.#errors.push(`Must be a ${this.joinWords(accepts)}.`);
    }
    return this.#errors;
  }
  #errors;
  joinWords(words) {
    if (words.length >= 3) {
      return (words.slice(0, -1) + [`or ${words.at(-1)}`]).join(", ");
    } else {
      return words.join(" or ");
    }
  }
};
var Extensions = {
  image: ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nef", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga", "heic", "heif"],
  video: ["3g2", "3gp", "3gpp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m3u8", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "qt", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv", "yuv"],
  pdf: ["pdf"],
  getFileType: function(filename) {
    const normalized = filename.toString().split(".").at(-1).toLowerCase().trim();
    if (this.video.includes(normalized))
      return "video";
    if (this.image.includes(normalized))
      return "image";
    if (this.pdf.includes(normalized))
      return "pdf";
    return "unknown";
  }
};
var FetchResponse = class {
  constructor(response) {
    this.response = response;
  }
  get statusCode() {
    return this.response.status;
  }
  get redirected() {
    return this.response.redirected;
  }
  get ok() {
    return this.response.ok;
  }
  get unauthenticated() {
    return this.statusCode === 401;
  }
  get unprocessableEntity() {
    return this.statusCode === 422;
  }
  get authenticationURL() {
    return this.response.headers.get("WWW-Authenticate");
  }
  get contentType() {
    const contentType = this.response.headers.get("Content-Type") || "";
    return contentType.replace(/;.*$/, "");
  }
  get headers() {
    return this.response.headers;
  }
  get html() {
    if (this.contentType.match(/^(application|text)\/(html|xhtml\+xml)$/)) {
      return this.text;
    }
    return Promise.reject(new Error(`Expected an HTML response but got "${this.contentType}" instead`));
  }
  get json() {
    if (this.contentType.match(/^application\/.*json$/)) {
      return this.responseJson || (this.responseJson = this.response.json());
    }
    return Promise.reject(new Error(`Expected a JSON response but got "${this.contentType}" instead`));
  }
  get text() {
    return this.responseText || (this.responseText = this.response.text());
  }
  get isTurboStream() {
    return this.contentType.match(/^text\/vnd\.turbo-stream\.html/);
  }
  async renderTurboStream() {
    if (this.isTurboStream) {
      if (window.Turbo) {
        await window.Turbo.renderStreamMessage(await this.text);
      } else {
        console.warn("You must set `window.Turbo = Turbo` to automatically process Turbo Stream events with request.js");
      }
    } else {
      return Promise.reject(new Error(`Expected a Turbo Stream response but got "${this.contentType}" instead`));
    }
  }
};
var RequestInterceptor = class {
  static register(interceptor) {
    this.interceptor = interceptor;
  }
  static get() {
    return this.interceptor;
  }
  static reset() {
    this.interceptor = void 0;
  }
};
function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = cookies.find((cookie2) => cookie2.startsWith(prefix));
  if (cookie) {
    const value = cookie.split("=").slice(1).join("=");
    if (value) {
      return decodeURIComponent(value);
    }
  }
}
function compact(object) {
  const result = {};
  for (const key in object) {
    const value = object[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function metaContent(name) {
  const element = document.head.querySelector(`meta[name="${name}"]`);
  return element && element.content;
}
function stringEntriesFromFormData(formData) {
  return [...formData].reduce((entries, [name, value]) => {
    return entries.concat(typeof value === "string" ? [[name, value]] : []);
  }, []);
}
function mergeEntries(searchParams, entries) {
  for (const [name, value] of entries) {
    if (value instanceof window.File) continue;
    if (searchParams.has(name)) {
      searchParams.delete(name);
      searchParams.set(name, value);
    } else {
      searchParams.append(name, value);
    }
  }
}
var FetchRequest = class {
  constructor(method, url, options = {}) {
    this.method = method;
    this.options = options;
    this.originalUrl = url.toString();
  }
  async perform() {
    try {
      const requestInterceptor = RequestInterceptor.get();
      if (requestInterceptor) {
        await requestInterceptor(this);
      }
    } catch (error) {
      console.error(error);
    }
    const response = new FetchResponse(await window.fetch(this.url, this.fetchOptions));
    if (response.unauthenticated && response.authenticationURL) {
      return Promise.reject(window.location.href = response.authenticationURL);
    }
    if (response.ok && response.isTurboStream) {
      await response.renderTurboStream();
    }
    return response;
  }
  addHeader(key, value) {
    const headers = this.additionalHeaders;
    headers[key] = value;
    this.options.headers = headers;
  }
  get fetchOptions() {
    return {
      method: this.method.toUpperCase(),
      headers: this.headers,
      body: this.formattedBody,
      signal: this.signal,
      credentials: "same-origin",
      redirect: this.redirect
    };
  }
  get headers() {
    return compact(
      Object.assign(
        {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-Token": this.csrfToken,
          "Content-Type": this.contentType,
          Accept: this.accept
        },
        this.additionalHeaders
      )
    );
  }
  get csrfToken() {
    return getCookie(metaContent("csrf-param")) || metaContent("csrf-token");
  }
  get contentType() {
    if (this.options.contentType) {
      return this.options.contentType;
    } else if (this.body == null || this.body instanceof window.FormData) {
      return void 0;
    } else if (this.body instanceof window.File) {
      return this.body.type;
    }
    return "application/json";
  }
  get accept() {
    switch (this.responseKind) {
      case "html":
        return "text/html, application/xhtml+xml";
      case "turbo-stream":
        return "text/vnd.turbo-stream.html, text/html, application/xhtml+xml";
      case "json":
        return "application/json, application/vnd.api+json";
      default:
        return "*/*";
    }
  }
  get body() {
    return this.options.body;
  }
  get query() {
    const originalQuery = (this.originalUrl.split("?")[1] || "").split("#")[0];
    const params = new URLSearchParams(originalQuery);
    let requestQuery = this.options.query;
    if (requestQuery instanceof window.FormData) {
      requestQuery = stringEntriesFromFormData(requestQuery);
    } else if (requestQuery instanceof window.URLSearchParams) {
      requestQuery = requestQuery.entries();
    } else {
      requestQuery = Object.entries(requestQuery || {});
    }
    mergeEntries(params, requestQuery);
    const query = params.toString();
    return query.length > 0 ? `?${query}` : "";
  }
  get url() {
    return this.originalUrl.split("?")[0].split("#")[0] + this.query;
  }
  get responseKind() {
    return this.options.responseKind || "html";
  }
  get signal() {
    return this.options.signal;
  }
  get redirect() {
    return this.options.redirect || "follow";
  }
  get additionalHeaders() {
    return this.options.headers || {};
  }
  get formattedBody() {
    const bodyIsAString = Object.prototype.toString.call(this.body) === "[object String]";
    const contentTypeIsJson = this.headers["Content-Type"] === "application/json";
    if (contentTypeIsJson && !bodyIsAString) {
      return JSON.stringify(this.body);
    }
    return this.body;
  }
};
var request = (verb, url, payload, headers) => {
  const req = new FetchRequest(verb, url, {
    headers: { Accept: "application/json", ...headers },
    ...{ query: payload }
  });
  return req.perform().then((response) => {
    if (response.response.ok) {
      return response.json;
    } else {
      return response;
    }
  });
};
var get = (url, payload = {}, headers = {}) => request("get", url, payload, headers);
var attachmentFileCss = `:host{display:block;width:100%;max-width:100%;font-size:13px}figure{margin:0}.progress-details{position:relative;display:flex;align-items:center}progress-bar{flex:1 0;padding:0 10px}progress-bar.pending{opacity:0.5}progress-bar.complete{opacity:0.8}progress-bar:not(.complete)+.progress-icon{display:none}progress-bar.complete+.progress-icon{content:url('data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><g><path d="M6.3,9.1c0.2,0,0.5,0.1,0.7,0.4c0.5,0.5,1,1,1.4,1.4c0.3,0.3,0.3,0.3,0.6,0c1.4-1.3,2.7-2.6,4-3.9c0.3-0.3,0.6-0.4,1-0.4 c0.5,0.1,0.9,0.6,0.7,1.1c-0.1,0.2-0.2,0.4-0.3,0.6c-1.6,1.6-3.2,3.2-4.8,4.8c-0.5,0.5-1,0.5-1.6,0c-0.8-0.7-1.5-1.5-2.3-2.3 c-0.3-0.3-0.5-0.6-0.3-1.1C5.5,9.3,5.8,9.1,6.3,9.1z"/></g></svg>');filter:invert(100%)}.progress-icon{display:inline-block;flex:0 0 20px;width:28px;height:28px;background-size:contain;position:absolute;right:30px;z-index:1}progress-bar.error{background:var(--input-attachment-error-bg, rgba(74, 70, 70, 0.25));opacity:1}.progress-bar a{color:#fff}.download-link{padding-right:20px;color:#fff}.remove-media{display:inline-block;content:url('data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve"><g><path d="M0,19.9C0.2,8.5,9.2-0.1,20.1,0C31.8,0.1,40.2,9.5,40,20.4c-0.2,11-8.9,19.7-20.1,19.6C8,39.9,0,30.5,0,19.9z M20,3.7 c-9,0-16.3,7-16.3,16.2C3.7,29,10.9,36.3,20,36.3c9,0,16.3-7.1,16.4-16.3C36.3,11,29.2,3.8,20,3.7z"/><path d="M17.3,20c-0.2-0.2-0.3-0.4-0.5-0.6c-1-1-2-1.9-2.9-2.9c-0.5-0.5-0.8-1.1-0.7-1.9c0.1-0.7,0.5-1.2,1.2-1.4 c0.8-0.2,1.5,0,2.1,0.6c1,1,2,2,3,3.1c0.3,0.4,0.6,0.3,0.9,0c1-1,2-2,3-3c0.3-0.3,0.7-0.5,1.1-0.6c0.8-0.2,1.6,0.1,2,0.8 c0.4,0.8,0.3,1.7-0.4,2.4c-1,1-2,2-3,3c-0.2,0.2-0.3,0.4-0.5,0.6c1.2,1.2,2.3,2.3,3.4,3.4c0.6,0.6,0.9,1.3,0.6,2.2 c-0.4,1.1-1.7,1.6-2.6,1c-0.3-0.2-0.5-0.4-0.8-0.6c-1-1-1.9-1.9-2.9-2.9c-0.3-0.3-0.5-0.3-0.9,0c-1,1-2,2.1-3,3 c-0.4,0.4-1,0.6-1.5,0.8c-0.6,0.1-1.2-0.2-1.5-0.8c-0.4-0.6-0.5-1.3-0.1-1.9c0.2-0.3,0.4-0.5,0.6-0.7C15.1,22.3,16.2,21.2,17.3,20z "/></g></svg>');flex:0 0 25px;width:25px;height:20px;align-items:center;opacity:0.25}.remove-media:hover{opacity:1;filter:invert(50%)sepia(100%)saturate(10000%)}.remove-media span{display:inline-block;text-indent:-9999px;color:transparent}.retry-media{color:var(--input-attachment-error-color, #c00);font-size:12px;text-decoration:underline;cursor:pointer;padding-left:8px}.retry-media:hover{color:var(--input-attachment-error-color-hover, #900)}.validation-error{color:var(--input-attachment-error-color, #c00);font-size:12px;margin:4px 0 0 10px}@media (prefers-color-scheme: dark){:host{--input-attachment-error-color:#f66;--input-attachment-error-color-hover:#f99;--input-attachment-error-bg:rgba(200, 100, 100, 0.2)}.remove-media{filter:invert(1)}}`;
var AttachmentFile = /* @__PURE__ */ proxyCustomElement(class AttachmentFile2 extends H {
  constructor(registerHost2) {
    super();
    if (registerHost2 !== false) {
      this.__registerHost();
    }
    this.__attachShadow();
    this.removeEvent = createEvent(this, "attachment-file:remove", 7);
    this.validationEvent = createEvent(this, "attachment-file:validation", 7);
    this.readyEvent = createEvent(this, "attachment-file:ready", 7);
  }
  get el() {
    return this;
  }
  name;
  accepts;
  max;
  url;
  value = "";
  filename;
  src;
  filetype;
  size;
  state = "complete";
  percent = 100;
  preview = true;
  validationMessage;
  removeEvent;
  validationEvent;
  readyEvent;
  removeClicked = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.controller?.cancel();
    this.removeEvent.emit(this);
  };
  retryClicked = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.state = "pending";
    this.percent = 0;
    this.validationError = "";
    this.uploadError = "";
    this.controller = new DirectUploadController2(this.el, this._file);
    this.controller.dispatch("initialize", { controller: this.controller });
  };
  controller;
  _file;
  validationError = "";
  uploadError = "";
  componentWillLoad() {
    this.setMissingFiletype();
  }
  get file() {
    return this._file;
  }
  set file(file) {
    this.src = URL.createObjectURL(file);
    this.filename = file.name;
    this.size = file.size;
    this.state = "pending";
    this.percent = 0;
    this._file = file;
  }
  set signedId(val) {
    if (this.value !== val) {
      get(`/rails/active_storage/blobs/info/${val}`).then((blob) => {
        this.src = `/rails/active_storage/blobs/redirect/${val}/${blob.filename}`;
        this.filename = blob.filename;
        this.size = blob.byte_size;
        this.state = "complete";
        this.percent = 100;
        this.value = val;
        this.readyEvent.emit(this);
      });
    }
  }
  setMissingFiletype(_value, _previousValue) {
    if (!this.filetype && this.filename) {
      this.filetype = Extensions.getFileType(this.filename);
    }
  }
  start(_event) {
    this.state = "pending";
    this.percent = 0;
  }
  progress(event) {
    const { progress } = event.detail;
    this.percent = progress;
  }
  error(event) {
    event.preventDefault();
    const { error } = event.detail;
    this.state = "error";
    this.uploadError = error;
  }
  end(_event) {
    if (this.state !== "error") {
      this.state = "complete";
      this.percent = 100;
    }
  }
  render() {
    return h(Host, { key: "1af2d43e01a8714c658ea70a9ca68cce57bbda12" }, h("slot", { key: "deadfff4a159e17d52ed8f66d5d18aecc71fb44d" }), h("figure", { key: "7319a724f2d51c396734dacd7528b1864fb8e980" }, h("div", { key: "ce0794f4062073a8fc28e4f2398a91d711f00521", class: "progress-details" }, h("progress-bar", { key: "30c130654e71e87036beaaf02f15453e1d35ab7a", percent: this.percent, class: this.state }, h("a", { key: "12dcf70078803fe226e9abf265dcaacd0241bfe3", class: "download-link", href: this.src, download: this.filename, onClick: (e) => e.stopPropagation() }, this.filename)), h("span", { key: "e736b315d4e0c3ec601c0fdec08ce7cce5665bef", class: "progress-icon" }), h("a", { key: "dd356dcc5f72ad33a5a52de080aa60f4af7df284", class: "remove-media", onClick: this.removeClicked, href: "#" }, h("span", { key: "c9976fdb30e8d3fa78bfc838eba1e8c33ff11c04" }, "Remove media")), this.uploadError && this._file ? h("a", { class: "retry-media", onClick: this.retryClicked, href: "#" }, h("span", null, "Retry upload")) : ""), this.validationError || this.uploadError ? h("p", { class: "validation-error" }, this.validationError || this.uploadError) : "", this.preview ? h("attachment-preview", { src: this.src, filetype: this.filetype }) : ""));
  }
  componentDidLoad() {
    if (this.state == "pending" && this._file) {
      if (this.checkValidity()) {
        this.controller = new DirectUploadController2(this.el, this._file);
        this.controller.dispatch("initialize", { controller: this.controller });
      } else {
        this.state = "error";
      }
    }
  }
  checkValidity() {
    let errors = [];
    errors.push(...new Accepts(this).errors);
    errors.push(...new Max(this).errors);
    this.validationError = errors.join(" ");
    this.validationEvent.emit({ valid: errors.length === 0, error: this.validationError });
    return errors.length === 0;
  }
  static get watchers() {
    return {
      "filename": ["setMissingFiletype"]
    };
  }
  static get style() {
    return attachmentFileCss;
  }
}, [257, "attachment-file", {
  "name": [1537],
  "accepts": [1537],
  "max": [1538],
  "url": [1537],
  "value": [1537],
  "filename": [1537],
  "src": [1537],
  "filetype": [1537],
  "size": [1538],
  "state": [1537],
  "percent": [1538],
  "preview": [1540],
  "validationMessage": [1, "validation-message"]
}, [[0, "direct-upload:initialize", "start"], [0, "direct-upload:start", "start"], [0, "direct-upload:progress", "progress"], [0, "direct-upload:error", "error"], [0, "direct-upload:end", "end"]], {
  "filename": ["setMissingFiletype"]
}]);

// dist/components/attachment-file.js
var AttachmentFile3 = AttachmentFile;

// dist/components/attachment-preview.js
var AttachmentPreview3 = AttachmentPreview;

// dist/components/index2.js
var ProgressBar = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._percent = 0;
  }
  connectedCallback() {
    this.render();
    this.updateBar();
  }
  get percent() {
    return this._percent;
  }
  set percent(value) {
    this._percent = Number(value) || 0;
    this.setAttribute("percent", this._percent);
    this.updateBar();
  }
  static get observedAttributes() {
    return ["percent"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "percent") {
      this._percent = Number(newValue) || 0;
      this.updateBar();
    }
  }
  updateBar() {
    const bar = this.shadowRoot?.querySelector(".bar");
    if (bar) {
      bar.style.width = `${this._percent}%`;
    }
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --progress-color: rgb(57, 137, 39);
          --progress-duration: 120ms;
          --bar-height: 32px;
          --bar-radius: 4px;
          --bar-padding: 8px;
          --bar-border-color: #999;

          display: block;
          position: relative;
          padding: var(--bar-padding);
          border: 1px solid var(--bar-border-color);
          border-radius: var(--bar-radius);
        }

        .bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--progress-color);
          width: 0%;
          transition: width var(--progress-duration) ease, opacity 60ms ease;
          border-radius: var(--bar-radius);
        }

        .content {
          position: relative;
          display: block;
          color: white;
          font-size: 13px;
          z-index: 1;
        }
      </style>

      <div class="bar"></div>
      <span class="content">
        <slot></slot>
      </span>
    `;
  }
};
if (!customElements.get("progress-bar")) {
  customElements.define("progress-bar", ProgressBar);
}

// dist/components/input-attachment.js
var FormController = class _FormController {
  static instance(form, options = {}) {
    return form.inputAttachmentFormController ||= new _FormController(form, options);
  }
  dialog;
  element;
  controllers;
  submitted;
  processing;
  constructor(form, { uploadDialog = true } = {}) {
    this.element = form;
    this.controllers = [];
    this.submitted = false;
    this.processing = false;
    if (uploadDialog) {
      this.dialog = document.createElement("upload-dialog");
      this.dialog.id = "form-controller-dialog";
      this.element.appendChild(this.dialog);
    }
    this.element.addEventListener("submit", (event) => this.submit(event));
    window.addEventListener("beforeunload", (event) => this.beforeUnload(event));
    this.element.addEventListener("direct-upload:initialize", (event) => this.init(event));
    this.element.addEventListener("direct-upload:start", (event) => this.start(event));
    this.element.addEventListener("direct-upload:progress", (event) => this.progress(event));
    this.element.addEventListener("direct-upload:error", (event) => this.error(event));
    this.element.addEventListener("direct-upload:end", (event) => this.end(event));
    this.element.addEventListener("attachment-file:remove", (event) => this.removeUploadedFile(event));
  }
  beforeUnload(event) {
    if (this.processing) {
      event.preventDefault();
      return event.returnValue = "";
    }
  }
  submit(event) {
    if (this.controllers.length === 0 && !this.hasUploadErrors() && !this.processing)
      return;
    event.preventDefault();
    this.submitted = true;
    this.setInputAttachmentsDisabled(true);
    this.startNextController();
    if (this.processing) {
      this.dialog?.open();
    }
  }
  startNextController() {
    if (this.processing)
      return;
    const controller = this.controllers.shift();
    if (controller) {
      this.processing = true;
      if (this.submitted) {
        this.setInputAttachmentsDisabled(true);
      } else {
        this.setControllerInputDisabled(controller, true);
      }
      controller.start((error) => {
        if (this.submitted) {
          if (error) {
            this.setInputAttachmentsDisabled(false);
          }
        } else {
          this.setControllerInputDisabled(controller, false);
        }
        this.processing = false;
        this.startNextController();
      });
    } else {
      this.submitForm();
    }
  }
  hasUploadErrors() {
    return Array.from(this.element.querySelectorAll("attachment-file")).some((el) => el.state === "error");
  }
  submitForm() {
    if (!this.submitted)
      return;
    if (this.hasUploadErrors()) {
      this.dialog?.close();
      this.setInputAttachmentsDisabled(false);
      return;
    }
    this.setInputAttachmentsDisabled(true);
    requestAnimationFrame(() => {
      this.element.submit();
    });
  }
  setControllerInputDisabled(controller, disabled) {
    const inputAttachment = controller.uploadedFile.closest("input-attachment");
    if (inputAttachment) {
      inputAttachment.disabled = disabled;
    }
  }
  setInputAttachmentsDisabled(disabled) {
    Array.from(this.element.querySelectorAll("input-attachment")).forEach((el) => {
      el.disabled = disabled;
    });
  }
  init(event) {
    const { id: id2, file, controller } = event.detail;
    this.dialog?.addUpload(`direct-upload-${id2}`, file?.name || "Uploading...");
    this.controllers.push(controller);
    this.startNextController();
  }
  start(event) {
    this.dialog?.startUpload(`direct-upload-${event.detail.id}`);
  }
  progress(event) {
    const { id: id2, progress } = event.detail;
    this.dialog?.updateProgress(`direct-upload-${id2}`, progress);
  }
  error(event) {
    event.preventDefault();
    const { id: id2, error } = event.detail;
    this.dialog?.setError(`direct-upload-${id2}`, error);
  }
  end(event) {
    this.dialog?.completeUpload(`direct-upload-${event.detail.id}`);
  }
  removeUploadedFile(event) {
    const uploadedFile = event.detail;
    const id2 = uploadedFile.controller?.directUpload?.id;
    if (id2) {
      this.dialog?.removeUpload(`direct-upload-${id2}`);
    }
    this.setInputAttachmentsDisabled(false);
    requestAnimationFrame(() => this.submitForm());
  }
};
function arrayRemove(arr, e) {
  const index = arr.findIndex((x) => x === e);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}
var FileDrop = class extends HTMLElement {
  constructor() {
    super();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }
  static get observedAttributes() {
    return ["for"];
  }
  connectedCallback() {
    this.addEventListener("dragover", this.handleDragOver);
    this.addEventListener("dragleave", this.handleDragLeave);
    this.addEventListener("drop", this.handleDrop);
    this.applyDefaultStyles();
  }
  disconnectedCallback() {
    this.removeEventListener("dragover", this.handleDragOver);
    this.removeEventListener("dragleave", this.handleDragLeave);
    this.removeEventListener("drop", this.handleDrop);
  }
  get fileTarget() {
    const forValue = this.getAttribute("for");
    if (!forValue) return null;
    return document.querySelector(`#${forValue}`);
  }
  handleDragOver(event) {
    event.preventDefault();
    this.classList.add("-dragover");
  }
  handleDragLeave() {
    this.classList.remove("-dragover");
  }
  handleDrop(event) {
    event.preventDefault();
    this.classList.remove("-dragover");
    const target = this.fileTarget;
    if (target && event.dataTransfer.files.length > 0) {
      target.files = event.dataTransfer.files;
      const changeEvent = new Event("change", { bubbles: true });
      target.dispatchEvent(changeEvent);
    }
  }
  applyDefaultStyles() {
    if (!this.hasAttribute("data-no-default-styles")) {
      const styles2 = `
        file-drop {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          min-height: 60px;
          outline-offset: -10px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.25);
          text-align: center;
          transition: all 0.15s ease 0s;
          outline: rgba(0, 0, 0, 0.25) dashed 2px;
          font-size: 13px;
        }

        file-drop.-dragover {
          background: rgba(0, 0, 0, 0.1);
          outline-color: rgba(0, 0, 0, 0.5);
        }
      `;
      if (!document.querySelector("#file-drop-default-styles")) {
        const styleElement = document.createElement("style");
        styleElement.id = "file-drop-default-styles";
        styleElement.textContent = styles2;
        document.head.appendChild(styleElement);
      }
    }
  }
};
if (!customElements.get("file-drop")) {
  customElements.define("file-drop", FileDrop);
}
var inputAttachmentCss = ":host{display:block;padding:25px;color:var(--input-attachment-text-color, #000);font-size:13px}:host *{box-sizing:border-box;position:relative}file-drop{cursor:pointer;display:block;outline-offset:-10px;background:var(--input-attachment-drop-bg, rgba(255,255,255, 0.25));padding:20px;text-align:center;transition:all 0.15s;outline:2px dashed var(--input-attachment-drop-border, rgba(0,0,0,0.25));color:var(--input-attachment-drop-color, #444);font-size:14px}file-drop.-full{width:100%}p{padding:10px 20px;margin:0}.-dragover{background:var(--input-attachment-drop-bg-active, rgba(255,255,255,0.5));outline:2px dashed var(--input-attachment-drop-border, rgba(0,0,0,0.25))}.media-preview{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center}:host.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}@media (prefers-color-scheme: dark){:host{--input-attachment-text-color:#e0e0e0;--input-attachment-drop-bg:rgba(255,255,255, 0.08);--input-attachment-drop-border:rgba(255,255,255, 0.25);--input-attachment-drop-color:#bbb;--input-attachment-drop-bg-active:rgba(255,255,255, 0.15);--input-attachment-error-color:#f66}}";
var InputAttachment$1 = /* @__PURE__ */ proxyCustomElement(class InputAttachment extends H {
  get el() {
    return this;
  }
  name;
  directupload;
  multiple = false;
  required = false;
  accepts;
  max;
  preview = true;
  disabled = false;
  uploadDialog = true;
  form;
  internals;
  fileInput;
  _files = [];
  constructor(registerHost2) {
    super();
    if (registerHost2 !== false) {
      this.__registerHost();
    }
    this.__attachShadow();
    this.internals = this.el.attachInternals();
  }
  componentWillLoad() {
    this.form = this.internals.form;
    if (this.form) {
      this.form.addEventListener("reset", () => this.reset());
      FormController.instance(this.form, { uploadDialog: this.uploadDialog });
    }
    const existingFiles = Array.from(this.el.children).filter((e) => e.tagName == "ATTACHMENT-FILE");
    if (existingFiles.length > 0)
      this.files = existingFiles;
    if (this.files.length > 0)
      this.updateFormValue();
  }
  componentDidLoad() {
    this.fileInput?.addEventListener("change", this.handleFileInputChange);
  }
  // Methods
  get files() {
    return this._files;
  }
  set files(val) {
    this._files = val;
    if (!this.multiple)
      this._files = this._files.slice(-1);
    forceUpdate(this.el);
    this.fireChangeEvent();
  }
  get value() {
    return JSON.stringify(this.files.map((f) => ({
      value: f.value,
      filename: f.filename,
      src: f.src,
      state: f.state,
      percent: f.percent,
      size: f.size,
      filetype: f.filetype
    })));
  }
  set value(val) {
    const data = JSON.parse(val || "[]");
    if (data.length === 0) {
      this.files = [];
      return;
    }
    this.files = data.map((item) => {
      const attachmentFile = document.createElement("attachment-file");
      attachmentFile.name = this.name;
      attachmentFile.preview = this.preview;
      attachmentFile.value = item.value;
      attachmentFile.filename = item.filename;
      attachmentFile.src = item.src;
      attachmentFile.state = item.state || "complete";
      attachmentFile.percent = item.percent || 100;
      attachmentFile.size = item.size;
      attachmentFile.filetype = item.filetype;
      return attachmentFile;
    });
    requestAnimationFrame(() => this.componentDidRender());
  }
  updateFormValue() {
    if (!this.name || !this.internals?.setFormValue)
      return;
    const formData = new FormData();
    const values = this.files.map((f) => f.value).filter((v) => v);
    if (this.multiple) {
      values.forEach((signedId) => formData.append(this.name, signedId));
      if (values.length === 0)
        formData.append(this.name, "");
    } else {
      formData.set(this.name, values[0] || "");
    }
    this.internals.setFormValue(formData);
    if (this.required && this.files.length === 0) {
      this.internals.setValidity({ valueMissing: true }, "Please select a file.", this.fileInput);
    } else {
      const childErrors = this.files.map((f) => f.validationError).filter((e) => e && e.length > 0);
      if (childErrors.length > 0) {
        this.internals.setValidity({ customError: true }, childErrors[0], this.fileInput);
      } else {
        this.internals.setValidity({});
      }
    }
  }
  reset() {
    this.files = [];
  }
  handleFileInputChange = () => {
    if (!this.fileInput?.files?.length)
      return;
    this.addFiles(this.fileInput.files);
    this.fileInput.value = null;
  };
  handleDrop = (event) => {
    event.preventDefault();
    if (this.isDisabled)
      return;
    if (event.dataTransfer?.files?.length) {
      this.addFiles(event.dataTransfer.files);
    }
  };
  removeUploadedFile(event) {
    arrayRemove(this.files, event.detail);
    this.files = this.files;
  }
  handleChildValidation(_event) {
    this.updateFormValue();
  }
  handleChildReady(_event) {
    this.updateFormValue();
  }
  fireChangeEvent() {
    requestAnimationFrame(() => {
      this.updateFormValue();
      this.el.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }
  // Rendering
  get isDisabled() {
    return this.disabled || !!this.el.closest("fieldset[disabled]");
  }
  render() {
    return h(Host, { key: "6a45fb4254e303d6bdc0e904129d5db9f94799b3" }, h("input", { key: "68df3d0b0b7ea59551a6a2ef78a59f0ac77cb848", ref: (el) => this.fileInput = el, type: "file", multiple: this.multiple, accept: this.accepts, required: this.required && this.files.length === 0, disabled: this.isDisabled, onChange: () => this.handleFileInputChange(), style: {
      opacity: "0.01",
      width: "1px",
      height: "1px",
      zIndex: "-999"
    } }), h("file-drop", { key: "4af1e60084b31e232bbda03a540d0a87e301ee1e", onClick: () => this.fileInput?.click(), onDrop: this.handleDrop }, h("p", { key: "c714acafc22ec669b2978065b04559cd0f097e57", part: "title" }, h("strong", { key: "3fab310e5ee4e1d8ceb65076a88f67a9a51a3a4d" }, "Choose ", this.multiple ? "files" : "file", " "), h("span", { key: "694f5681825da6005f65d6f8038fb75170b5dfca" }, "or drag ", this.multiple ? "them" : "it", " here.")), h("div", { key: "8a0d60e85928524d2adbcf58b24bbce095cc9a11", class: `media-preview ${this.multiple ? "-stacked" : ""}` }, h("slot", { key: "5b8ee7c5eb04099451d2d5059095d62b39b430b5" }))));
  }
  componentDidRender() {
    if (this.files.length === 0) {
      const existingFiles = Array.from(this.el.children).filter((e) => e.tagName == "ATTACHMENT-FILE");
      if (existingFiles.length > 0) {
        this._files = existingFiles;
      }
    }
    const wrapper = document.createElement("div");
    this.files.forEach((file) => wrapper.appendChild(file));
    let needsUpdate = false;
    if (wrapper.children.length !== this.el.children.length) {
      needsUpdate = true;
    } else {
      for (let i2 = 0; i2 < wrapper.children.length; i2++) {
        if (wrapper.children[i2] !== this.el.children[i2]) {
          needsUpdate = true;
          break;
        }
      }
    }
    if (needsUpdate) {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }
      this.el.appendChild(wrapper);
    }
    this.updateFormValue();
  }
  // Test helper - adds files programmatically with proper lifecycle
  addFiles(files) {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const attachmentFile = document.createElement("attachment-file");
      attachmentFile.name = this.name;
      attachmentFile.preview = this.preview;
      attachmentFile.setAttribute("url", this.directupload);
      attachmentFile.accepts = this.accepts;
      attachmentFile.max = this.max;
      attachmentFile.file = file;
      this._files.push(attachmentFile);
    });
    this.files = this._files;
    requestAnimationFrame(() => this.componentDidRender());
  }
  // Validations
  checkValidity() {
    if (this.required && this.files.length === 0) {
      return false;
    }
    return true;
  }
  setCustomValidity(msg) {
    this.internals.setValidity(msg ? { customError: true } : {}, msg, this.fileInput);
  }
  reportValidity() {
    return this.internals.reportValidity();
  }
  get validationMessage() {
    return this.internals.validationMessage;
  }
  static get formAssociated() {
    return true;
  }
  static get style() {
    return inputAttachmentCss;
  }
}, [321, "input-attachment", {
  "name": [1],
  "directupload": [1],
  "multiple": [4],
  "required": [4],
  "accepts": [1],
  "max": [2],
  "preview": [4],
  "disabled": [4],
  "uploadDialog": [4, "upload-dialog"]
}, [[0, "attachment-file:remove", "removeUploadedFile"], [0, "attachment-file:validation", "handleChildValidation"], [0, "attachment-file:ready", "handleChildReady"], [0, "direct-upload:end", "fireChangeEvent"]]]);
var InputAttachment2 = InputAttachment$1;

// dist/components/upload-dialog.js
var uploadDialogCss = "dialog{border:none;padding:0;background:transparent;max-width:100vw;max-height:100vh}dialog::backdrop{background:transparent}.direct-upload-wrapper{position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:var(--input-attachment-overlay-bg, rgba(51, 51, 51, 0.9))}.direct-upload-content{display:block;background:var(--input-attachment-dialog-bg, #fcfcfc);color:var(--input-attachment-text-color, #000);padding:40px 60px 60px;border-radius:3px;width:60vw}.direct-upload-content h3{border-bottom:2px solid var(--input-attachment-dialog-border, #1f1f1f);margin-bottom:20px}.direct-upload--pending{opacity:0.6}.direct-upload--complete{opacity:0.4}.direct-upload--error{border-color:var(--input-attachment-error-color, red)}@media (prefers-color-scheme: dark){:host{--input-attachment-dialog-bg:#2a2a2a;--input-attachment-dialog-border:#555;--input-attachment-error-color:#f66}}";
var UploadDialog$1 = /* @__PURE__ */ proxyCustomElement(class UploadDialog extends H {
  constructor(registerHost2) {
    super();
    if (registerHost2 !== false) {
      this.__registerHost();
    }
    this.__attachShadow();
  }
  dialog;
  uploads = [];
  async open() {
    this.dialog.showModal();
  }
  async close() {
    this.dialog.close();
  }
  async addUpload(id2, filename) {
    this.uploads = [...this.uploads, {
      id: id2,
      filename,
      pending: true,
      percent: 0,
      complete: false,
      error: null
    }];
  }
  async startUpload(id2) {
    this.uploads = this.uploads.map((u) => u.id === id2 ? { ...u, pending: false } : u);
  }
  async updateProgress(id2, percent) {
    this.uploads = this.uploads.map((u) => u.id === id2 ? { ...u, percent } : u);
  }
  async setError(id2, error) {
    this.uploads = this.uploads.map((u) => u.id === id2 ? { ...u, error } : u);
  }
  async completeUpload(id2) {
    this.uploads = this.uploads.map((u) => u.id === id2 ? { ...u, complete: true } : u);
  }
  async removeUpload(id2) {
    this.uploads = this.uploads.filter((u) => u.id !== id2);
  }
  render() {
    return h(Host, { key: "76874b06863ae2cab526de1f0e491bb04300c6fc" }, h("dialog", { key: "55b715d6d5fc6ee0c6a16df16c6374ca6e285aee", ref: (el) => this.dialog = el }, h("div", { key: "bab0ae4ed41bb5a909351866d92f0da330858691", class: "direct-upload-wrapper" }, h("div", { key: "23fe0a67bd942f5f4a53df1bd61bec8863104b2c", class: "direct-upload-content" }, h("h3", { key: "d2e349d855c046a541c9dc3ac837873bcd75da22" }, "Uploading your media"), this.uploads.map((upload) => h("progress-bar", { key: upload.id, class: {
      "direct-upload--pending": upload.pending,
      "direct-upload--complete": upload.complete,
      "direct-upload--error": !!upload.error
    }, percent: upload.percent, title: upload.error || void 0 }, upload.filename))))));
  }
  static get style() {
    return uploadDialogCss;
  }
}, [257, "upload-dialog", {
  "uploads": [32],
  "open": [64],
  "close": [64],
  "addUpload": [64],
  "startUpload": [64],
  "updateProgress": [64],
  "setError": [64],
  "completeUpload": [64],
  "removeUpload": [64]
}]);
var UploadDialog2 = UploadDialog$1;

// dist/components/index.js
var defineCustomElements = (opts) => {
  if (typeof customElements !== "undefined") {
    [
      AttachmentFile3,
      AttachmentPreview3,
      InputAttachment2,
      UploadDialog2
    ].forEach((cmp) => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};
export {
  defineCustomElements,
  getAssetPath,
  render,
  setAssetPath,
  setNonce,
  setPlatformOptions
};
/*! Bundled license information:

@stencil/core/internal/client/index.js:
  (*!__STENCIL_STATIC_IMPORT_SWITCH__*)

@stencil/core/internal/client/index.js:
  (**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *
   * This file is a port of shadowCSS from `webcomponents.js` to TypeScript.
   * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
   * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
   *)
*/
defineCustomElements();
