// Props on HTML element
type ButtonProps = React.ComponentPropsWithoutRef<'button'>
type ButtonProps = JSX.IntrinsicElements['button']
type ButtonProps = React.HTMLAttributes<HTMLButtonElement>

// Create React App with Typescript
// $ create-react-app my-app --scripts-version=react-scripts-ts
// react-scripts-ts is a set of adjustments to take the standard create-react-app project pipeline and bring TypeScript into the mix.

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
const zz = <Img alt="..." src="..." />

// Synthetic Event
const handleChange = (event: React.SyntheticEvent) => {
  const target = event.target as HTMLInputElement
  console.log('Changed', target.value)
}
const Input = <input type="text" onChange={handleChange} />
