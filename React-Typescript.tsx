// @see

// Props on HTML element
type ButtonProps = React.ComponentPropsWithoutRef<'button'>
type ButtonProps = JSX.IntrinsicElements['button']
type ButtonProps = React.HTMLAttributes<HTMLButtonElement>

// Children
type Child = React.ReactNode
type OneChild = React.ReactChild
type TwoChildren = [React.ReactChild, React.ReactChild]
type ManyChildren = React.ReactChild[]
type OneOrMoreChildren = React.ReactChild | React.ReactChild[]
type ArrayOfProps = SomeProp[]
type NumbersChildren = number[]
type TwoNumbersChildren = [number, number]

// Spread attributes to HTML elements
type ButtonProps = JSX.IntrinsicElements['button']
function Button({ ...allProps }: ButtonProps) {
  return <button {...allProps} />
}
// Another example
const Thumb = ({
  thumb,
  ...rest
}: {
  thumb: ThumbType
} & React.ComponentPropsWithoutRef<'img'>) => (
  <img
    src={thumb.featuredImage.thumbSrc}
    alt={thumb.featuredImage.altText ?? thumb.title}
    {...rest}
  />
)

// Preset attributes
// Omit the `type` prop from the type declaration and set it manually
type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type'>
function Button({ ...allProps }: ButtonProps) {
  return <button type="button" {...allProps} />
}
// 💥 This breaks, as we omitted type
const z = <Button type="button">Hi</Button>
// Omit multiple
type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type' | 'className'>

// Required props
// MakeRequired helper
type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<{ [P in K]: T[P] }>
type ImgProps = MakeRequired<JSX.IntrinsicElements['img'], 'alt' | 'src'>
export function Img({ alt, ...allProps }: ImgProps) {
  return <img alt={alt} {...allProps} />
}
const img = <Img alt="..." src="..." />

// Overload props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
}
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string
}
type Overload = {
  (props: ButtonProps): JSX.Element
  (props: AnchorProps): JSX.Element
}
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  'href' in props
const Buttonnnn: Overload = (props: ButtonProps | AnchorProps) => {
  if (hasHref(props)) return <a {...props} />
  return <button {...props} />
}

// Conditional props based on props
type CommonProps = {
  children: React.ReactNode
  miscProps?: any
}
type NoTruncateProps = CommonProps & { truncate?: false }
type TruncateProps = CommonProps & { truncate: true; expanded?: boolean }
function Text(props: NoTruncateProps): JSX.Element // Overload
function Text(props: TruncateProps): JSX.Element // Overload
function Text(props: CommonProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, ...otherProps } = props
  const classNames = truncate ? '.truncate' : ''
  return (
    <div className={classNames} aria-expanded={!!expanded} {...otherProps}>
      {children}
    </div>
  )
}

// Synthetic Event
const handleChange = (event: React.SyntheticEvent) => {
  const target = event.target as HTMLInputElement
  console.log('Changed', target.value)
}
const Input = <input type="text" onChange={handleChange} />
