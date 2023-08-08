// @flow
export type IDataV = {
  id: number
  name: string
  alias: null
  config: IConfig
  project_id: number
  thumbnail: string
  template: number
  publish_snapshot_id: string
  is_lock: number
  type: string
  publish_info: IPublish_info
  deletedat: null
  createdat: string
  updatedat: string
}
export type IConfig = {
  graph: IGraph
  value: DatavConfig
  preset: IPreset
  filters: any[]
}
export type IGraph = {
  id?: string
  edges?: any[]
  nodes?: any[]
  canvas?: any[]
  custom?: ICustom
  groups?: any[]
  readOnly?: boolean
  pageConfig?: IPageConfig
  nodeList?: any[]
}
export type ICustom = {}
export type IPageConfig = {
  zoom: number
  offset: number[]
  origin: string[]
}
export type DatavConfig = {
  id?: string
  attr: IAttr
  edit?: IEdit
  list?: DatavItem[]
  name?: string
  type?: string | string[]
  props: IProps
  common: ICommon
  version?: string
  isPortal?: boolean
  relation?: IRelation
  dataConfig?: IDataConfig
  interaction?: IInteraction
  extension?: IExtension
}
export type IAttr = {
  h: number
  w: number
  x: number
  y: number
  deg?: number
  flipH?: boolean
  flipV?: boolean
  hUnit: string
  wUnit: string
  // opacity?: number
  sizeLock?: boolean
  xUnit?: string
  yUnit?: string
}
export type IEdit = {
  tag: ITag
  lock: boolean
  alias: string
  graph: IGraph
  onlyChild: boolean
  enableDrop: boolean
  nodeExport: boolean
  easySetting: IEasySetting
  disableChildMove: boolean
  disableAttrConfig: string[]
  disableAutoResize: boolean
  disableChildResize: any[]
  icon?: string
  hooks?: IHooks
  lines?: any[]
  eventState?: IEventState
  displayName?: string
}
export type ITag = {}
export type IEasySetting = {
  font: IFont
  color: string
  complexity: string
}
export type IFont = {
  size: number
  color: string
  family: string
  weight: number
}
export type DatavItem = {
  id: string
  attr: IAttr
  edit: IEdit
  list: any[]
  name: string
  type: string
  props: IProps
  common: ICommon
  source: string
  version: string
  isPortal: boolean
  relation: IRelation
  dataConfig: IDataConfig
  interaction: IInteraction
}
export type IHooks = {}
export type IEventState = {}
export type IProps = {
  filter?: string
  background: string | IBackground
  title?: ITitle
  global?: IGlobal
  counter?: ICounter
  interaction?: IInteraction
  content?: string
  ellipsis?: boolean
  textAlign?:"center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
  textStyle?: ITextStyle
  urlConfig?: IUrlConfig
  writingMode?: "horizontal-tb" | "sideways-lr" | "sideways-rl" | "vertical-lr" | "vertical-rl"
  letterSpacing?: number
  backgroundStyle?: IBackgroundStyle
  display?: Display
  backgroundColor?: string
  backgroundImage?: null
}

export enum Display {
  NoScale,
  ScaleByWidth,
  ScaleByHeight,
  FullScale,
  ScaleByHeightWithScroll,
  ScaleToCenter,
  ResizeByPixel,
}

export type ICommon = {
  hide: boolean
  flipH?: boolean
  flipV?: boolean
  degree: number
  filter: IFilter
  opacity: number
}
export type IFilter = {
  hue: number
  enable: boolean
  opacity: number
  contrast: number
  saturate: number
  brightness: number
}


export type IRelation = {
  category: string[]
}
export type IDataConfig = {
  source?: ISource
}
export type IInteraction = {
  events?: any[]
  logicNodes?: any[]
  cursor?: boolean
}
export type ITitle = {
  content: string
  textStyle: ITextStyle
}
export type ITextStyle = {
  color: string | IColor
  fontSize?: number
  textAlign?: string
  fontWeight?: string
  fontFamily?: string
}
export type IGlobal = {
  distance: number
  textStyle: ITextStyle
  arrangement: string
  abnormalData: number
  initShowData: number
}
export type ICounter = {
  margin: IMargin
  prefix: IPrefix
  suffix: ISuffix
  numbers: INumbers
  fontFamily: string
  justifyContent: string
}
export type IMargin = {
  preNum: number
  numSuff: number
}
export type IPrefix = {
  content?: string
  textStyle?: ITextStyle
  type?: string[]
  extension?: IExtension
}
export type ISuffix = {
  content?: string
  textStyle?: ITextStyle
  suffixArrange?: string
  type?: string[]
  extension?: IExtension
}
export type INumbers = {
  digit: number
  decimal: number
  duration: number
  rounding: boolean
  animation: boolean
  increment: boolean
  textStyle: ITextStyle
  fixedWidth: number
  marginRight: number
  sameDataFlip: boolean
  decimalSymbol: string
  backgroundColor: IBackgroundColor
  separatingChart: boolean
  backgroundRadius: number
  separatingSymbol: string
  separatingBackground: boolean
}
export type IColor = {
  type: string
  value: string
}
export type IBackgroundColor = {
  type: string
  value: string
}
export type ISource = {
  name: string
  handler: string
  dataSource: IDataSource
  dataRequire: IDataRequire
  description: string
  dataSourceType: string
}
export type IDataSource = {
  multiple: IMultiple
}
export type IMultiple = {
  $type: string
}
export type IDataRequire = {
  type: string
  items: IItems
}
export type IItems = {
  type: string
  required: string[]
  properties: IProperties
}
export type IProperties = {
  name?: IName
  value: DatavConfig
  prefix?: IPrefix
  suffix?: ISuffix
  url?: IUrl
}
export type IName = {
  type: string[]
  extension: IExtension
}
export type IExtension = {
  description: string
}
export type IUrlConfig = {
  url: string
  ifBlank: boolean
}
export type IBackgroundStyle = {
  show: boolean
  bgColor: string
  bgBorder: IBgBorder
  borderRadius: number
}
export type IBgBorder = {
  color: string
  curve: string
  style: string
  width: number
}
export type IUrl = {
  type: string[]
  extension: IExtension
}
export type IBackground = {
  type: string
  value: string
}
export type IPreset = {
  flat: any[]
  pattern: any[]
  linearGradient: any[]
}
export type IPublish_info = {
  meta: IMeta
  shareCode: string
  snapshotId: string
  isPublished: boolean
}
export type IMeta = {
  token: string
  authTime: string
  password: string
  shareDes: string
  shareImg: string
  tokenOnce: boolean
  whiteList: any[]
  shareTitle: string
  loadingLogo: string
  tokenEnable: boolean
  loadingBgColor: string
  passwordEnable: boolean
}
export type CommonWidgetProps = {
  widget: DatavConfig,
  // pluginManager: U,
  disableLoading?: boolean,
  LoadingComponent?: React.ReactNode;
  children?: React.ReactNode;
}