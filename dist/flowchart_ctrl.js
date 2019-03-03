"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsPanelCtrl = exports.FlowchartCtrl = void 0;

var _sdk = require("app/plugins/sdk");

var _time_series = _interopRequireDefault(require("app/core/time_series2"));

var _kbn = _interopRequireDefault(require("app/core/utils/kbn"));

var _mapping_options = require("./mapping_options");

var _flowchart_options = require("./flowchart_options");

var _inspect_options = require("./inspect_options");

var _lodash = _interopRequireDefault(require("lodash"));

var _plugin = require("./plugin");

var _mxHandler = _interopRequireDefault(require("./mxHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FlowchartCtrl =
/*#__PURE__*/
function (_MetricsPanelCtrl) {
  _inherits(FlowchartCtrl, _MetricsPanelCtrl);

  function FlowchartCtrl($scope, $injector, $rootScope) {
    var _this;

    _classCallCheck(this, FlowchartCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowchartCtrl).call(this, $scope, $injector));
    _this.$rootScope = $rootScope;
    _this.$scope = $scope;
    _this.hiddenSeries = {};
    _this.unitFormats = _kbn.default.getUnitFormats();
    _this.cells = [];
    _this.graph;
    _this.mx; // OLD OPTIONS

    _this.options = {
      flowchart: {
        source: {
          types: ['Url', 'XML Content', 'JSON ', 'Editor', 'Javascript'],
          default: 'XML Content'
        }
      },
      metrics: {
        colorsMode: {
          types: ['Fill', 'Stroke', 'Text'],
          default: 'Fill'
        },
        aggregation: {
          types: ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg', 'Delta'],
          default: 'Last'
        },
        handler: {
          types: ['Number Threshold', 'String Threshold', 'Date Threshold', 'Disable Criteria', 'Text Only'],
          default: 'Number Threshold'
        },
        shape: {
          types: ['Warning / Critical', 'Always'],
          default: 'Warning / Critical'
        },
        value: {
          types: ['Never', 'When Metric Displayed', 'Warning / Critical', 'Critical Only'],
          default: 'When Alias Displayed'
        },
        format: {
          types: _kbn.default.getUnitFormats()
        }
      }
    };
    var panelDefaults = {
      init: {
        logLevel: 3 //1:debug, 2:info, 3:warn, 4:error, 5:fatal

      },
      datasource: null,
      interval: null,
      targets: [{}],
      aliasColors: {},
      format: 'short',
      valueName: 'current',
      strokeWidth: 1,
      // NEW PANEL
      styleSeq: 1,
      metrics: [],
      styles: [{
        id: 1,
        unit: 'short',
        type: 'number',
        alias: '',
        decimals: 2,
        colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
        colorMode: null,
        pattern: '/.*/',
        thresholds: [],
        shapeSeq: 1,
        textSeq: 1
      }],
      // OLD PANEL
      flowchart: {
        source: {
          type: 'xml',
          xml: {
            //value: '<mxGraphModel  grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"  math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="hPZ40pGzY2HQIh7cGHQj-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;gradientColor=#ffffff;fillColor=#FF8000;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="120" height="60" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-2" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-1" target="hPZ40pGzY2HQIh7cGHQj-3"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="150" as="sourcePoint"/><mxPoint x="80" y="150" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-3" value="Loves" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1"><mxGeometry x="20" y="134" width="120" height="80" as="geometry"/></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-4" value="" style="shape=flexArrow;endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="hPZ40pGzY2HQIh7cGHQj-3" target="hPZ40pGzY2HQIh7cGHQj-5"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="281" as="sourcePoint"/><mxPoint x="160" y="261" as="targetPoint"/></mxGeometry></mxCell><mxCell id="hPZ40pGzY2HQIh7cGHQj-5" value="MxGraph" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;gradientColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="20" y="261" width="120" height="60" as="geometry"/></mxCell></root></mxGraphModel>',
            value: '<mxGraphModel dx="1426" dy="810" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="GLtmsq4S9DwVswmQGahX-3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-1" target="GLtmsq4S9DwVswmQGahX-2" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-1" value="Grafana" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" parent="1" vertex="1"><mxGeometry x="10" y="10" width="120" height="60" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;jettySize=auto;orthogonalLoop=1;strokeWidth=4;shadow=1;" parent="1" source="GLtmsq4S9DwVswmQGahX-2" target="GLtmsq4S9DwVswmQGahX-4" edge="1"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-2" value="love" style="triangle;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;shadow=1;" parent="1" vertex="1"><mxGeometry x="210" width="60" height="80" as="geometry"/></mxCell><mxCell id="GLtmsq4S9DwVswmQGahX-4" value="mxGraph" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;shadow=1;" parent="1" vertex="1"><mxGeometry x="340" width="120" height="80" as="geometry"/></mxCell></root></mxGraphModel>'
          },
          url: {
            value: "http://<source>:<port>/<pathToXml>"
          },
          editor: {
            value: "Not yet"
          },
          json: {
            value: "Not yet"
          },
          javascript: {
            value: "Not yet"
          }
        },
        options: {
          zoom: '100%',
          center: true,
          scale: true,
          lock: true,
          grid: false,
          bgColor: undefined
        }
      }
    };

    _lodash.default.defaults(_this.panel, panelDefaults);

    _this.panel.graphId = 'flowchart_' + _this.panel.id;
    _this.containerDivId = 'container_' + _this.panel.graphId;
    _this.changedSource = true; // events

    _this.events.on('render', _this.onRender.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('refresh', _this.onRefresh.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-error', _this.onDataError.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  } //
  // EVENTS FCT
  //


  _createClass(FlowchartCtrl, [{
    key: "onInitEditMode",
    value: function onInitEditMode() {
      console.debug("ctrl.onInitEditMode"); // this.addEditorTab('Flowcharting', 'public/plugins/' + plugin.id + '/partials/flowchartEditor.html', 2);
      // this.addEditorTab('Mapping', 'public/plugins/' + plugin.id + '/partials/shapeEditor.html', 3);
      // this.addEditorTab('Inspect', 'public/plugins/' + plugin.id + '/partials/inspectFlowchart.html', 4)

      this.addEditorTab('Flowchart', _flowchart_options.flowchartOptionsTab, 2);
      this.addEditorTab('Mapping', _mapping_options.mappingOptionsTab, 3);
      this.addEditorTab('Inspect', _inspect_options.inspectOptionsTab, 4); // this.addEditorTab('Debug', 'public/plugins/' + plugin.id + '/partials/debug.html', 5)
    }
  }, {
    key: "onRefresh",
    value: function onRefresh() {
      console.debug("ctrl.onRefresh");
    }
  }, {
    key: "onRender",
    value: function onRender() {
      console.debug("ctrl.onRender");
      this.data = this.parseSeries(this.series);
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      console.debug("ctrl.onDataReceived");
      console.debug('received data');
      console.debug(dataList);
      this.series = dataList.map(this.seriesHandler.bind(this));
      console.debug('mapped dataList to series');
      console.debug(this.series);
      this.render();
    }
  }, {
    key: "onDataError",
    value: function onDataError() {
      this.series = [];
      this.render();
    }
  }, {
    key: "onInitPanelActions",
    value: function onInitPanelActions(actions) {
      actions.push({
        text: 'Export SVG',
        click: 'ctrl.exportSVG()'
      });
    } //
    // FUNCTIONS 
    //

  }, {
    key: "link",
    value: function link(scope, elem, attrs, ctrl) {
      console.debug("ctrl.link");
      this.mx = new _mxHandler.default(scope, elem, attrs, ctrl);
    }
  }, {
    key: "exportSVG",
    value: function exportSVG() {
      var scope = this.$scope.$new(true);
      scope.panel = 'table';
      this.publishAppEvent('show-modal', {
        templateHtml: '<export-data-modal panel="panel" data="tableData"></export-data-modal>',
        scope: scope,
        modalClass: 'modal--narrow'
      });
    }
  }, {
    key: "openEditor",
    value: function openEditor() {
      console.debug("ctrl.openEditor");
    }
  }, {
    key: "setUnitFormat",
    value: function setUnitFormat(subItem) {
      console.debug("ctrl.setUnitFormat");
      this.panel.format = subItem.value;
      this.refresh();
    } //
    // Series
    //

  }, {
    key: "seriesHandler",
    value: function seriesHandler(seriesData) {
      var series = new _time_series.default({
        datapoints: seriesData.datapoints,
        alias: seriesData.target,
        unit: seriesData.unit
      });
      series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
      var datapoints = seriesData.datapoints || [];

      if (datapoints && datapoints.length > 0) {
        var last = datapoints[datapoints.length - 1][1];
        var from = this.range.from;

        if (last - from < -10000) {
          series.isOutsideRange = true;
        }
      }

      return series;
    }
  }, {
    key: "parseSeries",
    value: function parseSeries(series) {
      var _this2 = this;

      return _lodash.default.map(this.series, function (serie, i) {
        return {
          label: serie.alias,
          data: serie.stats[_this2.panel.valueName],
          color: _this2.panel.aliasColors[serie.alias] || _this2.$rootScope.colors[i],
          legendData: serie.stats[_this2.panel.valueName]
        };
      });
    } //
    // Validate
    //

  }, {
    key: "validateRegex",
    value: function validateRegex(textRegex) {
      if (textRegex == null || textRegex.length == 0) {
        return true;
      }

      try {
        var regex = new RegExp(textRegex);
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);

  return FlowchartCtrl;
}(_sdk.MetricsPanelCtrl);

exports.MetricsPanelCtrl = exports.FlowchartCtrl = FlowchartCtrl;
FlowchartCtrl.templateUrl = 'module.html';